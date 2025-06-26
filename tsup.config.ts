import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/worker.ts'],
  outDir: 'dist',
  target: 'es2022',
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  dts: false,
})
