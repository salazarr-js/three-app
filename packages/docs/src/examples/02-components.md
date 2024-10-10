# Components

## Create components using hooks

```js
export function createCube() {
  const cube = new Cube()
  applyProps(cube, {})

  return {
    ...cube,
    onRender(delta) {
      cube.position.y++
    }
  }
}
```

## Add Components to scene

```js
import { createThreeApp } from '@slzr/three-app'
import { createCube } from './cube'

const app = await createThreeApp({
  container: '#container',
  onInit({ scene }) {
    scene.add(createCube())
  }
})

app.start()
```
