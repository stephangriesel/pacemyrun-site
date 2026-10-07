import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Fully static: deploy the dist/ folder to any static host.
export default defineConfig({
  site: 'https://pacemy.run',
  integrations: [sitemap()],
});
