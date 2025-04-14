/**
 * Three App - First Scene.
 * This is a port based on the [three.js - Creating a scene](https://threejs.org/manual/#en/creating-a-scene) tutorial.
 */
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { createThreeApp } from '@slzr/three-app'

(async () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new Mesh(geometry, material)

  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
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
