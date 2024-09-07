import { defineConfig } from 'tsup'

export default defineConfig({
  name: 'three-app',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['three'],
  clean: true,
  target: 'esnext',
  dts: true
})
