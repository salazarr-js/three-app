import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: './src',
  title: "Three App",
  description: "Set of utility helpers to use `ThreeJs` in a functional and declarative way",
  head: [
    ['link', { rel: 'icon', href: '/logo-simple.png' }]
  ],
  themeConfig: {
    logo: '/logo-simple.png',
    nav: [
      { text: 'Guide', link: '/guide/01-introduction' },
      { text: 'API', link: '/api/01-createThreeApp' },
      { text: 'Examples', link: '/examples/01-first-scene' }
    ],

    sidebar: {
      'guide': {
        base: '/guide',
        items: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/01-introduction' },
              { text: 'Getting Started', link: '/02-getting-started' }
            ]
          }
        ]
      },
      'api': {
        base: '/api',
        items: [
          { text: 'createThreeApp', link: '/01-createThreeApp' },
          { text: 'applyProps', link: '/02-applyProps' },
        ]
      },
      'examples': {
        base: '/examples',
        items: [
          { text: 'First Scene', link: '/01-first-scene' },
          { text: 'Usable Components', link: '/02-components' },
        ]
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/salazarr-js/three-app' }
    ]
  }
})
