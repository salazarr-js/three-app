import type { ThreeAppProps } from '@/types'
import { useRender, useThreeApp } from '@/hooks'
import { applyProps } from '@/utils'
// import { OrbitControls } from 'three-stdlib'
import { OrbitControls } from 'three/examples/jsm/Addons.js'


/**
 * Three App compatible Orbit Controls
 *
 * - [three.js - OrbitControls](https://threejs.org/docs/index.html?q=contr#examples/en/controls/OrbitControls)
 * - [three-stdlib - OrbitControls](https://github.com/pmndrs/three-stdlib/blob/main/src/controls/OrbitControls.ts)
 */
export function useOrbitControls(props?: ThreeAppProps<OrbitControls>) {
  const { camera, renderer } = useThreeApp()
  const controls = new OrbitControls(camera, renderer.domElement)

  if (props)
    applyProps(controls, props)
  useRender(() => controls.update())

  return controls
}
