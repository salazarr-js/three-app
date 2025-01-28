import { createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

(async () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00FF00, wireframe: true })
  const cube = new Mesh(geometry, material)

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
