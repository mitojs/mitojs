import { isEmpty, isEmptyObject, isError, isExistProperty, isInstanceOf, variableTypeDetection, _global } from '../src/index'

describe('is.ts', () => {
  it('should isEmpty func work', () => {
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty(0)).toBeFalsy()
    expect(isEmpty({ test: 1 })).toBeFalsy()
  })
  it('should variableTypeDetection work', () => {
    expect(variableTypeDetection.isArray([])).toBeTruthy()
    expect(variableTypeDetection.isString('')).toBeTruthy()
    expect(variableTypeDetection.isBoolean(true)).toBeTruthy()
    expect(variableTypeDetection.isNull(null)).toBeTruthy()
    expect(variableTypeDetection.isUndefined(undefined)).toBeTruthy()
    expect(variableTypeDetection.isSymbol(Symbol())).toBeTruthy()
    expect(variableTypeDetection.isFunction(() => void 0)).toBeTruthy()
    expect(variableTypeDetection.isObject({})).toBeTruthy()
    expect(variableTypeDetection.isWindow(_global)).toBeTruthy()
  })
  it('should isError func work', () => {
    const error = new Error('mock error')
    expect(isError(error)).toBeTruthy()
    expect(isError({})).toBeFalsy()
  })
  it('should isEmptyObject func work', () => {
    expect(isEmptyObject({})).toBeTruthy()
    expect(isEmptyObject({ test: 1 })).toBeFalsy()
  })
  it('should isInstanceOf func work', () => {
    expect(isInstanceOf([], Array)).toBeTruthy()
    expect(isInstanceOf('', Array)).toBeFalsy()
  })
  it('should isExistProperty func work', () => {
    const obj = {
      test: 1
    }
    expect(isExistProperty(obj, 'test')).toBeTruthy()
    expect(isExistProperty(obj, 'test1')).toBeFalsy()
  })
})
