---
aside: false
---

<ExampleTitle :scripts>Reusable Components</ExampleTitle>

<ThreeApp />

::: code-group
<<< ./scripts/02-components/index.ts

<<< ./scripts/02-components/cube.ts
:::

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { data } from './examples.data'

const scripts = data['02-components']

onMounted(async () => {
  await import('./scripts/02-components/index')
})

onUnmounted(() => {
  /** 💀 TODO: refactor - stop/remove scripts | Scripts keep running on bg since they're on memory */
  window.location.reload()
})
</script>
