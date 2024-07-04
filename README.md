# Three App
Set of utility helpers to use `ThreeJs` in a functional and declarative way


# Pre-requisites

```sh
# Install NodeJs version using `fnm` (RECOMMENDED)
fnm use --resolve-engines --install-if-missing
```


## TODOs

- [x] fnm
- [ ] Auto Generated Changelogs
- [ ] Linting
  - [ ] eslint + antfu
  - [ ] Biome - https://biomejs.dev/linter/
  - [ ] oxc Lint - https://oxc.rs/docs/guide/usage/linter.html
- Docs `vitepress`
  - Injected `.ts` examples
- Vite lib mode + ts types declarations `.d.ts`
- Publish scoped/organization package (slzr)
- Auto generated `stackblitz` examples

- [ ] `createThreeApp`
  - [ ] scene
  - [ ] camera
    - [ ] aspect ratio
    - [ ] `OrthographicCamera`
    - [ ] `PerspectiveCamera`
  - [ ] renderer
  - [ ] render loop
    - [ ] `render()`
    - [ ] `start()`
    - [ ] `stop()`
  - [ ] `initialValues`
  - [ ] `onResize` hook
  - [ ] `onRender` hook
    - [ ] `clock`
  - [ ] `ColorManagement`
  - [ ] `shadows`
  - [ ] `fullScreenMode`

- [ ] `applyProps`
  - [ ] accept `-` separated props like `position-y: 2` | `rotation-x: -Math.PI / 2`
  - [ ] Can extends `ThreeProps` like `ThreeProps<T, { color: string }>`
  - [ ] accept functions like `camera.lookAt()`
- [ ] handle `color`, `scale`, `vector2`, `rotation`


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

- [ ] tests
  -[ ] `applyProps`
 - [ ] test changing 1, 2 and 3 axis for

- [ ] Publish `beta` version
- [ ] `#threeJsJourney` en twitter
