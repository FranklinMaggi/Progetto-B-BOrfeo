import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(({ command }) => ({
    plugins: [react()],
    // ✅ base dinamica: "/" in dev, "/Progetto-B-BOrfeo/" per Pages
    base: command === 'build' ? '/Progetto-B-BOrfeo/' : '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
    },
}));
