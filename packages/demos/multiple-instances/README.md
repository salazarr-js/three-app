# Three App - Multiple Instances

This example shows how to run multiple `three-app` instances isolated with independent render loops using **iframes**.

## 📋 Considerations

- This is a scaffolded [vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) project using the `vanilla-ts` template
- [`src/three-apps`](./src/three-apps) folder is where all the `three app` related code is located
  - All the `three-app` related code is bundled and compiled with [tsup](https://tsup.egoist.dev), which is configured via [`tsup.config.ts`](./tsup.config.ts) config file
  - The compiled `three-app` output folder is ignored on the [.gitignore](./.gitignore#L27)
- The content of the iframes is set via the `srcdoc` attribute
- [`getIframeTemplate()`](./src/utils/index.ts#L2-L35) util function helps to generate the template for the iframe using the compiled scripts

> 📌 Read more at [Three App - 🚨 Limitations](https://three.salazarjs.dev/guide/about#%F0%9F%9A%A8-limitations)

## 🧰 Troubleshooting

By default, scripts are split and loaded externally to improve performance and reduce bundle size. However, some servers may fail to resolve iframe dependencies, causing 404 errors. If this is your case, you can [disable code splitting](./tsup.config.ts#L13) and [switch to inline script injection](./src/main.ts#L6-L10) to avoid these issues.

```ts
getIframeTemplate('/script-path.js', true) // ✅ Inline script
```

## ⚠️ Limitations & Recommendations

Keep in mind that `three-app` is an experimental, not production-ready project, primarily designed for single-app experiences.

If your project requires multiple instances and advanced features like communication between them, or has stricter security requirements where iframes are not suitable, you might want to consider alternatives like [React Three Fiber](https://r3f.docs.pmnd.rs), [TresJS](https://tresjs.org/), [Threlte](https://threlte.xyz/), [Three.EZ](https://agargaro.github.io/three.ez/) or any other recommended [wrappers/frameworks](https://threejs.org/manual/#en/libraries-and-plugins).

## 🚀 Scripts

```bash
npm run dev   # 🔄 Start dev mode (tsup --watch + vite dev server)
npm run build # 📦 Build all three-apps into `/public` + production build
```

> [npm-run-all](https://github.com/mysticatea/npm-run-all) package is used to run multiple scripts either sequentially or in parallel.

## 🌍 Try it online

[![Edit in Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/salazarr-js/three-app/tree/main/packages/demos/multiple-instances)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/salazarr-js/three-app/tree/main/packages/demos/multiple-instances)
