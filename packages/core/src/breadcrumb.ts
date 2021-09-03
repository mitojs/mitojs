import { ToStringTypes } from '@mitojs/shared'
import { logger, getTimestamp, slientConsoleScope, _support, toStringValidateOption } from '@mitojs/utils'
import { BaseOptionsFieldsIntegrationType, BreadcrumbPushData, InitOptions } from '@mitojs/types'

export class Breadcrumb<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
  maxBreadcrumbs = 10
  beforePushBreadcrumb: unknown = null
  stack: BreadcrumbPushData[] = []
  constructor(options: O) {
    this.bindOptions(options)
  }
  /**
   * 添加用户行为栈
   *
   * ../param {BreadcrumbPushData} data
   * ../memberof Breadcrumb
   */
  push(data: BreadcrumbPushData): void {
    if (typeof this.beforePushBreadcrumb === 'function') {
      let result: BreadcrumbPushData = null
      // 如果用户输入console，并且logger是打开的会造成无限递归，
      // 应该加入一个开关，执行这个函数前，把监听console的行为关掉
      const beforePushBreadcrumb = this.beforePushBreadcrumb
      slientConsoleScope(() => {
        result = beforePushBreadcrumb(this, data)
      })
      if (!result) return
      this.immediatePush(result)
      return
    }
    this.immediatePush(data)
  }
  immediatePush(data: BreadcrumbPushData): void {
    data.time || (data.time = getTimestamp())
    if (this.stack.length >= this.maxBreadcrumbs) {
      this.shift()
    }
    this.stack.push(data)
    // make sure xhr fetch is behind button click
    this.stack.sort((a, b) => a.time - b.time)
    logger.log(this.stack)
  }
  shift(): boolean {
    return this.stack.shift() !== undefined
  }
  clear(): void {
    this.stack = []
  }
  getStack(): BreadcrumbPushData[] {
    return this.stack
  }

  bindOptions(options: InitOptions = {}): void {
    const { maxBreadcrumbs, beforePushBreadcrumb } = options
    toStringValidateOption(maxBreadcrumbs, 'maxBreadcrumbs', ToStringTypes.Number) && (this.maxBreadcrumbs = maxBreadcrumbs)
    toStringValidateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', ToStringTypes.Function) &&
      (this.beforePushBreadcrumb = beforePushBreadcrumb)
  }
}
