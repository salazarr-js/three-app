import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'examples',
  entry: ['./src/examples/**/index.ts'],
  outDir: './src/content/public/examples',
  format: ['esm'],

  clean: true,
  minify: true,
  target: 'esnext',
  treeshake: true,
  noExternal: ['three', '@slzr/three-app'],
})
