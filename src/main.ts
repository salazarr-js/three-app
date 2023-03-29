import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { createThreeApp } from './core'
// DEMO STYLES
import './style.scss'


/** DEMO */
const geometry = new BoxGeometry( 1, 1, 1 );
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh( geometry, material );

const app = await createThreeApp({
  container: document.getElementById('three-app')!,
  onInit({ scene }) {
    scene.add(cube)
  },
  onRender(_) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
})

app.start()
