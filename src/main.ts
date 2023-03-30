import { BoxGeometry, Mesh, Color, AmbientLight, MeshStandardMaterial, SpotLight, PointLight } from 'three'
import { createThreeApp, onRender } from './index'
// DEMO STYLES
import './style.scss'


/** DEMO */
(async function() {

  /** */
  function createCube(props: Record<string, any>) {
    const geometry = new BoxGeometry( 1, 1, 1 )
    const material = new MeshStandardMaterial({ color: new Color(props.color ?? 'orange') })
    const cube = new Mesh( geometry, material )

    const [x, y, z] = props.position
    cube.position.set(x, y, z)

    onRender(_ => {
      cube.rotation.x += 0.01
    })

    return cube
  }

  function createSpotlight(props: any) {
    const light = new SpotLight()

    const [x, y, z] = props.position
    light.position.set(x, y, z)

    light.angle = props.angle ?? light.angle
    light.penumbra = props.penumbra ?? light.penumbra

    return light
  }

  function createPointLight(position: number[]) {
    const light = new PointLight()

    const [x, y, z] = position
    light.position.set(x,y,z)
    return light
  }

  const app = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      const cube1 = createCube({ color: 'orange', position: [1.2, 0, 0] })
      const cube2 = createCube({ color: 'hotpink', position: [-1.2, 0, 0] })

      scene.add(
        new AmbientLight(new Color('white'), 1),
        createSpotlight({ position: [10, 10, 10], angle: 0.15, penumbra: 1 }),
        createPointLight([-10, -10, -10]),
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

