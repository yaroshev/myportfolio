import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-static-files',
      closeBundle() {
        const publicDir = resolve(__dirname, 'public');
        const distDir = resolve(__dirname, 'dist');
        
        // List of files to copy
        const filesToCopy = ['sitemap.xml', 'robots.txt', 'manifest.json'];
        
        filesToCopy.forEach(file => {
          const sourcePath = resolve(publicDir, file);
          const targetPath = resolve(distDir, file);
          
          if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied ${file} to dist directory`);
          } else {
            console.warn(`Warning: ${file} not found in public directory`);
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0', // Allow connections from all network interfaces
    port: 5173,      // Use the same port you're currently using
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    // Ensure all files in public directory are copied to dist
    copyPublicDir: true,
  },
  // Explicitly set the public directory
  publicDir: 'public'
});
