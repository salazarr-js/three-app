import { AnimationMixer, Color, PMREMGenerator } from 'three'
//
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
//
import { applyProps, createThreeApp, useLoader } from '@slzr/three-app'
import { useOrbitControls } from '@slzr/three-app/components'

(async () => {
  const container = document.getElementById('three-app')!
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/')

  let mixer: AnimationMixer

  const threeApp = await createThreeApp({
    container,
    camera: {
      fov: 40,
      position: [5, 2, 8],
    },
    async onInit({ scene, renderer }) {
      useOrbitControls({ target: [0, 0.5, 0], enablePan: false, enableDamping: true })

      // Scene
      const pmremGenerator = new PMREMGenerator(renderer)
      scene.background = new Color(0xBFE3DD)
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture

      // Models
      const gltf = await useLoader(
        GLTFLoader,
        'https://threejs.org/examples/models/gltf/LittlestTokyo.glb',
        {
          extend(loader) {
            loader.setDRACOLoader(dracoLoader)
          },
        },
      )
      const model = gltf.scene
      applyProps(model, { position: [1, 1, 0], scale: [0.01, 0.01, 0.01] })

      mixer = new AnimationMixer(model)
      mixer.clipAction(gltf.animations[0]).play()
      scene.add(model)

      console.warn(scene)
    },
    onRender({ state: { clock } }) {
      mixer.update(clock.getDelta())
    },
  })

  threeApp.start()
  container.addEventListener('dblclick', () => threeApp.toggleFullscreen())
})()
