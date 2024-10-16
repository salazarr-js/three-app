<p align="center">
  <img height="80px" src="../docs/src/public/logo-simple.png" alt="Three App logo">

  <h1 align="center">Three App</h1>
</p>

<p align="center"><a href="https://threejs.org/">ThreeJs</a> but functional and declarative.</p>

> ⚠️ **Warning** <br/>
> This project/package was created for learning purposes. **Do not use in production**.

## 🚀 Features

`ThreeApp` is simply a set of functions and helpers designed to speed up your `ThreeJs` development

- 🍦 Vanilla and framework agnostic
- 🔑 Type Safe
- ⚡ Batteries included (Default Camera and Renderer, render loop and common event handling)
- 📦 Lightweight
- 🔌 `ESM` & ` CommonJs` compatible

---

## 🛸 Getting Started

### Installation

```sh
npm install three @slzr/three-app
npm install -D @types/three
```

### Add the container element to your markup

```html
<div id="three-app"></div>
```

### Basic Usage

```ts
import { createThreeApp } from '@slzr/three-app'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

// It can be composed into `components`
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: 0x00FF00 })
const cube = new Mesh(geometry, material)

const app = await createThreeApp({
  container: '#container',
  onInit({ scene }) {
    scene.add(cube)
  },
  onRender({ time, }) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }
})

app.start()
```

## 🗃️ Documentation

To learn more about `Three App`, check the [documentation](https://slzr-three-app.vercel.app).
