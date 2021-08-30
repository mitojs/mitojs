const fs = require('fs')
const path = require('path')

const { getArgv, targets: allTargets, binRun, getPkgRoot, step, errLog } = require('./utils')
const MITO_PREFIX = '@mitojs'
let beModifiedPackages = []

run()

function run() {
  const argv = getArgv()._
  let targetVersion = null
  if (argv.length === 0) {
    return errLog('npm/yarn run version 没有带版本号，请到CONTRIBUTING中查看开发指南')
  } else {
    targetVersion = argv.shift()
  }
  const masterVersion = require('../package.json').version
  if (masterVersion !== targetVersion) {
    return errLog('传入的版本号与根路径的package.json不符合，请检查package.json的version')
    // return errLog('')
  }
  beModifiedPackages = argv.length === 0 ? allTargets : argv
  modify(targetVersion)
}

async function modify(targetVersion) {
  step(`start modify packages version: ${targetVersion}`)
  for (const target of beModifiedPackages) {
    await modifyMitoVersion(target, targetVersion)
  }
}

async function modifyMitoVersion(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = require(pkgPath)
  const oldVersion = pkg.version
  if (pkg.name.startsWith(MITO_PREFIX)) {
    pkg.version = version
  }
  const dependencies = pkg.dependencies || {}
  Object.entries(dependencies).forEach(([dependent, dependentVersion]) => {
    // 拼接：前缀 + 当前包名: @mitojs/web 如果当前依赖中有被改的包，也把version修改
    const isExist = beModifiedPackages.some((pkg) => `${MITO_PREFIX}/${pkg}` === dependent)
    if (isExist) {
      dependencies[dependent] = version
    }
  })
  fs.writeFileSync(pkgPath, JSON.stringify(pkg))
  await binRun('prettier', ['--write', pkgPath])
  step(`${pkgName} package version from ${oldVersion} to ${version} success`)
}
