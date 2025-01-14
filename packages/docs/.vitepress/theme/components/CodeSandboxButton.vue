<template>
  <a
    rel="noreferrer noopener"
    title="Open in CodeSandbox"
    class="code-sandbox-button"
    target="_blank"
    :href="codeSandboxLink"
    :disabled
  >
    <svg fill="none" height="1em" viewBox="0 0 16 16" width="1em" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
      <path
        d="M6.66665 3.33337H4.33331C3.78103 3.33337 3.33331 3.78109 3.33331 4.33337V11.6667C3.33331 12.219 3.78103 12.6667 4.33331 12.6667H11.6666C12.2189 12.6667 12.6666 12.219 12.6666 11.6667V9.33337"
        stroke-linecap="round"
      />
      <path d="M10 3.33337H12.5667C12.6219 3.33337 12.6667 3.37815 12.6667 3.43337V6.00004" stroke-linecap="round" />
      <path d="M7.33331 8.66668L12.5333 3.46667" stroke-linecap="round" />
    </svg>

    <span>Open Sandbox</span>
  </a>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

const { sandboxId } = defineProps<{ sandboxId?: string }>()

const disabled = computed(() => !sandboxId)

const codeSandboxLink = computed(() => sandboxId ? `https://codesandbox.io/p/sandbox/${sandboxId}` : '')
</script>

<style scoped lang="scss">
.code-sandbox-button {
  gap: 4px;
  cursor: pointer;
  display: inline-flex;
  padding: 6px 12px;
  font-size: 12px;
  background: red;
  transition: color 0.25s, background-color 0.25s;
  user-select: none;
  align-items: center;
  font-weight: 600;
  line-height: 1;
  border-radius: 4px;
  text-decoration: none;

  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);

  &:hover {
    color: var(--vp-button-alt-hover-text);
    background-color: var(--vp-button-alt-hover-bg);
  }

  &:active {
    color: var(--vp-button-alt-active-text);
    background-color: var(--vp-button-alt-active-bg);
  }

  svg {
    font-size: 16px;
  }

  &[disabled = true] {
    opacity: .5;
    pointer-events: none;
  }
}
</style>
