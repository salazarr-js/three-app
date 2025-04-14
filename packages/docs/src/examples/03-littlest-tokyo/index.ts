/**
 * Three App - Littlest Tokyo
 * Based on [Three.js - Animation/Keyframes](https://threejs.org/examples/#webgl_animation_keyframes) example.
 */
import { AnimationMixer, Color, PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { applyProps, createThreeApp } from '@slzr/three-app'
import { useOrbitControls, useGLTF } from '@slzr/three-app/extras'

(async () => {
  const container = document.getElementById('three-app')!
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
      const gltf = await useGLTF('https://threejs.org/examples/models/gltf/LittlestTokyo.glb', { draco: true })
      const model = gltf.scene
      applyProps(model, { position: [1, 1, 0], scale: [0.01, 0.01, 0.01] })
      // Animation
      mixer = new AnimationMixer(model)
      mixer.clipAction(gltf.animations[0]).play()

      scene.add(model)
    },
    onRender({ state: { clock } }) {
      mixer.update(clock.getDelta())
    },
  })

  threeApp.start()
  container.addEventListener('dblclick', () => threeApp.toggleFullscreen())
})()
