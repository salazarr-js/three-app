# Getting Started

## Installation

```sh
npm i three @slzr/three-app
npm i -D @types/three
```

## Creating our first scene

```js
import { Cube } from 'three'
import { createThreeApp } from '@slzr/three-app'

const app = await createThreeApp({
  container: '#container',
  onInit({ scene }) {
    const cube = new Cube()
    scene.add(cube)
  }
})

app.start();
```
