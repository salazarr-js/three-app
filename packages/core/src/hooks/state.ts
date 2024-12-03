import type { ThreeAppState } from '@/types'

/**  */
let _threeAppState: ThreeAppState

/**  */
export function updateThreeAppState(state: ThreeAppState) {
  _threeAppState = state
}

/** */
export function useThreeApp() {
  if (_threeAppState)
    return _threeAppState
  else throw new Error('The `useThreeApp()` hook can only be used inside the `onInit` function or after the three app instance has been created.')
}
