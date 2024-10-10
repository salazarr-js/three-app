# Getting Started

## Installation

```sh
npm i three @slzr/three-app
npm i -D @types/three
```

## Creating our first scene

```js
import { createThreeApp } from '@slzr/three-app'
import { Cube } from 'three'

document.addEventListener('DOMContentLoaded', async () => {
  const app = await createThreeApp({
    container: '#container',
    onInit({ scene }) {
      const cube = new Cube()
      scene.add(cube)
    }
  })

  app.start()
})
```
