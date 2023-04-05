import {
  BoxGeometry, Mesh, Color,
  AmbientLight, MeshStandardMaterial, SpotLight,
  PointLight, ColorRepresentation
} from 'three'
import { createThreeApp, onRender, applyProps, omit, ThreeProps } from './index'
// DEMO STYLES
import './style.scss'



/** DEMO */
;(async function() {

  /** */
  function createCube(props: ThreeProps<Mesh<BoxGeometry, MeshStandardMaterial> & { color: ColorRepresentation }>) {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshStandardMaterial({ color: new Color(props.color ?? 'orange') })
    const cube = new Mesh( geometry, material )

    applyProps(cube, omit(props, ['color']))

    onRender(_ => {
      cube.rotation.x += 0.01
    })

    return cube
  }

  function createSpotlight(props: ThreeProps<SpotLight>) {
    const light = new SpotLight()

    applyProps(light, props)
    return light
  }

  function createPointLight(props: ThreeProps<PointLight>){
    const light = new PointLight()

    applyProps(light, props)
    return light
  }

  const app = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      const cube1 = createCube({ position: [1.2, 0, 0], })
      const cube2 = createCube({ color: 'hotpink', position: [-1.2, 0, 0], })

      scene.add(
        new AmbientLight('white', .75),
        createSpotlight({ position: [10, 10, 10], angle: 0.15, penumbra: 1 }),
        createPointLight({ position: [-10, -10, -10] }),
        cube1, cube2,
      )
    }
  })

  app.start()

  document.getElementById('toogleFullscreen')
    ?.addEventListener('click', _ => {
      app.toggleFullscreenMode()
    })
})()

