import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: './src',
  title: 'Three App',
  description: 'Set of utility helpers to use `ThreeJs` in a functional and declarative way',
  head: [
    ['link', { rel: 'icon', href: '/logo-simple.png' }],
  ],
  cleanUrls: true,
  rewrites: {
    ':folder/:number([0-9]+)-:slug(.*)': ':folder/:slug', // guide/01-introduction -> guide/introduction
  },
  themeConfig: {
    logo: '/logo-simple.png',
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API', link: '/api/create-three-app' },
      { text: 'Examples', link: '/examples/first-scene' },
    ],

    sidebar: {
      guide: {
        base: '/guide',
        items: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/introduction' },
              { text: 'Getting Started', link: '/getting-started' },
            ],
          },
        ],
      },
      api: {
        base: '/api',
        items: [
          { text: 'createThreeApp', link: '/create-three-app' },
          { text: 'applyProps', link: '/apply-props' },
        ],
      },
      examples: {
        base: '/examples',
        items: [
          { text: 'First Scene', link: '/first-scene' },
          { text: 'Reusable Components', link: '/components' },
        ],
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/salazarr-js/three-app' },
    ],
  },
})
