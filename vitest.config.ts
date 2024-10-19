/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.ts'

export default mergeConfig(viteConfig, defineConfig({
    test: {
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: './test/setupTest.ts'
    }
}))