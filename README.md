<p align="center">
  <img height="80px" src="./packages/docs/src/public/logo-simple.png" alt="Three App logo">

  <h1 align="center">Three App</h1>
</p>

<p align="center"><a href="https://threejs.org/">ThreeJs</a> but functional and declarative.</p>

> [!WARNING]
> This project/package is a **Work In Progress** and was created for learning purposes. Do not use in production.

## 🚀 Features

`ThreeApp` is simply a set of functions and helpers designed to speed up your `ThreeJs` development

- 🍦 Vanilla and framework agnostic
- 🔑 Type Safe
- ⚡ Batteries included (Default Camera and Renderer, render loop and common event handling)
- 📦 Lightweight
- 🔌 `ESM` & ` CommonJs` compatible

## 🚨 Limitations

The way all hooks were written limit the amount of instances that can be created to **one** by page.

## ⭐ Heavily inspired on

- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Tresjs](https://github.com/Tresjs/tres)
- [Threlte](https://github.com/threlte/threlte)
- [Spline](https://spline.design/)

## 📚 References

### Tutorials

#### Library/NPM Package
- [Crea un monorepositorio multipaquete con npm workspaces y releases de paquetes](https://youtu.be/2QSBXhuqSlI)
- [💥 Monorepo multipaquete con NPM Workspaces 📦 (FullStack Bootcamp JavaScript)](https://youtu.be/KEkRy4q_0oI)
- [Blazing Fast Tips: Publishing to NPM](https://youtu.be/eh89VE3Mk5g)
- [How to make your own NPM package (Step-by-Step) 📦](https://youtu.be/xnfdm-s8adI)
- [Create a library using Vite lib mode](https://youtu.be/XDip9onOTps)

#### Github Projects
- [Using Projects for feature planning](https://www.youtube.com/watch?v=yFQ-p6wMS_Y)
- [TABLEROS DE PROYECTOS | GITHUB BÁSICO | GITHUB PROJECTS | EPPR CLASE 205](https://www.youtube.com/watch?v=Oul3wLKpx04)
- [GitHub Projects: finding clarity in the chaos - Universe 2022](https://www.youtube.com/watch?v=vqbcNXtHgvg)

- [Web.dev - Sandboxed Iframes](https://web.dev/articles/sandboxed-iframes)

### Logo

[![Oscar Reutersvärd](https://finelinegd.com/wp-content/uploads/2014/05/or_header.jpg)](https://finelinegd.com/oscar-reutersvard-the-father-of-impossible-figures/)

The `Three App` logo design was heavily inspired by [Oscar Reutersvärd](https://wikipedia.org/wiki/Oscar_Reutersv%C3%A4rd) work.

---

## 🧰 Setup

### Install `NodeJs LTS` version using [fnm](https://github.com/Schniz/fnm) (RECOMMENDED)

```sh
fnm use --resolve-engines --install-if-missing
```

### Scripts

```sh
npm run dev      # Start `core` and `docs` packages dev server
npm run dev:core # Start `core` package dev server
npm run dev:docs # Start `docs` package dev server
npm run publish  # Build and publish to npm core package
```

---

## 🛸 Getting Started

### Installation

```bash
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

To learn more about `Three App`, check the [documentation](https://three.salazarjs.dev/).
