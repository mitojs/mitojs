import { Subscrib } from '@mitojs/core'
import { BrowserEventTypes } from 'packages/shared/src'

describe('core/subscrib.ts', () => {
  it('should watch and notify work', () => {
    const mockData = { mockData: 'mock' }
    const watchCallback = jest.fn((data) => {
      expect(data).toBe(mockData)
    })
    const watchCallbackTwo = jest.fn((data) => {
      expect(data).toBe(mockData)
    })
    // throw error
    const watchCallbackThree = jest.fn((data) => {
      throw new Error('call back error')
    })
    const subscrib = new Subscrib<BrowserEventTypes>()
    const targetEventName = BrowserEventTypes.CUSTOMER
    subscrib.watch(targetEventName, watchCallback)
    subscrib.watch(targetEventName, watchCallbackTwo)
    // subscrib.watch(targetEventName, watchCallbackThree)
    subscrib.notify(targetEventName, mockData)
    expect(watchCallback.mock.calls.length).toBe(1)
    // first args
    expect(watchCallback.mock.calls[0][0]).toBe(mockData)
    expect(watchCallbackTwo.mock.calls.length).toBe(1)
    expect(watchCallbackTwo.mock.calls[0][0]).toBe(mockData)
    // can notify multiple times
    subscrib.notify(targetEventName, mockData)
    expect(watchCallback.mock.calls.length).toBe(2)
    expect(watchCallbackTwo.mock.calls.length).toBe(2)
  })
  it('should subscrib multiple times', () => {
    // one
    const mockData_one = { mockData: 'mock' }
    const watchCallback_one = jest.fn((data) => {
      expect(data).toBe(mockData_one)
    })
    const targetEventName_one = BrowserEventTypes.CUSTOMER
    // two
    const mockData_two = { mockData: 'mock_two' }
    const watchCallback_two = jest.fn((data) => {
      expect(data).toBe(mockData_two)
    })
    const targetEventName_two = BrowserEventTypes.CONSOLE
    const subscrib = new Subscrib<BrowserEventTypes>()

    subscrib.watch(targetEventName_one, watchCallback_one)
    subscrib.notify(targetEventName_one, mockData_one)
    expect(watchCallback_one.mock.calls.length).toBe(1)
    expect(watchCallback_one.mock.calls[0][0]).toBe(mockData_one)

    subscrib.watch(targetEventName_two, watchCallback_two)
    subscrib.notify(targetEventName_two, mockData_two)
    subscrib.notify(targetEventName_two, mockData_two)
    expect(watchCallback_two.mock.calls.length).toBe(2)
    expect(watchCallback_two.mock.calls[0][0]).toBe(mockData_two)
  })
})
