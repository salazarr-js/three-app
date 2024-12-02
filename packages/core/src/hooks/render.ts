import type { ThreeAppRenderCallback } from '@/types'

/** Internal set to store render callbacks. */
const _renderCallbacks = new Set<ThreeAppRenderCallback>()

/** Returns a readonly reference to the set of render callbacks. */
export function getRenderCallbacks() {
  return _renderCallbacks
}

/** Registers a render callback and returns a function to remove it. */
export function useRender(cb: ThreeAppRenderCallback) {
  _renderCallbacks.add(cb)
  return () => _renderCallbacks.delete(cb)
}
