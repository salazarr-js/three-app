# TODOs

## Project
- [x] use [fnm](https://github.com/Schniz/fnm)
- [ ] Auto Generated Changelogs
- [x] Linting
  - [x] eslint + antfu
- [x] Docs using [vitepress](https://vitepress.dev/)
  - [x]Injected `.ts` examples
  - [ ] spanish version
  - https://typedoc-plugin-markdown.org/plugins/vitepress/quick-start

- Vite lib mode + ts types declarations `.d.ts`
  - `vite-plugin-dts`
  - [tsup](https://github.com/egoist/tsup)
  - `tsc --emitDeclarationOnly `
- [x] Publish scoped/organization package (@slzr)
- [x] Auto generated `stackblitz` examples
- [] Semantic commits + Semver
  - [semantic-release](https://github.com/semantic-release/semantic-release)
  - [changeset](https://github.com/changesets/changesets)
  - [release-it](https://github.com/release-it/release-it)
  - [release-please](https://github.com/googleapis/release-please)
  - [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
- [] Github pipeline/workflow
- [] Set Github Project
- [x] Add License, Author, Keywords to package

## Features
- [x] `createThreeApp`
  - [x] scene
  - [x]camera
    - [x] aspect ratio
    - [x] `OrthographicCamera`
    - [x] `PerspectiveCamera`
  - [x] renderer
  - [x] render loop
    - [x] `render()`
    - [x] `start()`
    - [x] `stop()`
  - [x] `onResize` hook
  - [x] `onRender` hook
    - [ ] `clock`
  - [ ] `ColorManagement`
  - [ ] `shadows`
  - [x] `fullScreenMode`

- [x] `applyProps`
  - [ ] accept `-` separated props like `position-y: 2` | `rotation-x: -Math.PI / 2`
  - [ ] Can extends `ThreeProps` like `ThreeProps<T, { color: string }>`
  - [ ] accept functions like `camera.lookAt()`
    - [ ] map function types to receive params and call func
  - [ ] handle prop types
    - [x] Vector 2,3,4 like props [position]
    - [ ] Scale
    - [ ] color
    - [ ] rotation

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
  -[x] `applyProps`

- [x] Publish `beta` version
- [ ] `#threeJsJourney` en twitter
