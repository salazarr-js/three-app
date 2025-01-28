import { createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'
import { createCube } from './cube'

(async () => {
  const cube = createCube({ color: 'red' })

  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      useOrbitControls()

      scene.add(cube)
    },
  })

  threeApp.start()
})()
