---
aside: false
---

# Three Seed

<ClientOnly>
  <ThreeAppSandbox :scripts  />
</ClientOnly>

::: code-group
<<< ./scripts/01-first-scene/index.ts
:::

> Based on [Edwin Webb - Three Seed](https://github.com/edwinwebb/three-seed) project.

<script setup lang="ts">
import { data } from './examples.data'

const scripts = data['01-first-scene']
</script>
