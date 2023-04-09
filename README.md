# Three App
Set of utility helpers to use `ThreeJs` in a functional and declarative way

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Get started

### Add the container element to your markup

```html
<div id="three-app"></div>
```

### Create components and use `hooks`

```ts
import { onRender } from '@slzr/three-app'

function createCube() {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00FF00 })
  const cube = new Mesh(geometry, material)

  onRender((_) => {
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
  - [x] camera
    - [x] aspect ratio
    - [x] `OrthographicCamera`
    - [x] `PerspectiveCamera`
  - [x] renderer
  - [x] render loop
    - [x] `render()`
    - [x] `start()`
    - [x] `stop()`
  - [x] `initialValues`
  - [x] `onResize` hook
  - [x] `onRender` hook
    - [ ] `clock`
  - [x] `ColorManagement`
  - [ ] `shadows`
  - [x] `fullScreenMode`

- [x] `applyProps`
  - [ ] accept `-` separated props like `position-y: 2` | `rotation-x: -Math.PI / 2`
  - [x] Can extends `ThreeProps` like `ThreeProps<T, { color: string }>`
  - [ ] accept functions like `camera.lookAt()`
- [ ] `createWithProps` fn
- [ ] map `ColorLikeProps`
- [ ] Basic Three components
  - [ ] Lights
  - [ ] Camera Controls
- [ ] `onHover`
- [ ] `onClick`
- [ ] `useThreeApp`

- [ ] `tweakpane`
- [ ] multiple `threeApp` instances
  - [ ] `getThreeAppInstance` | `resolveDispatcher`
- [ ] `onDestroy` hook
  - [ ] remove element from `toRender` if needed
  - [ ] remove element from `toIntersect` if needed
- [ ] Accept `.gltf` files
  > https://github.com/edwinwebb/three-seed
  > https://whsjs.readme.io/docs
- [ ] Generate documentation
- [x] eslint + antfu
