<script setup lang="ts">
import { defineProps } from 'vue'

const { id = 'three-app' } = defineProps<{ id?: string }>()
</script>

<template>
  <div :id="id" class="three-app-container" />
</template>

<style setup lang="scss">
.three-app-container {
  width: 100%;
  margin: 16px 0;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background-color: var(--vp-code-block-bg);
}
</style>
