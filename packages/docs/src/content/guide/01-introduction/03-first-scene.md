# 🌄 Creating your first scene

<ThreeAppExample :path :scripts />

> This is based on the [three.js - Creating a scene](https://threejs.org/manual/#en/creating-a-scene) tutorial.

## 📝 Setup your template

::: code-group
```html [index.html]
<!-- Add your container element -->
<div id="three-app"></div>

<!-- Import your script as a `module` -->
<script type="module" src="/main.ts"></script>
```
:::

## 🎨 Add some styles

::: code-group
```css [styles.css]
#three-app {
  width: 100%;
  aspect-ratio: 16 / 9;
}
:::

## 📜 Write your awesome 3D script

::: code-group
<<< @/../examples/01-first-scene/index.ts [main.ts]
:::

## 🧊 Let it rip

And that is pretty much of it.

<img class="rounded-lg"
  src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp0M2RtbHg1YTI3cm5rd3d5bjNmMTY5emZkeTEzZW0yNzhtcmx5MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ui1hpJSyBDWlG/giphy.gif"
/>

> Take a look to the [🚦 Before You Start](guide/getting-started#🚦-before-you-start)) section for some inspiration and useful links.

<script setup lang="ts">
import { data } from '../../examples/examples.data'

const path= '01-first-scene'
const scripts = data[path]
</script>
