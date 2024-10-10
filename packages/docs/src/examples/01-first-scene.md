# First Scene

```js
import { createThreeApp } from '@slzr/three-app'
import { Cube } from 'three'

const app = await createThreeApp({
  container: '#container',
  onInit({ scene }) {
    const cube = new Cube()
    scene.add(cube)
  }
})

app.start()
```
