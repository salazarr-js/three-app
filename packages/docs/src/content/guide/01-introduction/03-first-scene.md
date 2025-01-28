# 🌄 Creating your first scene

<ClientOnly>
</ClientOnly>

> This is based on the [three.js - Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) tutorial.

## 📝 Setup your template

::: code-group
```html [index.html]
<!-- Add your container element -->
<div id="three-app"></div>

<!-- Import your script as a `module` -->
<script type="module" src="/main.ts"></script>
```
:::

## 🎨 Add your styles

::: code-group
```css [styles.css]
#three-app {
  width: 100%;
  aspect-ratio: 16 / 9;
}
:::

## 📜 Write your awesome 3D script

::: code-group
```ts [main.ts]
import { createThreeApp } from '@slzr/three-app'
import * as THREE from 'three'

(async () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new THREE.Mesh(geometry, material)

  // Create three app instance
  const threeApp = await createThreeApp({
    container: document.getElementById('three-app')!,
    onInit({ scene }) {
      scene.add(cube) // Add objects to the scene
    },
    onRender() {
      // Animating the cube
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    },
  })

  threeApp.start() // Start the render loop
})()
```
:::

## 🧊 Let it rip

And that is pretty much of it

<img class="rounded-lg"
  src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp0M2RtbHg1YTI3cm5rd3d5bjNmMTY5emZkeTEzZW0yNzhtcmx5MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ui1hpJSyBDWlG/giphy.gif"
/>

<script setup lang="ts">
import { data } from '../../examples/examples.data'

const scripts = data['01-first-scene']
</script>
