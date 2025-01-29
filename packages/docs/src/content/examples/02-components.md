---
aside: false
---

<ThreeAppExample :path :scripts />

::: code-group
<<< ../../examples/02-components/index.ts

<<< ../../examples/02-components/box.ts
:::

> Based on [React Three Fiber - Basic Demo](https://codesandbox.io/p/sandbox/rrppl0y8l4?file=%2Fsrc%2FApp.js).

<script setup lang="ts">
import { data } from './examples.data'

const path= '02-components'
const scripts = data[path]
</script>
