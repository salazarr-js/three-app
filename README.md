# Three App
Set of utility helpers to use `ThreeJs` in a functional and declarative way

## TODOs

- [ ] `createThreeApp`
  - [ ] scene
    - [ ] `components` to add on init
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
  - [ ] `onRender` hook
  - [ ] `ColorManagement`
  - [ ] `shadows`
  - [ ] `fullScreenMode`

- [ ] multiple `threeApp` instances
  - [ ] `getThreeAppInstance` | `resolveDispatcher`

- [ ] `onDestroy` hook
  - [ ] remove element from `toRender` if needed
  - [ ] remove element from `toIntersect` if needed

- [ ] Accept `.gltf` files
  > https://github.com/edwinwebb/three-seed
  > https://whsjs.readme.io/docs
- [ ] Generate documentation
