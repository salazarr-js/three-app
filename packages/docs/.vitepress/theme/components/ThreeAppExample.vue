<template>
  <div class="three-app-example">
    <iframe :srcdoc />

    <CodeSandboxButton :sandbox-id />
  </div>
</template>

<script setup lang="ts">
import type { Scripts } from '../utils'
import { defineProps, onMounted, ref } from 'vue'
import { defineCodeSandbox, getExampleTemplate } from '../utils'

const { scripts, path } = defineProps<{ scripts: Scripts, path: string }>()
const sandboxId = ref<string>()

const srcdoc = getExampleTemplate(`/examples/${path}/index.js`)

/** */
onMounted(async () => {
  const { id } = await defineCodeSandbox(scripts)
  sandboxId.value = id
})

// TODO: 'onLoaded' event
</script>

<style scoped lang="scss">
.three-app-example {
  margin: 16px 0;
  position: relative;
  iframe {
    width: 100%;
    border: none;
    overflow: hidden;
    user-select: none;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background-color: var(--vp-code-block-bg);
  }

  .code-sandbox-button {
    position: absolute;
    z-index: 2;
    bottom: 16px;
    right: 16px;
  }
}
</style>
