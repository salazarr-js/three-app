<template>
  <h1 class="example-title">
    <span><slot /></span>

    <StackblitzButton :scripts />
  </h1>
</template>

<script setup lang="ts">
import type { Scripts } from '../utils'
import { defineProps } from 'vue'

const { scripts } = defineProps<{ scripts: Scripts }>()
</script>

<style scoped lang="scss">
.example-title {
  gap: 8px;
  display: flex;
  span {
    flex: 1;
  }
}
</style>
