import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  server: './server.js',
  storefront: {
    defaultLocale: 'EN',
    defaultCountryCode: 'US',
  },
});