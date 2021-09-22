import { BaseOptionsFieldsIntegrationType } from './baseOptionsType'

export interface BaseClientType<O extends BaseOptionsFieldsIntegrationType = BaseOptionsFieldsIntegrationType> {
  /**
   *SDK名称
   *
   * @type {string}
   * @memberof BaseClientType
   * @static
   */
  SDK_NAME?: string
  /**
   *SDK版本
   *
   * @type {string}
   * @memberof BaseClientType
   */
  SDK_VERSION: string

  /**
   *配置项和钩子函数
   *
   * @type {O}
   * @memberof BaseClientType
   */
  options: O

  /**
   *返回配置项和钩子函数
   *
   * @return {*}  {O}
   * @memberof BaseClientType
   */
  getOptions(): O
}
