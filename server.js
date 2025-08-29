import {createRequestHandler} from '@shopify/remix-oxygen';
// Remix injects the compiled build via this virtual module at runtime
// eslint-disable-next-line import/no-unresolved
import * as build from 'virtual:remix/server-build';

export default {
  async fetch(request, env, executionContext) {
    const handleRequest = createRequestHandler({build, mode: env.NODE_ENV});
    return handleRequest(request, env, executionContext);
  },
};

