import { defineConfig } from 'vite'

export default defineConfig({
  root: `${process.cwd()}/playground`,
  resolve: {
    alias: {
      '~': process.cwd(),
    }
  }
})