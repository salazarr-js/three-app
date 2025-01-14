<template>
  <div class="three-app-sandbox">
    <Transition name="fade">
      <div v-if="!isSandboxReady" class="skeleton" />
    </Transition>

    <iframe ref="iframe-ref" src="" frameborder="0" />

    <div class="three-app-sandbox-buttons">
      <CodeSandboxButton :sandbox-id />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { defineCodeSandbox, type Scripts } from '../utils'

const { scripts } = defineProps<{ scripts: Scripts }>()
const iframeRef = useTemplateRef('iframe-ref')
// Flags
const isSandboxReady = ref(false)
const sandboxId = ref<string>()

/** */
onMounted(async () => {
  const { id } = await defineCodeSandbox(scripts)
  sandboxId.value = id
})

/** */
onUnmounted(() => {})
</script>

<style setup lang="scss">
  .three-app-sandbox {
    width: 100%;
    margin: 16px 0;
    overflow: hidden;
    position: relative;
    aspect-ratio: 16 / 9;
    border-radius: 8px;
    background-color: transparent;

    user-select: none;

    .skeleton {
      inset: 0px;
      z-index: 10;
      position: absolute;
      pointer-events: none;
      background-color: var(--vp-code-block-bg);

      animation: skeleton 1.5s ease-in-out infinite;
      will-change: background-position;
      background-size: 200% auto;
      background-image: linear-gradient(115deg, transparent 0%, transparent 30%, var(--vp-c-bg-elv) 59%, transparent 60%, transparent 100%);
      background-repeat: no-repeat;
      background-position-x: -50%;
    }

    iframe {
      width: 100%;
      border: none;
      height: 100%;
      background-color: var(--vp-code-block-bg);
    }

    .three-app-sandbox-buttons {
      right: 8px;
      bottom: 8px;
      position: absolute;
    }
  }
</style>
