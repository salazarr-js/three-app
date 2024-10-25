import { createThreeApp } from '@slzr/three-app'
import * as THREE from 'three'

(async () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)

  const threeApp = await createThreeApp({
    container: document.getElementById('three-app'),
    onInit({ scene }) {
      scene.add(cube)
    },
    onRender() {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    },
  })

  threeApp.start()
})()
