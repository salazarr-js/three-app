# 🪝 "Hooks"

https://docs.tresjs.org/api/composables.html
https://r3f.docs.pmnd.rs/api/hooks

Hooks are written in quotation marks `""` on purpose because i'm not pretty sure the way they are implemented can be considerate full-fledged hooks, but since they are kinda inspired on react/vue hooks lets keep call them that way.

Every available hook will help you to run code in different states of the lifecycle of a three app instance.

::: info
Every hook will expose the `ThreeAppState`
:::

## 🖌️ `onRender()`

Add a callback function to the render loop call stack to be called on every rendered frame.

```ts
import { onRender } from '@slzr/three-app'

function someComponent() {
  onRender((state) => {
    // Do stuff
  })

  // ...
}
```

## 📐 `onResize()`

## 🖥️ `onFullscreenModeChange`

## 🖱️ 👆 `onClick`

## ➡️ `onPointerEnter`

## ⬅️ `onPointerLeave`

## ✋ `onPointerMove`
