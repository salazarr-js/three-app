import type { ThreeAppProps, ThreeAppState } from '@/types'
import { onRender } from '@/hooks'
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

  if (props)
    applyProps(controls, props)

  onRender(() => {
    controls.update()
  })

  return controls
}
