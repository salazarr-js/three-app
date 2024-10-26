---
aside: false
title: First Scene - Three App Example
---

# First Scene

<ClientOnly>
  <ThreeAppSandbox :scripts  />
</ClientOnly>

::: code-group
<<< ./scripts/01-first-scene/index.ts
:::

> Based on [ThreeJs - Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) example

<script setup lang="ts">
import { data } from './examples.data'

const scripts = data['01-first-scene']
</script>
