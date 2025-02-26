---
aside: false
---

# Playground

<div id="three-app"></div>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  await import('../playground')
})
</script>

<style lang="scss" scoped>
#three-app {
  width: 100%;
  margin: 16px 0;
  height: auto;
  overflow: hidden;
  user-select: none;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background-color: var(--vp-code-block-bg);
}
</style>
