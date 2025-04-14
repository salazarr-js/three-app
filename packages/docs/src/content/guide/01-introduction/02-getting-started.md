# 🚀 Getting Started

## 📝 Overview

`Three App` is a set of utility functions that makes working with [three.js](https://threejs.org) more **declarative** and **functional**. It provides a solid starting point for 3D projects by reducing boilerplate and helping organize your codebase more effectively.

This experimental toolkit simplifies `three.js` app development through a collection of composable helpers. The goal is to offer a developer experience similar to [React Three Fiber](https://r3f.docs.pmnd.rs), while staying **framework-agnostic**, **native**, and **minimal**.

## 🌍 Try It Online

You can try `Three App` directly in the browser with no setup required:

<div class="flex gap-2">
  <a href="https://stackblitz.com/github/salazarr-js/three-app/tree/main/packages/demos/vite-template" target="_blank">
    <img alt="Open in StackBlitz" src="https://developer.stackblitz.com/img/open_in_stackblitz.svg"/>
  </a>

  <a href="https://codesandbox.io/p/sandbox/github/salazarr-js/three-app/tree/main/packages/demos/vite-template" target="_blank">
    <img alt="Edit in CodeSandbox" src="https://codesandbox.io/static/img/play-codesandbox.svg"/>
  </a>
</div>

## 📂 Scaffolding Your Project

You can scaffold a project using [Parcel](https://parceljs.org/getting-started/webapp/) or [Create Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) with the vanilla template:

```bash
npm create vite@latest my-three-app -- --template vanilla-ts
```

## 📥 Installation

```bash
npm i three @slzr/three-app
```

### 🧩 Three.js Compatibility

`Three App` is compatible and tested with [three.js r175](https://github.com/mrdoob/three.js/releases/tag/r175) and requires **r158 or higher**.

If you're upgrading from an older version, check the [release notes](https://github.com/mrdoob/three.js/releases) and the [migration guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide) for potential breaking changes.

## 🔷 TypeScript Support

`Three App` is fully type-safe out of the box. Since `three.js` doesn’t ship with types, install them manually:

```bash
npm i -D @types/three
```

## 🚦 Before You Start

You should have at least a basic understanding of how `three.js` works to use `Three App` effectively.

### 📚 Recommended Learning Material

- [Three.js - Official Documentation](https://threejs.org/manual)
- [Three.js - Fundamentals](https://threejs.org/manual/#en/fundamentals)
- [Discover Three.js](https://discoverthreejs.com)
- [Bruno Simon's Three.js Journey](https://threejs-journey.com)
- [SB Code - Three.js and TypeScript Tutorials](https://sbcode.net/threejs/)
- [Codrops - Three.js Posts](https://tympanus.net/codrops/?s=three&search-type=posts&type=all)

### 🌟 Inspiration

- [Three.js - Showcase](https://threejs.org)
- [Three.js - Examples](https://threejs.org/examples)
- [React Three Fiber - Showcase](https://r3f.docs.pmnd.rs/getting-started/examples)
