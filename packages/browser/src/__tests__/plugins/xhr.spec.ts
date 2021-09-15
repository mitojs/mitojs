import { BrowserEventTypes } from '@mitojs/shared'
import xhrPlugin from '../../plugins/xhr'

describe('xhrPlugin', () => {
  it('should work', () => {
    expect(xhrPlugin.name).toBe(BrowserEventTypes.XHR)
  })
})
