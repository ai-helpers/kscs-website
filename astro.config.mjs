// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ai-helpers.github.io',
  base: '/kscs-website',
  trailingSlash: 'always',
  redirects: {
    '/doc/[...slug]': '/kscs-website/doc/[..slug]'
  }
});