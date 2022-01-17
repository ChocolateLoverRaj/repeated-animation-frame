type SyncOrAsync<T extends (...args: any) => any> =
  (...params: Parameters<T>) => ReturnType<T> | PromiseLike<ReturnType<T>>

export default SyncOrAsync
