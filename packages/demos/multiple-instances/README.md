# Three App - Multiple Instances

This demo shows how to have multiple `three-app` instances running safely using iframes.

## 📌 Considerations

- This project uses [PNPM](https://pnpm.io) as package manager
- ✅ This is a scaffolded [vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) project using the `vanilla-ts` template
- ✅ `src/three-apps` folder is where all the three app related code will be located
- ✅ [tsup](https://tsup.egoist.dev) is configured via `tsup.config.ts` config file
- ✅ The content of the iframes is set via the `srcdoc` attribute
- ✅ `getHTMLTemplate()` util function help to generate the template

> Read more at [Three App - 🚨 Limitations](https://three.salazarjs.dev/guide/about#%F0%9F%9A%A8-limitations)

## Scripts

```bash
pnpm run dev   # Start `tsup` in watch mode and `vite` dev server
pnpm run build # Build all the three-apps scripts on `public` folder and generate a production build
```
