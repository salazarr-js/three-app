import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/three-apps/*.ts'],
  outDir: './public/three-apps',
  format: ['esm'],

  clean: true,
  minify: true,
  target: 'esnext',
  treeshake: true,
  noExternal: ['three', '@slzr/three-app'],
  splitting: false,
})
