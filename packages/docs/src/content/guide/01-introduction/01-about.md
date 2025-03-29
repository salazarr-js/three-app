# ✨ About the project

`Three App` is a side project created to explore and experiment with different development tools and tech stacks for learning purposes.

::: warning ⚠️ Disclaimer
This project/package is **experimental** and not production-ready.
:::

## 📂 Project scope

The main goals for this project include:

✅ Use [fnm](https://github.com/Schniz/fnm) as the Node.js version manager <br/>
✅ Use [PNPM](https://pnpm.io) as package manager <br/>
&emsp;&nbsp;&nbsp; Set up a basic monorepo using [PNPM Workspaces](https://pnpm.io/workspaces) <br/>
✅ Create a TypeScript library with type declarations using [tsup](https://tsup.egoist.dev) <br/>
✅ Publish on NPM under a personal [scope](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package) <br/>
✅ Tests with [Vitest](https://vitest.dev) <br/>
✅ Build a documentation site using [Vitepress](https://vitepress.dev) <br/>
&emsp;&nbsp;&nbsp; Auto-generate examples using [Stackblitz](https://developer.stackblitz.com/platform/api/javascript-sdk#generate-and-embed-new-projects) or [Code Sandbox](https://codesandbox.io/docs/learn/sandboxes/cli-api#xhr-request) APIs <br/>
✅ Implement linting with [Eslint](https://eslint.org) <br/>
✅ Use semantic commits and Semver <br/>
&emsp;&nbsp;&nbsp; Auto-generate changelogs <br/>

> 📌 You can check the full [TODO](https://github.com/salazarr-js/three-app/blob/main/todos.md) list to see the project's progress.

## 🚀 `Three App` library

`Three App` is a lightweight wrapper and a set of utility functions that make it easier to build `three.js` applications with less boilerplate. It encapsulates common concepts and offers a developer experience similar to [React Three Fiber](https://r3f.docs.pmnd.rs), while keeping your code **functional**, **declarative**, and **framework-agnostic**.

### 🌟 Main features

✅ Pre-configured [rendered](/guide/core-functionalities#%F0%9F%96%A5%EF%B8%8F-default-renderer) and [camera](/guide/core-functionalities#%F0%9F%8E%A5-default-camera). <br/>
✅ Render loop with control methods. <br/>
✅ Built-in support for common [events](/guide/events). <br/>
✅ Simple and powerful ["hooks"](/guide/hooks) to run code at different stages of the app lifecycle. <br/>
✅ [Utilities functions](/guide/functional-composition) to easily compose 3D scenes. <br/>

> 📌 For more details, check out the [Core functionalities](/guide/core-functionalities) page in the guide.

## 🚨 Limitations

`Three App` includes a simple ["hook system"](/guide/hooks) inspired by [React](https://react.dev/reference/react/hooks) and [Vue](https://vuejs.org/guide/essentials/lifecycle.html), based on global variables. This makes it easy to handle lifecycle events, but limits you to just **one instance per page**.

Since hooks are stored globally, they can't tell which Three App instance triggered a callback. As a result, if you have multiple instances on the same page, they end up sharing the same events — causing all registered callbacks to trigger simultaneously 🤦‍♂️.

In most cases, this won’t be a problem if you're building an [`SSR`](https://en.wikipedia.org/wiki/Server-side_scripting), [`SSG`](https://en.wikipedia.org/wiki/Static_site_generator), [`MPA`](https://medium.com/@julianneagu/multi-page-application-mpa-a-good-business-fit-36029c7be9f0)  or a project where a single instance is usually enough like a game or single-app experience.

::: info 🛠️ Workaround
If you need multiple three-app instances on the same page, you can work around this limitation by bundling each one separately (e.g., using [tsup](https://tsup.egoist.dev)) and embedding them inside isolated iframes.

> 📌 Check out the [multiple-instances demo](https://github.com/salazarr-js/three-app/tree/main/packages/demos/multiple-instances) for a working example.
:::

## 💡 Inspirations

This project was made thanks to [React Three Fiber](https://r3f.docs.pmnd.rs) and [Bruno Simon's Three.js Journey course](https://threejs-journey.com/).

<a class="block mb-2" href="https://r3f.docs.pmnd.rs">
  <img class="rounded-lg" alt="React Three Fiber banner" src="https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-r3f.jpg"/>
</a>

<a class="block mb-2" href="https://threejs-journey.com/">
  <img class="rounded-lg" alt="Three.js Journey" src="https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-journey.jpg"/>
</a>

> Other sources: [Tresjs](https://github.com/Tresjs/tres) - [Threlte](https://github.com/threlte/threlte) - [Spline](https://spline.design/)

## 📚 Resources

Here are some of the resources that helped during the development of this project:

### 📺 Tutorials
- [Crea un monorepositorio multipaquete con npm workspaces y releases de paquetes](https://youtu.be/2QSBXhuqSlI)
- [💥 Monorepo multipaquete con NPM Workspaces 📦 (FullStack Bootcamp JavaScript)](https://youtu.be/KEkRy4q_0oI)
- [Blazing Fast Tips: Publishing to NPM](https://youtu.be/eh89VE3Mk5g)
- [How to make your own NPM package (Step-by-Step) 📦](https://youtu.be/xnfdm-s8adI)
- [Create a library using Vite lib mode](https://youtu.be/XDip9onOTps)

### 📄 Guides/Docs

- [Web.dev - Sandboxed Iframes](https://web.dev/articles/sandboxed-iframes)

## 🎨 Logo

[![Oscar Reutersvärd](https://finelinegd.com/wp-content/uploads/2014/05/or_header.jpg)](https://finelinegd.com/oscar-reutersvard-the-father-of-impossible-figures/)

The `Three App` logo is inspired by [Oscar Reutersvärd's](https://wikipedia.org/wiki/Oscar_Reutersv%C3%A4rd) optical illusions.

> The photoshop [.psd](https://github.com/salazarr-js/three-app/blob/main/three-app.psd) file is included in the repository.

## 🔗 Related projects

Building on the momentum of this project, I’ve started a few related repositories:

- [slzr - vitepress-boilerplate](https://github.com/salazarr-js/vitepress-boilerplate) — Vitepress starter template
- [slzr - code-Sandbox](https://github.com/salazarr-js/code-sandbox) — Vanilla/typescript sandbox
