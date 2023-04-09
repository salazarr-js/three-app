import type { ThreeAppHookCallback, ThreeAppRenderCallback, ThreeAppResizeCallback } from './models'

/** Internal list of callbacks to be run on every `onResize` call */
const _onResizeCallbacks = new Set<ThreeAppResizeCallback>()

/** Add callback to `resize` hook */
export function onResize(cb: ThreeAppResizeCallback) {
  _onResizeCallbacks.add(cb)
  return () => _onResizeCallbacks.delete(cb)
}

/** Returns all saved callbacks to be run on every `onResize` call */
export function getOnResizeCallbacks() {
  return _onResizeCallbacks
}

/** Internal list of callbacks to be run on every `onFullscreenModeChange` call */
const _onFullscreenModeChangeCallbacks = new Set<ThreeAppHookCallback>()

/** Add callback to `fullscreenModeChange` hook */
export function onFullscreenModeChange(cb: ThreeAppHookCallback) {
  _onFullscreenModeChangeCallbacks.add(cb)
  return () => _onFullscreenModeChangeCallbacks.delete(cb)
}

/** Returns all saved callbacks to be run on every `onFullscreenModeChange` call */
export function getOnFullscreenModeChangeCallbacks() {
  return _onFullscreenModeChangeCallbacks
}

/** Internal list of callbacks to be run on every `onRender` call */
const _onRenderCallbacks = new Set<ThreeAppRenderCallback>()

/** Add callback to `render` hook */
export function onRender(cb: ThreeAppRenderCallback) {
  _onRenderCallbacks.add(cb)
  return () => _onRenderCallbacks.delete(cb)
}

/** Returns all saved callbacks to be run on every `onRender` call */
export function getOnRenderCallbacks() {
  return _onRenderCallbacks
}
