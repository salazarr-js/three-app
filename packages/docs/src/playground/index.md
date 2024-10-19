# 👾 Playground

```ts
const container = document.getElementById('three-app')
const containerWidth = 1024
const containerHeight = 520

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(containerWidth, containerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)
container.append(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}
```

<div id="three-app"></div>
<button type="button" @click="toggleFullScreen">fullscreen</button>

<script setup lang="ts">
import { onMounted } from 'vue'
import { createThreeApp, applyProps } from '@slzr/three-app'
import * as THREE from 'three'

let threeApp = null

onMounted(async () => {
  const container = document.getElementById('three-app')

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)

  threeApp = await createThreeApp({
    container,
    onInit({ scene }) {
      console.warn({ scene })

      applyProps(scene, { background: new THREE.Color('#f0f0f0') })
      scene.add(cube)
    },
    onRender(ctx) {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    }
  })

  threeApp.start()
})

function toggleFullScreen() {
  console.warn({ threeApp })
  if (threeApp) threeApp.toggleFullscreenMode()
}
</script>

<style scoped lang="scss">
#three-app {
  width: 1024px;
  height: 520px;
}

</style>
