# TODOs

## Project
- [x] use [fnm](https://github.com/Schniz/fnm) as NodeJs version manager
- [ ] use `PNPM` as package manager with [workspaces](https://pnpm.io/workspaces)
- [x] Linting using `eslint`
  - [x] antfu config
  - [ ] DIY eslint config
- [x] Docs using [vitepress](https://vitepress.dev/)
  - [x] Injected `.ts` examples
  - [x] Auto generated `stackblitz`/`codesanbox` examples
  - [ ] Auto generated API Reference using [Typedoc Vitepress Plugin](https://typedoc-plugin-markdown.org/plugins/vitepress/quick-start)
  - [ ] Spanish version
- [x] Bundle typescript library with types declarations `.d.ts` using [tsup](https://github.com/egoist/tsup)
  - [x] Publish scoped/organization package (@slzr)
- [] Semantic commits + Semver
  - [semantic-release](https://github.com/semantic-release/semantic-release)
  - [changeset](https://github.com/changesets/changesets)
  - [release-it](https://github.com/release-it/release-it)
  - [release-please](https://github.com/googleapis/release-please)
  - [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog)
- [ ] Github pipeline/workflow
  - [ ] Auto Generated Changelogs
- [x] Add License, Author, Keywords to package

- [ ] `#threeJsJourney` en twitter
- [x] Publish `beta` version

## Core Features

- [x] `createThreeApp` factory function
  - [x] `scene` props
  - [x] Default `camera`
    - [x] aspect ratio
    - [x] `OrthographicCamera` & `PerspectiveCamera`
    - [x] update on resize/fullscreen events
  - [x] Default renderer
    - [x] update on resize/fullscreen events
  - [x] render loop
    - [x] `render()`
    - [x] `start()`
    - [x] `stop()`
  - [ ] `ColorManagement`
  - [ ] `shadows`
  - [x] handle `resize`/`fullScreen` events
  - [ ] `stopPropagation` event option
  - [ ] render-modes - `on-demand`

- [x] `applyProps`
  - [ ] accept `-` separated props like `position-y: 2` | `rotation-x: -Math.PI / 2`
  - [ ] Can extends `ThreeAppProps` like `ThreeAppProps<T, { color: string }>`
  - [ ] accept functions like `camera.lookAt()`
    - [ ] map function types to receive params and call func
  - [ ] handle prop types
    - [x] Vector like props
    - [ ] Matrix like props
    - [ ] `Euler`
    - [ ] `Quaternion`
  - [ ] map `ColorLikeProps`

## Hooks
- [x] `useResize`
  - [x] `observe`/`disconnect` on `start`/`stop`
- [x] `useFullscreen`
- [x] `useRender`
  - [ ] delta, elapsed, clock
- [x] `useThreeApp`
- [ ] `tweakpane`

## Events

- [ ] `onClick`
- [ ] `onPointerEnter`
- [ ] `onPointerLeave`
- [ ] `onPointerMove`

## Components

> [three-stdlib](https://github.com/pmndrs/three-stdlib)
> [drei](https://github.com/pmndrs/drei)

- [x] `useOrbitControls` using `three-stdlib`
- [ ] Grid helper - https://github.com/pmndrs/drei/blob/master/src/core/Grid.tsx
- [ ] sky
- [ ] gltf
- [ ] [contact shadows](https://threejs.org/examples/webgl_shadow_contact.html)
- [ ] Camera Controls - https://github.com/yomotsu/camera-controls?tab=readme-ov-file

## Demos/Examples

- [ ] Base example
- [x] orbit controls animated
- [ ] pointer events
- [ ] [Three Seed](https://github.com/edwinwebb/three-seed)

## Docs

- [ ] notion-like bookmark/link component

## Version **2.0**

- [ ] multiple `threeApp` instances
- [ ] `onDestroy` hook
  - [ ] remove element from `toRender` if needed
  - [ ] remove element from `toIntersect` if needed
