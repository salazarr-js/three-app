import { ThreeAppResizeCallback, ThreeAppRenderCallback } from "./models"


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


/** */
const _onRenderCallbacks = new Set<ThreeAppRenderCallback>()

/** */
export function onRender(cb: ThreeAppRenderCallback) {
  _onRenderCallbacks.add(cb)
  return () => _onRenderCallbacks.delete(cb)
}

/** */
export function getOnRenderCallbacks() {
  return _onRenderCallbacks
}
