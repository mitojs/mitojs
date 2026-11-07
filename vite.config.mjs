import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, perEnvironmentPlugin } from 'vite'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
import { esmExternalRequirePlugin } from 'rolldown/plugins'

const root = fileURLToPath(new URL('./', import.meta.url))
const directory = process.cwd()
const manifest = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'))
const name = manifest.name.slice('@mitojs/'.length)
const formats = ['es', 'cjs', 'iife']
const aliases = Object.fromEntries(readdirSync(resolve(root, 'packages'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => [`@mitojs/${entry.name}`, resolve(root, '.cache/emit/packages', entry.name, 'src/index.js')]))

export default defineConfig({
  resolve: { alias: aliases },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  plugins: [
    perEnvironmentPlugin('sdk-esm-require', (environment) => environment.name === 'es'
      ? esmExternalRequirePlugin({ external: ['react'] }) : false),
    {
      name: 'sdk-emitted-source-maps',
      load(id) {
        if (id.startsWith(resolve(root, '.cache/emit/packages') + '/') && id.endsWith('.js')) {
          return { code: readFileSync(id, 'utf8'), map: JSON.parse(readFileSync(`${id}.map`, 'utf8')) }
        }
      }
    }
  ],
  environments: Object.fromEntries(formats.map((format) => [format, {
    consumer: 'client',
    build: {
      emptyOutDir: format === 'es', outDir: resolve(directory, 'dist'), target: 'es2015',
      minify: format === 'iife', sourcemap: format !== 'iife',
      lib: {
        entry: resolve(root, '.cache/emit/packages', name, 'src/index.js'), formats: [format], name: 'MITO',
        fileName: () => format === 'es' ? `${name}.esm.js` : format === 'cjs' ? `${name}.js` : `${name}.min.js`
      },
      rolldownOptions: {
        // External package imports are preserved before aliases are resolved.
        external: format === 'es' ? (id) => id.startsWith('@mitojs/') : [],
        output: {
          // Keep strict mode inside the IIFE for safe script concatenation.
          exports: 'named', strict: false, intro: format === 'es' ? '' : '"use strict";',
          esModule: format === 'cjs',
          banner: `/* ${manifest.name} version ${manifest.version} */`, footer: '/* follow me on Github! @cjinhuo */'
        }
      }
    }
  }])),
  builder: {
    async buildApp(builder) {
      for (const format of formats) await builder.build(builder.environments[format])
      const config = ExtractorConfig.prepare({
        configObject: {
          projectFolder: directory,
          mainEntryPointFilePath: resolve(root, '.cache/emit/packages', name, 'src/index.d.ts'),
          compiler: { tsconfigFilePath: resolve(root, 'tsconfig.extractor.json') },
          apiReport: { enabled: false }, docModel: { enabled: false },
          dtsRollup: { enabled: true, publicTrimmedFilePath: resolve(directory, manifest.types) },
          tsdocMetadata: { enabled: false },
          messages: {
            compilerMessageReporting: { default: { logLevel: 'error' } },
            extractorMessageReporting: { default: { logLevel: 'warning' }, 'ae-missing-release-tag': { logLevel: 'none' } },
            tsdocMessageReporting: { default: { logLevel: 'none' } }
          }
        },
        configObjectFullPath: undefined, packageJsonFullPath: resolve(directory, 'package.json')
      })
      if (!Extractor.invoke(config, { localBuild: true }).succeeded) throw new Error(`Declaration extraction failed for ${name}`)
    }
  }
})
