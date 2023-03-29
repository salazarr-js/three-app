import { ThreeAppResizeCallback } from "./models"

/** */
const _onResizeCallbacks = new Set<ThreeAppResizeCallback>()

/** */
export function onResize(cb: ThreeAppResizeCallback) {
  _onResizeCallbacks.add(cb)
  return () => _onResizeCallbacks.delete(cb)
}

/** */
export function getOnResizeCallbacks() {
  return _onResizeCallbacks
}
