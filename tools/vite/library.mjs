import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
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
      minify: format === 'iife', sourcemap: format !== 'iife',
      lib: { entry: resolve(root, '.cache/emit/packages', name, 'src/index.js'), formats: [format], name: 'MITO', fileName: () => filename },
      rolldownOptions: {
        // The external-require plugin must own React resolution so it can
        // replace JSX runtime's require() before marking React external.
        external: format === 'es' ? (id) => id.startsWith('@mitojs/') : [],
        output: {
          // Keep strict mode inside the IIFE so concatenated application code
          // does not accidentally become strict along with the SDK.
          exports: 'named', strict: false, intro: format === 'es' ? '' : '"use strict";',
          esModule: format === 'cjs',
          banner: `/* ${manifest.name} version ${manifest.version} */`, footer: '/* follow me on Github! @cjinhuo */'
        }
      }
    }
  }
}
