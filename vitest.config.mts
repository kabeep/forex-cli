import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        reporters: ['default'],
        include: ['test/**/*.spec.ts'],
        // Speed up tests, but also it's a workaround for the browser issue:
        // https://github.com/vitest-dev/vitest/issues/5382
        isolate: false
    },
});
