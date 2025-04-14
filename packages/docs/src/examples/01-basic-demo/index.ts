/**
 * Basic demo.
 * Based on [React Three Fiber - Basic Demo](https://codesandbox.io/s/rrppl0y8l4).
 */
import { createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/extras'
// Components
import { box } from './box'
import { lights } from './lights'

(async () => {
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
