# 🚀 Getting Started

## 📝 Overview

`Three App` is a set of utility functions that makes using [three.js](https://threejs.org) more declarative and functional. It enhances the developer experience by providing an easy and solid starting point for any 3D project, reducing boilerplate code and helping you better organize your codebase.

> [!INFO] 🚀
> Using `Three App` you don't have to worry about manually setting up the `renderer`, `camera`, commons events, or the most complex part, the `render loop`.

## 🌐 Trying it online

You can try `Three App` online on [StackBlitz](https://stackblitz.com/edit/slzr-three-app-template?file=src%2Fmain.ts) or [CodeSandbox](https://codesandbox.io/p/sandbox/wzwnj7). It runs directly in the browser, and it is almost identical to the local setup but doesn't require installing anything on your machine.

> Stackblitz template uses the official [Vite + ts template](https://vite.new/vanilla-ts)
>
> CodeSandBox template uses a basic [Parcel setup](https://parceljs.org/getting-started/webapp/)

## 📂 Scaffolding your project

You can setup your project following the [Parcel](https://parceljs.org/getting-started/webapp/) instructions or scaffold it using [Create Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) tool with a vanilla template.

```bash
$ npm create vite@latest my-three-app -- --template vanilla-ts
```

> The `Create Vite` tool offers multiple templates, including `vanilla` and `vanilla-ts`.

## 📥 Installation

```sh
npm i three @slzr/three-app
```

> `Three App` is compatible and tested with three.js `r169`.

## 🔷 Typescript Support

`Three App` is type-safe out of the box since it's written in TypeScript. However, `three.js` doesn’t include type declarations, so you’ll need to install them separately

```bash
npm i -D @types/three

```

## 🚦 Before you start

> [!WARNING]
> In order to use `three app` you should have some experience or at least basic knowledge of how `three.js` works.

### 📚 Useful material

- [Three.js - Official documentation](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)
- [Three.js - Fundamentals ](https://threejs.org/manual/#en/fundamentals)
- [Discover three.js](https://discoverthreejs.com)
- [Bruno Simon's three.js Journey](https://threejs-journey.com)

### 🌟 Inspiration

- [Three.js - Showcase](https://threejs.org)
- [Three.js - Examples](https://threejs.org/examples)
- [React Three Fiber - Showcase](https://r3f.docs.pmnd.rs/getting-started/examples)
