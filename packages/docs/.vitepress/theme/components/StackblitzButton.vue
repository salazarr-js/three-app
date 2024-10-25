<template>
  <button type="button" class="edit-on-stackblitz" @click="openExample">
    <span class="eos-text">Edit on</span>

    <svg viewBox="0 0 28 28" aria-hidden="true" class="eos-logo" height="18">
      <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5l3.671-10.227z" />
    </svg>

    <svg viewBox="0 0 104 28" class="eos-word-mark" height="18">
      <path d="M10.05 21.285c3.176 0 5.433-1.671 5.433-4.492 0-3.092-2.487-3.865-4.701-4.534-2.278-.69-2.633-1.15-2.633-1.818 0-.585.522-1.107 1.567-1.107 1.337 0 2.027.648 2.528 1.692l2.821-1.65C14 7.224 12.12 6.074 9.716 6.074c-2.528 0-4.91 1.63-4.91 4.45 0 2.8 2.131 3.845 4.304 4.451 2.194.606 3.03.961 3.03 1.86 0 .564-.397 1.19-1.985 1.19-1.65 0-2.55-.814-3.072-2.026L4.2 17.671c.815 2.152 2.779 3.614 5.85 3.614zm12.815-7.73v-3.01h-2.152V7.62l-3.134.94v1.986h-1.672v3.009h1.672v3.698c0 2.925 1.19 4.158 5.286 3.74V18.15c-1.379.084-2.152 0-2.152-.898v-3.698h2.152zm9.155-3.01v.983c-.69-.794-1.713-1.275-3.113-1.275-2.737 0-4.994 2.403-4.994 5.516 0 3.114 2.257 5.516 4.994 5.516 1.4 0 2.424-.48 3.113-1.274v.982h3.134V10.546H32.02zm-2.486 7.773c-1.442 0-2.487-.982-2.487-2.549s1.045-2.549 2.487-2.549c1.442 0 2.486.982 2.486 2.55 0 1.566-1.044 2.548-2.486 2.548zm12.934 2.967c2.048 0 3.824-1.065 4.723-2.695l-2.738-1.567c-.334.731-1.107 1.17-2.026 1.17-1.358 0-2.361-.982-2.361-2.424 0-1.441 1.002-2.424 2.36-2.424.92 0 1.672.44 2.027 1.17l2.738-1.587c-.899-1.61-2.696-2.675-4.723-2.675-3.176 0-5.537 2.403-5.537 5.516 0 3.114 2.361 5.516 5.537 5.516zm16.013-.292l-3.907-5.224 3.803-5.223H54.72l-3.134 4.576V6.367h-3.134v14.626h3.134v-4.618l3.343 4.618h3.552zm10.325-7.585c.794-.69 1.275-1.65 1.275-2.862 0-2.529-2.069-4.18-4.618-4.18h-5.725v14.627h6.143c2.612 0 4.722-1.692 4.722-4.284 0-1.483-.71-2.611-1.797-3.3zm-3.343-3.907c.773 0 1.275.543 1.275 1.295 0 .753-.523 1.296-1.275 1.296h-2.382V9.5h2.382zm.418 8.358h-2.8v-2.8h2.8c.836 0 1.379.585 1.379 1.4s-.543 1.4-1.379 1.4zm6.281 3.134h3.134V5.74h-3.134v15.253zm6.995-11.367a1.9 1.9 0 001.88-1.88 1.9 1.9 0 00-1.88-1.88 1.9 1.9 0 00-1.88 1.88 1.9 1.9 0 001.88 1.88zM77.59 20.993h3.134V10.546H77.59v10.447zm11.55-7.438v-3.01h-2.153V7.62l-3.134.94v1.986h-1.671v3.009h1.671v3.698c0 2.925 1.191 4.158 5.286 3.74V18.15c-1.379.084-2.152 0-2.152-.898v-3.698h2.152zm5.66 4.513l3.95-5.433v-2.09h-7.94v2.926h3.74l-3.95 5.432v2.09h8.358v-2.925H94.8z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import type { Scripts } from '../utils/index'
import { openStackblitzProject } from '../utils/index'

const { scripts } = defineProps<{ scripts: Scripts }>()

function openExample() {
  openStackblitzProject({ scripts })
}
</script>

<style scoped lang="scss">
$stackblitz-blue: #1389fd;

.edit-on-stackblitz {
  color: var(--vp-button-alt-text);
  cursor: pointer;
  user-select: none;
  display: flex;
  padding: 8px 16px;
  font-size: 14px;
  transition: color 0.25s, background-color 0.25s;
  line-height: 1;
  align-items: center;
  border-radius: 4px;
  background-color: var(--vp-button-alt-bg);

  &:hover {
    color: var(--vp-button-alt-hover-text);
    background-color: var(--vp-button-alt-hover-bg);
  }

  &:active {
    color: var(--vp-button-alt-active-text);
    background-color: var(--vp-button-alt-active-bg);
  }

  .eos-text {
    margin-right: 4px;
  }

  .eos-logo {
    fill: currentColor;
    color: $stackblitz-blue;
  }

  .eos-word-mark {
    fill: currentColor;
  }
}
</style>
