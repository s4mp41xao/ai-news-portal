import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Add any other problematic imports here
      ],
    },
  },
  optimizeDeps: {
    include: [
      '@mui/material/Button',
      '@mui/icons-material/Search',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled'
    ]
  }
})