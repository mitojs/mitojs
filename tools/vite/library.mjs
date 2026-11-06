import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript-es5'
import remapping from '@jridgewell/remapping'
import { minify } from 'terser'
import { esmExternalRequirePlugin } from 'rolldown/plugins'

const root = fileURLToPath(new URL('../../', import.meta.url))
const names = readdirSync(resolve(root, 'packages'), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
export const sourceAliases = Object.fromEntries(names.map((name) => [`@mitojs/${name}`, resolve(root, 'packages', name, 'src/index.ts')]))
const emittedAliases = Object.fromEntries(names.map((name) => [`@mitojs/${name}`, resolve(root, '.cache/emit/packages', name, 'src/index.js')]))

export function libraryConfig(name, format) {
  const manifest = JSON.parse(readFileSync(resolve(root, 'packages', name, 'package.json'), 'utf8'))
  const filename = format === 'es' ? `${name}.esm.js` : format === 'cjs' ? `${name}.js` : `${name}.min.js`
  return {
    configFile: false,
    resolve: { alias: format === 'es' ? {} : emittedAliases },
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    plugins: [...(format === 'es' ? [esmExternalRequirePlugin({ external: ['react'] })] : []), {
      name: 'sdk-emitted-source-maps',
      load(id) {
        if (id.startsWith(resolve(root, '.cache/emit/packages') + '/') && id.endsWith('.js')) {
          return { code: readFileSync(id, 'utf8'), map: JSON.parse(readFileSync(`${id}.map`, 'utf8')) }
        }
      }
    }],
    build: {
      emptyOutDir: false, outDir: resolve(root, 'packages', name, 'dist'), target: 'es2015',
      minify: false, sourcemap: format !== 'iife',
      lib: { entry: resolve(root, '.cache/emit/packages', name, 'src/index.js'), formats: [format], name: 'MITO', fileName: () => filename },
      rolldownOptions: {
        // The external-require plugin must own React resolution so it can
        // replace JSX runtime's require() before marking React external.
        external: format === 'es' ? (id) => id.startsWith('@mitojs/') : [],
        output: {
          // Keep strict mode inside the IIFE so concatenated application code
          // does not accidentally become strict along with the SDK.
          exports: 'named', strict: false, intro: format === 'es' ? '' : '"use strict";',
          esModule: format === 'cjs', generatedCode: { symbols: false }, minifyInternalExports: false,
          banner: `/* ${manifest.name} version ${manifest.version} */`, footer: '/* follow me on Github! @cjinhuo */'
        }
      }
    }
  }
}

// Finalize after Rolldown code generation so its printer cannot reformat the
// minified code or introduce newer syntax after the ES5 transform.
export async function finalizeLibrary(name, format) {
  const directory = resolve(root, 'packages', name)
  const manifest = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'))
  const filename = format === 'es' ? `${name}.esm.js` : format === 'cjs' ? `${name}.js` : `${name}.min.js`
  const path = resolve(directory, 'dist', filename)
  // TS 7 removed ES5 emission. This compatibility-only emitter receives bundled
  // JavaScript; all SDK source checking and declarations still use TS 7.
  const result = ts.transpileModule(readFileSync(path, 'utf8'), {
    fileName: filename,
    compilerOptions: { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.ESNext, sourceMap: format !== 'iife', inlineSources: true, removeComments: true }
  })
  const code = result.outputText.replace(/\/\/# sourceMappingURL=.*$/gm, '')
  const banner = `/* ${manifest.name} version ${manifest.version} */\n`
  if (format === 'iife') {
    const compressed = await minify(code, { ecma: 5, compress: { passes: 3, hoist_funs: true, hoist_vars: true } })
    writeFileSync(path, compressed.code + '\n')
  } else {
    writeFileSync(path, `${banner}${code}\n//# sourceMappingURL=${filename}.map\n`)
    const emittedMap = JSON.parse(result.sourceMapText)
    const map = existsSync(`${path}.map`) ? remapping([emittedMap, JSON.parse(readFileSync(`${path}.map`, 'utf8'))], () => null) : emittedMap
    map.file = filename
    map.mappings = `;${map.mappings}`
    writeFileSync(`${path}.map`, JSON.stringify(map))
  }
}
