import type { ThreeAppFullscreenCallback } from '@/types'

/** Internal set to store fullscreen callbacks. */
const _fullscreenCallbacks = new Set<ThreeAppFullscreenCallback>()

/** Returns a readonly reference to the set of fullscreen callbacks. */
export function getFullscreenCallbacks() {
  return _fullscreenCallbacks
}

/** Registers a fullscreen callback and returns a function to remove it. */
export function useFullscreen(cb: ThreeAppFullscreenCallback) {
  _fullscreenCallbacks.add(cb)
  return () => _fullscreenCallbacks.delete(cb)
}
