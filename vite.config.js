import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tp3-oscari/',   // exacto al nombre de tu repo
})
