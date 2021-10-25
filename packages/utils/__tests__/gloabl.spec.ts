import { getGlobal, isBrowserEnv, isNodeEnv, isWxMiniEnv } from '../src'

describe('global.ts', () => {
  it('should getGLoabl func work', () => {
    const _window = getGlobal()
    expect(_window).toBe(window)
  })

  it('should env variable work', () => {
    expect(isNodeEnv).toBeTruthy()
    expect(isWxMiniEnv).toBeFalsy()
    // mock browser env by node
    expect(isBrowserEnv).toBeTruthy()
  })

  // it('should supportsHistory func work', () => {
  //   expect(supportsHistory()).toBeTruthy()
  // })
})
