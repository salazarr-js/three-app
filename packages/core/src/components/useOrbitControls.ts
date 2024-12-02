import type { ThreeAppProps, ThreeAppState } from '@/types'
import { useRender } from '@/hooks'
import { applyProps } from '@/utils'
import { OrbitControls } from 'three-stdlib'

/** */
interface OrbitControlsParams {
  camera: ThreeAppState['camera']
  renderer: ThreeAppState['renderer']
}

/** Three App compatible Orbit Controls */
export function useOrbitControls(params: OrbitControlsParams, props?: ThreeAppProps<OrbitControls>) {
  const controls = new OrbitControls(params.camera, params.renderer.domElement)

  // TODO: `useThreeApp` to get camera and renderer

  if (props)
    applyProps(controls, props)

  useRender(() => {
    controls.update()
  })

  return controls
}
