import { createThreeApp } from '@slzr/three-app'
// Components
import { box } from './components/box';
import { lights } from './components/lights';

(async () => {
  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      scene.add(
        ...lights(),

        box(),
      )
    },
  })

  threeApp.start()
})()
