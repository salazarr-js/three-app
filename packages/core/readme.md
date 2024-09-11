<p align="center">
  <img height="80px" src="../docs/src/public/logo-simple.png" alt="Three App logo">

  <h1 align="center">Three App</h1>
</p>

<p align="center">Set of utility helpers to use <a href="https://threejs.org/">ThreeJs</a> in a functional and declarative way</p>

> [!WARNING]
> This project/package was created for learning purposes. Do not use in production

## Features

- Fast and easy to start
- Component based
- Functional and declarative
- 🔑 Type Safe
- ⚡ Batteries included
- 📦 Lightweight
- 🔌 `ESM` & ` CommonJs` compatible

## Installation

```sh
npm install three @slzr/three-app
npm install -D @types/three
```

## Basic Usage

```js
import { Cube } from 'three'
import { createThreeApp } from '@slzr/three-app'

document.addEventListener("DOMContentLoaded", async () => {
  const app = await createThreeApp({
    container: '#container',
    onInit({ scene }) {
      const cube = new Cube()
      scene.add(cube)
    }
  })

  app.start();
})
```


## Documentation

To learn more about `Three App`, check the [documentation](https://three.salazarjs.dev/).
