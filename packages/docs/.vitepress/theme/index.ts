import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
/** Components */
import CodeSandboxButton from './components/CodeSandboxButton.vue'
import ThreeAppSandbox from './components/ThreeAppSandbox.vue'

import './main.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ThreeAppSandbox', ThreeAppSandbox)
    app.component('CodeSandboxButton', CodeSandboxButton)
  },
} satisfies Theme

export * from './utils/index'
