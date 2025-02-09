---
aside: false
title: First Scene - Three App Example
---

# First Scene

<ThreeAppExample :path :scripts />

> Based on [ThreeJs - Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) example

---

::: code-group
<<< ../../examples/01-first-scene/index.ts
:::

<script setup lang="ts">
import { data } from './examples.data'

const path= '01-first-scene'
const scripts = data[path]
</script>
