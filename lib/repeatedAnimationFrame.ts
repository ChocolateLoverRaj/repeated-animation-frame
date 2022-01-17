import Cleanup from './Cleanup'
import SyncOrAsync from './SyncOrAsync'

const repeatedAnimationFrame = (callback: SyncOrAsync<FrameRequestCallback>): Cleanup => {
  let handle: number
  let canceled = false
  const setHandle = (): void => {
    handle = requestAnimationFrame(_frameRequestCallback)
  }
  const _frameRequestCallback: FrameRequestCallback = time => {
    const result = callback(time)
    if (result !== undefined) {
      // 'await' promise
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.then(() => {
        if (!canceled) setHandle()
      })
    } else {
      // Start right away
      // It's impossible for canceled to be true because then this function would not be called
      setHandle()
    }
  }
  setHandle()
  return () => {
    cancelAnimationFrame(handle)
    canceled = true
  }
}

export default repeatedAnimationFrame
