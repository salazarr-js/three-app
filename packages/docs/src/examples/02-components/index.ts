import { AmbientLight, PointLight, SpotLight } from 'three'
import { applyProps, createThreeApp } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'
//
import { box } from './box'

(async () => {
  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      useOrbitControls()

      scene.add(
        applyProps(new AmbientLight(), { intensity: Math.PI / 2 }),
        applyProps(new SpotLight(), { position: [10, 10, 10], angle: 0.15, penumbra: 1, decay: 0, intensity: Math.PI }),
        applyProps(new PointLight(), { position: [-10, -10, -10], decay: 0, intensity: Math.PI }),

        box({ position: [-1.2, 0, 0]}),
        box({ position: [1.2, 0, 0]}),
      )
    }
  })

  threeApp.start()
})()
