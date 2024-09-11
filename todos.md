
# TODOs

## Project
- [x] use [fnm](https://github.com/Schniz/fnm)
- [ ] Auto Generated Changelogs
- [ ] Linting
  - [ ] eslint + antfu
  - [ ] Biome - https://biomejs.dev/linter/
  - [ ] oxc Lint - https://oxc.rs/docs/guide/usage/linter.html
- [x] Docs using [vitepress](https://vitepress.dev/)
  - Injected `.ts` examples
  - https://typedoc-plugin-markdown.org/plugins/vitepress/quick-start

- Vite lib mode + ts types declarations `.d.ts`
  - `vite-plugin-dts`
  - [tsup](https://github.com/egoist/tsup)
  - `tsc --emitDeclarationOnly `
- [x] Publish scoped/organization package (@slzr)
- [] Auto generated `stackblitz` examples
- [] Semantic commits + Semver
  - [semantic-release](https://github.com/semantic-release/semantic-release)
  - [changeset](https://github.com/changesets/changesets)
  - [release-it](https://github.com/release-it/release-it)
  - [release-please](https://github.com/googleapis/release-please)
  - [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
- [] Github pipeline/workflow
- [] Set Github Project
- [] Add License, Author, Keywords to package

## Features
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
