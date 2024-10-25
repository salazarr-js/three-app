import { createThreeApp } from '@slzr/three-app'
import { createCube } from './cube'

(async () => {
  const cube = createCube({ color: 'red' })

  const threeApp = await createThreeApp({
    container: document.getElementById('three-app'),
    onInit({ scene }) {
      scene.add(cube)
    },
  })

  threeApp.start()
})()
