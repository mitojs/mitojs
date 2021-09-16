import { Queue } from '../src/index'

describe('queue.ts', () => {
  it('should queue class work', (done) => {
    const queue = new Queue()
    expect(queue.getStack().length).toBe(0)
    queue.addTask(() => {
      // mock send request
      setTimeout(() => {
        expect(1).toBe(1)
      }, 1000)
    })
    queue.addTask(() => {
      // mock send request
      setTimeout(() => {
        expect(1).toBe(1)
        done()
      }, 2000)
    })
    expect(queue.getStack().length).toBe(2)
  })
})
