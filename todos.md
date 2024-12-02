# TODOs

- [ ] update todo list
- [ ] update core readme.md and root readme.md

https://sbcode.net/threejs/

## Project
- [x] use [fnm](https://github.com/Schniz/fnm)
- [ ] Auto Generated Changelogs
- [x] Linting
  - [x] eslint + antfu
  - [ ] diy eslint config
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

## Core Features
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
  - [ ] `ColorManagement`
  - [ ] `shadows`
  - [x] `fullScreenMode`

  - [ ] stopPropagation by default

  - [ ] Extend app state
  - [ ] Create three app component
  ### Hooks
  - [x] `useResize`
    - [x] `observe`/`disconnect` on `start`/`stop`
  - [x] `useFullscreen`
  - [x] `useRender`
    - [ ] delta, elapsed, clock
  - [] `useThreeApp`

  ### Events
  - [ ] `onClick`
  - [ ] `onPointerEnter`
  - [ ] `onPointerLeave`
  - [ ] `onPointerMove`

  ```ts
  const cube = defineThreeAppComponent((ctx) => {

    return {
      object: cube,
      onRender() { }
      onClick() { }
    }
  })
  ```

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
  > https://whsjs.readme.io/docs
- [ ] render-mode="on-demand"

## Components
[three-stdlib](https://github.com/pmndrs/three-stdlib)
[drei](https://github.com/pmndrs/drei)

- [ ] Grid helper - https://github.com/pmndrs/drei/blob/master/src/core/Grid.tsx
- [ ] Camera Controls - https://github.com/yomotsu/camera-controls?tab=readme-ov-file
- [ ] Lights with helpers
- [ ] notion-like bookmark/link component
- [ ] ContactShadows?
  https://threejs.org/examples/#webgl_shadow_contact
- [ ]

## Demos
- [ ] Base example
 - [ ] orbitcontrols animated
 - [ ] hover event
 - [ ] click events
 - [ ] shadows
 - [ ] Lights
 - [ ] grid
- [ ] [Three Seed](https://github.com/edwinwebb/three-seed)

- [ ] tests
  -[x] `applyProps`

- [x] Publish `beta` version
- [ ] `#threeJsJourney` en twitter
