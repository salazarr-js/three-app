import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
/** Components */
import ExampleTitle from './components/ExampleTitle.vue'
import StackblitzButton from './components/StackblitzButton.vue'
import ThreeApp from './components/ThreeApp.vue'

import './main.scss'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ThreeApp', ThreeApp)
    app.component('StackblitzButton', StackblitzButton)
    app.component('ExampleTitle', ExampleTitle)
  },
} satisfies Theme

export * from './utils/index'
