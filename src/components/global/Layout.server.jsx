import {Suspense} from 'react';
import {Header} from '~/components';
import {Footer} from '~/components/index.server';
import {TheoCookieConsent} from '../Cookies.client';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({children}) {
  return (
    <>
      <div
        className="flex flex-col min-h-screen"
        style={{background: '#fefcf3', width: '100vw', overflowX: 'hidden'}}
      >
        <a href="#mainContent" className="sr-only">
          Skip to content
        </a>
        <Suspense fallback={<Header title={'Theodent Toothpaste'} />}>
          <HeaderWithMenu />
        </Suspense>
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Suspense fallback={<Footer />}>
        <FooterWithMenu />
      </Suspense>
      <TheoCookieConsent />
    </>
  );
}

function HeaderWithMenu() {
  return <Header title={'Theodent Toothpaste'} />;
}

function FooterWithMenu() {
  return <Footer />;
}
