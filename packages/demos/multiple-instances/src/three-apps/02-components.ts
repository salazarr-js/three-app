import { AmbientLight, PointLight, SpotLight } from 'three'
import { applyProps, createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'

//
import { box } from './components/box';

(async () => {
  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      useOrbitControls()

      scene.add(
        applyProps(new AmbientLight(), { intensity: Math.PI / 2 }),
        applyProps(new SpotLight(), { angle: 0.15, decay: 0, intensity: Math.PI, penumbra: 1, position: [10, 10, 10] }),
        applyProps(new PointLight(), { decay: 0, intensity: Math.PI, position: [-10, -10, -10] }),

        box({ position: [-1.2, 0, 0] }),
        box({ position: [1.2, 0, 0] }),
      )
    },
  })

  threeApp.start()
})()
