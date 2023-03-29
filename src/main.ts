import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { createThreeApp, onRender } from './index'
// DEMO STYLES
import './style.scss'


/** DEMO */
(async function() {

  /** */
  function createCube() {
    const geometry = new BoxGeometry( 1, 1, 1 );
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh( geometry, material );

    onRender(_=> {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    })

    return cube
  }

  const app = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      const cube = createCube()

      scene.add(cube)
    }
  })

  app.start()
})()

