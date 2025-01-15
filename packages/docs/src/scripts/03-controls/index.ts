import { createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'
import * as THREE from 'three'

(async () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true })
  const cube = new THREE.Mesh(geometry, material)

  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ camera, scene }) {
      camera.position.y = 2

      useOrbitControls({ autoRotate: true })

      scene.add(cube)
    },
    onRender() {
    },
  })

  threeApp.start()
})()
