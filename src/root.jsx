import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react';
import styles from '~/styles/index.css?url';

export const links = () => [
  {rel: 'stylesheet', href: styles},
];

export const meta = () => [
  {charSet: 'utf-8'},
  {name: 'viewport', content: 'width=device-width,initial-scale=1'},
];

export default function App() {
  return (
    <html lang="en" style={{background: '#fefcf3'}}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

