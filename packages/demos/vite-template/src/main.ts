import { createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/extras'
// Components
import { box } from './components/box'
import { lights } from './components/lights'

import './style.css'

(async function() {
  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      useOrbitControls()

      scene.add(
        lights(),

        box({ position: [-1.2, 0, 0] }),
        box({ position: [1.2, 0, 0] }),
      )
    },
  })

  threeApp.start()
})()

