# ✨ About the project

`Three App` is a side project created to explore and experiment with different development tools and tech stacks for learning purposes.

> [!WARNING]
> This project/package is a **Work In Progress**. Do not use in production.

## 📂 Project scope

The main goals for this project include:

✅ Set up a monorepo using [PNPM](https://pnpm.io) <br/>
✅ Create a TypeScript library with type declarations using [tsup](https://tsup.egoist.dev) <br/>
✅ Publish on NPM under my personal [scope](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package) <br/>
✅ Test with [Vitest](https://vitest.dev) <br/>
✅ Build a documentation site using [Vitepress](https://vitepress.dev) <br/>
&emsp; ✅ Auto-generate examples using [Stackblitz](https://developer.stackblitz.com/platform/api/javascript-sdk#generate-and-embed-new-projects) or [Code Sandbox](https://codesandbox.io/docs/learn/sandboxes/cli-api#xhr-request) APIs <br/>
✅ Implement linting with [Eslint](https://eslint.org) <br/>
✅ Use semantic commits and Semver <br/>
&emsp; ✅ Auto-generate changelogs <br/>
✅ Use [fnm](https://github.com/Schniz/fnm) as the Node.js version manager <br/>

> You can check the full [TODO](https://github.com/salazarr-js/three-app/blob/main/todos.md) list to see the project's progress.

## 🚀 `Three App` library

After starting Bruno Simon's [Three.js Journey course](https://threejs-journey.com), I came up with the idea of creating a wrapper or set of functions to help compose `three.js` applications. The goal was to bring a developer experience similar to that of [React Three Fiber](https://r3f.docs.pmnd.rs), but in a framework-agnostic and native way, without relying on frameworks like `React`, `Vue`, or `Svelte`, encapsulating concepts and minimizing the boilerplate needed to create three.js apps.

Three App includes a default [rendered](/guide/core-functionalities#%F0%9F%96%A5%EF%B8%8F-default-renderer) and [camera](/guide/core-functionalities#%F0%9F%8E%A5-default-camera), already pre-configured, handles common [pointer events](/guide/events), offers ["hooks"](/guide/hooks) to run code at different stages of the app lifecycle, and provides useful [utilities](/guide/functional-composition) to easily compose 3D scenes.

> For more details, check out the [Core functionalities](/guide/core-functionalities) page in the guide.

## 🚨 Limitations

One of the key features of Three App is its use of `"Hooks"` (essentially, callbacks stored in **global variables** 😬). This was the simplest way I found to replicate the hook experience similar to [React](https://react.dev/reference/react/hooks) or [Vue](https://vuejs.org/guide/essentials/lifecycle.html).

However, this solution isn't perfect. Once the script loads, the hooks can't distinguish which Three App instance triggered a callback. So, if you have multiple Three App instances, all callbacks stored in those global variable will triggered.

This hook setup limits you to create one instance per page. This shouldn't be an issue if you're working on an [`SSR`](https://en.wikipedia.org/wiki/Server-side_scripting), [`SSG`](https://en.wikipedia.org/wiki/Static_site_generator), or [`MPA`](https://medium.com/@julianneagu/multi-page-application-mpa-a-good-business-fit-36029c7be9f0) project or just have only one instance.

::: info
If you need multiple three app instances running on the same page, you can overcome this limitation by compiling your code with a building tool like [tsup](https://tsup.egoist.dev) and inject yours three apps on iframes with the `srcdoc` attribute.
> Check the [multiple-instances demo](https://github.com/salazarr-js/three-app/tree/main/packages/demos/multiple-instances) in the source code.
:::

## ⭐ Inspired on

This project was made possible primarily thanks to [React Three Fiber](https://r3f.docs.pmnd.rs) and [Bruno Simon's Three.js Journey course](https://threejs-journey.com/).

<a class="block mb-2" href="https://r3f.docs.pmnd.rs">
  <img class="rounded-lg" alt="React Three Fiber banner" src="https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-r3f.jpg"/>
</a>

<a class="block mb-2" href="https://threejs-journey.com/">
  <img class="rounded-lg" alt="Three.js Journey" src="https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-journey.jpg"/>
</a>

> Other sources: [Tresjs](https://github.com/Tresjs/tres) - [Threlte](https://github.com/threlte/threlte) - [Spline](https://spline.design/)

## 📚 Resources

Here are some of the resources I used to create this project.

### Tutorials
- [Crea un monorepositorio multipaquete con npm workspaces y releases de paquetes](https://youtu.be/2QSBXhuqSlI)
- [💥 Monorepo multipaquete con NPM Workspaces 📦 (FullStack Bootcamp JavaScript)](https://youtu.be/KEkRy4q_0oI)
- [Blazing Fast Tips: Publishing to NPM](https://youtu.be/eh89VE3Mk5g)
- [How to make your own NPM package (Step-by-Step) 📦](https://youtu.be/xnfdm-s8adI)
- [Create a library using Vite lib mode](https://youtu.be/XDip9onOTps)

### Guides/Docs

- [Web.dev - Sandboxed Iframes](https://web.dev/articles/sandboxed-iframes)

## 🎨 Logo

[![Oscar Reutersvärd](https://finelinegd.com/wp-content/uploads/2014/05/or_header.jpg)](https://finelinegd.com/oscar-reutersvard-the-father-of-impossible-figures/)

The `Three App` logo design was heavily inspired by [Oscar Reutersvärd's](https://wikipedia.org/wiki/Oscar_Reutersv%C3%A4rd) optical illusions.

> The photoshop [.psd](https://github.com/salazarr-js/three-app/blob/main/three-app.psd) file is included in the repository.

## 🔗 Related projects

Building on the momentum generated by this project, I started these related repositories.

- [slzr - vitepress-boilerplate](https://github.com/salazarr-js/vitepress-boilerplate)
- [slzr - code-Sandbox](https://github.com/salazarr-js/code-sandbox)
