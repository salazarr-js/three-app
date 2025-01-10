import { applyProps, createThreeApp, onClick, onPointerEnter, onPointerLeave, ThreeAppProps, useRender } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'
import * as THREE from 'three'

/** */
function box(props: ThreeAppProps<THREE.Mesh>) {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 'orange' })
  const cube = new THREE.Mesh(geometry, material)
  let clicked = false

  applyProps(cube, props)

  useRender(() => cube.rotation.x += 0.01)

  /** */
  onClick(cube, () => {
    clicked = !clicked

    cube.scale.setScalar(clicked ? 1.5 : 1)
  })

  /** */
  onPointerEnter(cube, () => {
    material.color.set('hotpink')
  })

  /** */
  onPointerLeave(cube, () => {
    material.color.set('orange')
  })

  return cube
}

(async () => {
  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ camera, renderer, scene }) {
      useOrbitControls(camera, renderer)

      scene.add(
        applyProps(new THREE.AmbientLight(), { intensity: Math.PI / 2 }),
        applyProps(new THREE.SpotLight(), { position: [10, 10, 10], angle: 0.15, penumbra: 1, decay: 0, intensity: Math.PI }),
        applyProps(new THREE.PointLight(), { position: [-10, -10, -10], decay: 0, intensity: Math.PI }),

        box({ position: [-1.2, 0, 0]}),
        box({ position: [1.2, 0, 0]}),
      )
    }
  })

  threeApp.start()
})()
