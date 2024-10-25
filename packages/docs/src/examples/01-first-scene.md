---
aside: false
---

<ExampleTitle :scripts>First Scene</ExampleTitle>

<ThreeApp />

::: code-group
<<< ./scripts/01-first-scene/index.ts
:::

> Based on [ThreeJs - Creating a scene](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) example

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { data } from './examples.data'

const scripts = data['01-first-scene']

onMounted(async () => {
  await import('./scripts/01-first-scene/index')
})

onUnmounted(() => {
  /** 💀 TODO: refactor - stop/remove scripts | Scripts keep running on bg since they're on memory */
  window.location.reload()
})

</script>

<style scoped lang="scss">
  h1 {
    display: flex;
    span {
      flex: 1
    }
  }
</style>
