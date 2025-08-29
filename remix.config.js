/** Remix config targeting Shopify Oxygen. Keeps `src` as app directory. */
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  appDirectory: 'src',
  server: './server.js',
  serverModuleFormat: 'esm',
  future: {
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true,
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },
  ignoredRouteFiles: ['**/*.test.*', '**/*.spec.*', '**/*.map'],
};

