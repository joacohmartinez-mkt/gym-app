import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base solo en build (GitHub Pages → https://<user>.github.io/gym-app/).
// En dev queda en '/' para que el preview y el server local funcionen normal.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/gym-app/' : '/',
  plugins: [react()],
}))
