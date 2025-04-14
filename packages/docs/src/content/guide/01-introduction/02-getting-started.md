# 🚀 Getting Started

## 📝 Overview

`Three App` is a set of utility functions that make using [three.js](https://threejs.org) more declarative and functional. It enhances the developer experience by providing a solid and easy starting point for any 3D project, reducing boilerplate code and helping you better organize your codebase.

It is an experimental toolkit designed to simplify the creation of `three.js` applications through a collection of composable helpers. The goal is to offer a developer experience similar to [React Three Fiber](https://r3f.docs.pmnd.rs) but in a framework-agnostic, native, and minimalistic way.

## 🌍 Try it online

You can try `Three App` on a web-based editor. It runs fully in the browser and is almost identical to the local setup without needing to install anything.

<div class="flex gap-2">
  <a href="https://stackblitz.com/github/salazarr-js/three-app/tree/main/packages/demos/vite-template" target="_blank">
    <img alt="Open in StackBlitz" src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"/>
    </a>

  <a href="https://codesandbox.io/p/sandbox/github/salazarr-js/three-app/tree/main/packages/demos/vite-template" target="_blank">
    <img alt="Edit in Codesandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg"/>
  </a>
</div>

## 📂 Scaffolding your project

You can set up your project by following the [Parcel](https://parceljs.org/getting-started/webapp/) instructions or by scaffolding it using [Create Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) with your preferred vanilla template:

```bash
npm create vite@latest my-three-app -- --template vanilla-ts
```

## 📥 Installation

```bash
npm i three @slzr/three-app
```

### 🧩 Three.js Compatibility

`Three App` is compatible and tested with three.js [r175](https://github.com/mrdoob/three.js/releases/tag/r175), and requires version [r158](https://github.com/mrdoob/three.js/releases/tag/r158) or newer to work properly.

If you're using an older version, be sure to check the [release notes](https://github.com/mrdoob/three.js/releases) and [migration guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide) for any breaking changes.

## 🔷 TypeScript Support

`Three App` is fully type-safe out of the box since it is written in TypeScript. However, `three.js` type declarations must be installed separately:

```bash
npm i -D @types/three
```

## 🚦 Before You Start

To use `Three App` effectively, you should have at least basic knowledge of how `three.js` works.

### 📚 Recommended Learning Material

- [Three.js - Official Documentation](https://threejs.org/manual)
- [Three.js - Fundamentals](https://threejs.org/manual/#en/fundamentals)
- [Discover Three.js](https://discoverthreejs.com)
- [Bruno Simon's Three.js Journey](https://threejs-journey.com)
- [SB Code - Three.js and TypeScript Tutorials](https://sbcode.net/threejs/)
- [Codrops - Threejs Posts](https://tympanus.net/codrops/?s=three&search-type=posts&type=all)

### 🌟 Inspiration

- [Three.js - Showcase](https://threejs.org)
- [Three.js - Examples](https://threejs.org/examples)
- [React Three Fiber - Showcase](https://r3f.docs.pmnd.rs/getting-started/examples)
