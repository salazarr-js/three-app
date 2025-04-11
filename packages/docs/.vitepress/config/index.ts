import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: './src/content',
  title: 'Three App',
  description: 'Set of utility helpers to use `ThreeJs` in a functional and declarative way',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
  ],
  cleanUrls: true,
  rewrites: {
    'guide/:subfolder/:number([0-9]+)-:slug(.*)': 'guide/:slug', // guide/01-introduction/01-about -> guide/about
    ':folder(.*)/:number([0-9]+)-:slug(.*)': ':folder/:slug', // api/01-create-three-app -> api/create-three-app
  },
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    nav: [
      { text: 'Guide', link: '/guide/about' },
      { text: 'API', link: '/api/create-three-app' },
      { text: 'Examples', link: '/examples/first-scene' },
    ],

    sidebar: {
      guide: {
        base: '/guide',
        items: [
          {
            text: 'Introduction',
            items: [
              { text: '✨ About the project', link: '/about' },
              { text: '🚀 Getting Started', link: '/getting-started' },
              { text: '🎬 First Scene', link: '/first-scene' },
            ],
          },
          {
            text: 'Core',
            items: [
              { text: '🧬 Core Functionalities', link: '/core-functionalities' },
              { text: '🧠 Functional Composition', link: '/functional-composition' },
              { text: '🪝 "Hooks"', link: '/hooks' },
              { text: '🎉 Events', link: '/events' },
            ],
          },
          {
            text: 'Components',
            collapsed: true,
            items: [
              { text: '📏 Grid', link: '/grid' },
              { text: '🕹️ Controls', link: '/controls' },
              { text: '💡 Lights', link: '/lights' },
            ],
          },
        ],
      },
      api: {
        base: '/api',
        items: [
          {
            text: 'Core',
            items: [
              { text: 'createThreeApp', link: '/create-three-app' },
              { text: 'applyProps', link: '/apply-props' },
            ],
          },
        ],
      },
      examples: {
        base: '/examples',
        items: [
          { text: 'First Scene', link: '/first-scene' },
          { text: 'Reusable Components', link: '/components' },
          { text: 'Three Seed', link: '/three-seed' },
        ],
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/salazarr-js/three-app' },
    ],
  },
})
