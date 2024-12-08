import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@shared': path.resolve(__dirname, 'src', 'shared'),
            '@app': path.resolve('src', './app'),
            '@entities': path.resolve('src', './entities'),
            '@features': path.resolve('src', './features'),
            '@pages': path.resolve('src','./pages')
        },
    },
    plugins: [
        react(),
        svgr(
            {
                svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
                include: ["**/*.svg"]
            }
        ),
    ],
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                entryFileNames: "bundle.js",
                assetFileNames: "static/[name].[ext]",
            },
        },
    },
    base: './'
});

