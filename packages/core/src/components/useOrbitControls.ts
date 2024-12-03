import type { ThreeAppProps } from '@/types'
import { useRender, useThreeApp } from '@/hooks'
import { applyProps } from '@/utils'
import { OrbitControls } from 'three-stdlib'

/** Three App compatible Orbit Controls */
export function useOrbitControls(props?: ThreeAppProps<OrbitControls>) {
  const { camera, renderer } = useThreeApp()
  const controls = new OrbitControls(camera, renderer.domElement)

  if (props)
    applyProps(controls, props)
  useRender(() => controls.update())

  return controls
}
