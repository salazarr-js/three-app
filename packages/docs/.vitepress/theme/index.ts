import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
/** Components */
import CodeSandboxButton from './components/CodeSandboxButton.vue'
import ThreeAppExample from './components/ThreeAppExample.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodeSandboxButton', CodeSandboxButton)
    app.component('ThreeAppExample', ThreeAppExample)
  },
} satisfies Theme

export * from './utils/index'
