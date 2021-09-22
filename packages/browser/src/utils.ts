import { BrowserBreadcrumbTypes } from '@mitojs/shared'
import { getBreadcrumbCategoryInBrowser, Severity } from '@mitojs/utils'
import { BrowserClient } from './browserClient'

export function addBreadcrumbInBrowser(this: BrowserClient, data: any, type: BrowserBreadcrumbTypes, level = Severity.Info) {
  return this.breadcrumb.push({
    type,
    data,
    category: getBreadcrumbCategoryInBrowser(type),
    level
  })
}
