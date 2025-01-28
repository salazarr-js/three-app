---
aside: false
title: First Scene - Three App Example
---

# First Scene

<ThreeAppExample :path :scripts />

::: code-group
<<< ../../examples/01-first-scene/index.ts
:::

> Based on [ThreeJs - Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) example

<script setup lang="ts">
import { data } from './examples.data'

const path= '01-first-scene'
const scripts = data[path]
</script>
