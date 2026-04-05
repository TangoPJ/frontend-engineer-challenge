import { defineConfig } from 'vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react' }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    viteReact(),
  ],
});
