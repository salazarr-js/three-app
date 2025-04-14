# ✨ About the Project

`Three App` is a side project built to explore and experiment with different dev tools and tech stacks for learning purposes.

::: warning ⚠️ Disclaimer
This project/package is **experimental** and not production-ready.
:::

## 📂 Project Scope

Main goals of this project:

✅ Use [fnm](https://github.com/Schniz/fnm) as the Node.js version manager. <br/>
✅ Use [PNPM](https://pnpm.io) as the package manager. <br/>
&emsp;&nbsp;&nbsp; Set up a basic monorepo using [PNPM Workspaces](https://pnpm.io/workspaces). <br/>
✅ Create a TypeScript library with type declarations using [tsup](https://tsup.egoist.dev). <br/>
✅ Publish on NPM under a personal [scope](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package). <br/>
✅ Write tests with [Vitest](https://vitest.dev). <br/>
✅ Build a documentation site with [VitePress](https://vitepress.dev). <br/>
&emsp;&nbsp;&nbsp; Auto-generate examples using [StackBlitz](https://developer.stackblitz.com/platform/api/javascript-sdk#generate-and-embed-new-projects) or [CodeSandbox](https://codesandbox.io/docs/learn/sandboxes/cli-api#xhr-request) APIs. <br/>
✅ Implement linting with [ESLint](https://eslint.org). <br/>
✅ Use semantic commits and Semver. <br/>
&emsp;&nbsp;&nbsp; Auto-generate changelogs. <br/>

> 📌 See the full [TODO list](https://github.com/salazarr-js/three-app/blob/main/todos.md) for project progress.

## 🚀 `Three App` Library

`Three App` is a lightweight wrapper and set of utility functions that make building `three.js` applications simpler and more efficient. It encapsulates common concepts and delivers a developer experience similar to [React Three Fiber](https://r3f.docs.pmnd.rs), while staying **functional**, **declarative**, and **framework-agnostic**.

### 🌟 Main Features

✅ Pre-configured [renderer](/guide/core-functionalities#🖥️-default-renderer) and [camera](/guide/core-functionalities#🎥-default-camera). <br/>
✅ Built-in render loop with [control methods](/guide/core-functionalities#🕹️-render-loop-controls). <br/>
✅ Support for common [events](/guide/events). <br/>
✅ Simple lifecycle ["hooks"](/guide/hooks). <br/>
✅ Handy [utilities functions](/guide/functional-composition) to compose 3D scenes. <br/>

> 📌 See [Core Functionalities](/guide/core-functionalities) for more details.

## 🚨 Limitations

`Three App` includes a simple ["hook system"](/guide/hooks) inspired by [React](https://react.dev/reference/react/hooks) and [Vue](https://vuejs.org/guide/essentials/lifecycle.html). It relies on *global variables*, which makes it easy to manage lifecycle events, but it limits you to running only **one instance per page**.

Since hooks are global, they can't tell which `Three App` instance triggered a callback. If multiple instances exist on the same page, all their callbacks will run together.

This isn't an issue for most [`SSR`](https://en.wikipedia.org/wiki/Server-side_scripting), [`SSG`](https://en.wikipedia.org/wiki/Static_site_generator), or [`MPA`](https://en.wikipedia.org/wiki/Multi-page_application) setups—or for standalone apps like games or interactive scenes.

::: info 🛠️ Workaround
If you need to run multiple `Three App` instances on the same page, you can bundle each one separately (e.g., with [tsup](https://tsup.egoist.dev)) and load them inside **isolated iframes**.

> 📌 See the [Multiple Instances Demo](https://github.com/salazarr-js/three-app/tree/main/packages/demos/multiple-instances)
:::

::: warning ⚠️ Disclaimer
`Three App` is meant for **single-app** experiences.

If your project needs multiple instances, communication between them, or stricter security requirements (where iframes aren't ideal), consider using tools like [React Three Fiber](https://r3f.docs.pmnd.rs), [TresJS](https://tresjs.org/), [Threlte](https://threlte.xyz/), [Three.EZ](https://agargaro.github.io/three.ez/), or other recommended [wrappers/frameworks](https://threejs.org/manual/#en/libraries-and-plugins).
:::

## 💡 Inspirations

This project was heavily inspired by [React Three Fiber](https://r3f.docs.pmnd.rs) and [Bruno Simon's Three.js Journey](https://threejs-journey.com/).

<a class="block mb-2" href="https://r3f.docs.pmnd.rs">
  <img class="rounded-lg" alt="React Three Fiber banner" src="https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-r3f.jpg"/>
</a>

<a class="block mb-2" href="https://threejs-journey.com/">
  <img class="rounded-lg" alt="Three.js Journey" src="https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-journey.jpg"/>
</a>

> Also influenced by: [TresJS](https://github.com/Tresjs/tres) — [Threlte](https://github.com/threlte/threlte) — [Spline](https://spline.design)

## 📚 Resources

### 📺 Tutorials
- [Crea un monorepositorio multipaquete con npm workspaces y releases de paquetes](https://youtu.be/2QSBXhuqSlI)
- [💥 Monorepo multipaquete con NPM Workspaces 📦 (FullStack Bootcamp JavaScript)](https://youtu.be/KEkRy4q_0oI)
- [Blazing Fast Tips: Publishing to NPM](https://youtu.be/eh89VE3Mk5g)
- [How to make your own NPM package (Step-by-Step) 📦](https://youtu.be/xnfdm-s8adI)
- [Create a library using Vite lib mode](https://youtu.be/XDip9onOTps)

### 📄 Docs & Guides

- [Web.dev — Sandboxed Iframes](https://web.dev/articles/sandboxed-iframes)

## 🎨 Logo

[![Oscar Reutersvärd](https://finelinegd.com/wp-content/uploads/2014/05/or_header.jpg)](https://finelinegd.com/oscar-reutersvard-the-father-of-impossible-figures/)

The `Three App` logo is a modern take on the impossible figures of [Oscar Reutersvärd](https://wikipedia.org/wiki/Oscar_Reutersv%C3%A4rd).

> The Illustrator file is available: [logo.ai](https://github.com/salazarr-js/three-app/blob/main/logo.ai)

## 🔗 Related Projects

Following this project, I also created:

- [vitepress-boilerplate](https://github.com/salazarr-js/vitepress-boilerplate) — VitePress starter template.
- [code-sandbox](https://github.com/salazarr-js/code-sandbox) — Vanilla/TypeScript sandbox.
