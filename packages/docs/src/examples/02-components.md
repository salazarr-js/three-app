---
aside: false
---

<ClientOnly>
  <ThreeAppSandbox :scripts  />
</ClientOnly>

::: code-group
<<< ./scripts/02-components/index.ts

<<< ./scripts/02-components/cube.ts
:::

<script setup lang="ts">
import { data } from './examples.data'

const scripts = data['02-components']
</script>
