# Three App
Set of utility helpers to use `ThreeJs` in a functional and declarative way

## Get started

### Add the container element to your markup

```html
<div id="three-app"></div>
```

### Create components and use `hooks`
```ts
import { onRender } from '@slzr/three-app'

function createCube() {
  const geometry = new BoxGeometry( 1, 1, 1 );
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh( geometry, material );

  onRender(_ => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  })

  return cube
}
```

### Create your `ThreeJs` app and add components to the scene

```ts
import { createThreeApp } from '@slzr/three-app'

const app = await createThreeApp({
  container: document.getElementById('three-app')!,
  onInit({ scene }) {
    const cube = createCube()

    scene.add(cube)
  }
})

app.start()
```

## TODOs

- [ ] `createThreeApp`
  - [x] scene
  - [ ] camera
    - [x] aspect ratio
    - [ ] `OrthographicCamera`
    - [x] `PerspectiveCamera`
  - [x] renderer
  - [x] render loop
    - [x] `render()`
    - [x] `start()`
    - [x] `stop()`
  - [ ] `initialValues`
  - [x] `onResize` hook
  - [x] `onRender` hook
  - [ ] `ColorManagement`
  - [ ] `shadows`
  - [x] `fullScreenMode`

- [ ] `applyProps`
- [ ] three components

- [ ] `onHover`
- [ ] `onClick`


- [ ] multiple `threeApp` instances
  - [ ] `getThreeAppInstance` | `resolveDispatcher`

- [ ] `onDestroy` hook
  - [ ] remove element from `toRender` if needed
  - [ ] remove element from `toIntersect` if needed

- [ ] Accept `.gltf` files
  > https://github.com/edwinwebb/three-seed
  > https://whsjs.readme.io/docs
- [ ] Generate documentation
