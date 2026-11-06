import { readFileSync, rmSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
import { libraryConfig, finalizeLibrary } from '../tools/vite/library.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const name = process.argv[2]
const directory = resolve(root, 'packages', name)
const manifest = JSON.parse(readFileSync(resolve(directory, 'package.json'), 'utf8'))
rmSync(resolve(directory, 'dist'), { recursive: true, force: true })
mkdirSync(resolve(directory, 'dist'), { recursive: true })
for (const format of ['es', 'cjs', 'iife']) {
  await build(libraryConfig(name, format))
  await finalizeLibrary(name, format)
}

// Emit the same single-file declaration entry as the legacy Rollup build.
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
  }, configObjectFullPath: resolve(directory, 'api-extractor.json'), packageJsonFullPath: resolve(directory, 'package.json')
})
const result = Extractor.invoke(config, { localBuild: true })
if (!result.succeeded) throw new Error(`Declaration extraction failed for ${name}`)
