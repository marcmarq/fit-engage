import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'react', // Ensure JSX syntax is enabled for React
  },
  // Instead of 'loader' inside 'esbuild', use the following to specify the loader for js files
  resolve: {
    alias: {
      // Resolve the extension handling issue (optional if needed)
      '@': '/src',
    },
  },
})

