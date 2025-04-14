---
aside: false
title: Basic Demo
---

# Basic Demo

<ThreeAppExample :path :scripts />

> Based on [React Three Fiber - Basic Demo](https://codesandbox.io/s/rrppl0y8l4).

---

::: code-group
<<< ../../examples/01-basic-demo/index.ts
<<< ../../examples/01-basic-demo/box.ts
<<< ../../examples/01-basic-demo/lights.ts
:::

<script setup lang="ts">
import { data } from './examples.data'

const path= '01-basic-demo'
const scripts = data[path]
</script>
