import type { ThreeAppResizeCallback } from '@/types'

/** Internal set to store resize callbacks. */
const _resizeCallbacks = new Set<ThreeAppResizeCallback>()

/** Returns a readonly reference to the set of resize callbacks. */
export function getResizeCallbacks(): Set<ThreeAppResizeCallback> {
  return _resizeCallbacks
}

/**
 * Registers a resize callback and returns a function to remove it.
 *
 * This hook will be executed after a `.toggleFullscreen()` call
 */
export function useResize(callback: ThreeAppResizeCallback) {
  _resizeCallbacks.add(callback)
  return () => _resizeCallbacks.delete(callback)
}
