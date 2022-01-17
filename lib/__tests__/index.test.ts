import { repeatedAnimationFrame } from '../'

const rafMock = jest.fn((() => Math.random()) as typeof requestAnimationFrame)
globalThis.requestAnimationFrame = rafMock
const cafMock = jest.fn()
globalThis.cancelAnimationFrame = cafMock

afterEach(() => {
  rafMock.mockClear()
  cafMock.mockClear()
})

test('Repeatedly calls requestAnimationFrame', () => {
  const fn = jest.fn()

  // Action
  repeatedAnimationFrame(fn)

  // Checks
  expect(fn).toBeCalledTimes(0)

  expect(rafMock).toBeCalledTimes(1)
  expect(rafMock.mock.calls[0].length).toBe(1)
  const frameRequestCallback1 = rafMock.mock.calls[0][0]
  expect(typeof frameRequestCallback1).toBe('function')

  const time = 50
  // Action
  frameRequestCallback1(time)

  // Checks
  expect(fn).toBeCalledTimes(1)
  expect(fn).toBeCalledWith(time)
  expect(rafMock).toBeCalledTimes(2)
  expect(rafMock.mock.calls[1].length).toBe(1)
  const frameRequestCallback2 = rafMock.mock.calls[0][0]
  expect(typeof frameRequestCallback2).toBe('function')
})

test('Waits for async function to finish', () => {
  const fn = jest.fn(async () => await new Promise<void>(() => {}))

  // Action
  repeatedAnimationFrame(fn)

  // Checks
  expect(fn).toBeCalledTimes(0)

  expect(rafMock).toBeCalledTimes(1)
  expect(rafMock.mock.calls[0].length).toBe(1)
  const frameRequestCallback1 = rafMock.mock.calls[0][0]
  expect(typeof frameRequestCallback1).toBe('function')

  const time = 50
  // Action
  frameRequestCallback1(time)

  // Checks
  expect(fn).toBeCalledTimes(1)
  expect(fn).toBeCalledWith(time)
  // Doesn't request another frame
  expect(rafMock).toBeCalledTimes(1)

  // TODO: Make sure raf gets called again after async function finishes
})

describe('Cleanup', () => {
  test('Cancels animation frame', () => {
    const cleanup = repeatedAnimationFrame(jest.fn())
    cleanup()
    expect(cafMock.mock.calls).toEqual([[rafMock.mock.results[0].value]])
  })

  test.todo('Cancel while async function is executing')
})
