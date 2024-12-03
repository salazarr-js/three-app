# 🪝 "Hooks"

https://docs.tresjs.org/api/composables.html
https://r3f.docs.pmnd.rs/api/hooks

Hooks are written in quotation marks `""` on purpose because i'm not pretty sure the way they are implemented can be considerate full-fledged hooks, but since they are kinda inspired on react/vue hooks lets keep call them that way.

Every available hook will help you to run code in different states of the lifecycle of a three app instance.

::: info
Every hook will expose the `ThreeAppState`
:::

## ✨ `useThreeApp`

Useful when creating `components` and need access to the three app state to set tup initial values.

```ts
import { useRender, useThreeApp } from '@/hooks'

const state = useThreeApp()
```

:::warning
Be sure that the `useThreeApp` hook is called inside the `onInit` function.
:::

## 🖌️ `useRender()`

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

## 📐 `useResize()`

This hooks use the [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) and the callback will have access to the entries and the `Three App State`

## 🖥️ `useFullscreen`
