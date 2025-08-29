import {useState, useEffect} from 'react';

export const StoreLocator = () => {
  const [show, setShow] = useState(false);
  // let body = page.body?.replace('${Shopify.shop}', 'theodent.myshopify.com')?.replace('${Shopify.routes.root}', '/');

  useEffect(() => {
    setTimeout(() => setShow(true), 2000);
  }, []);

  return (
    <>
      <div className="container mt-3 mb-2">
        <div className="pages-h1 mb-2">STORE LOCATOR</div>
        <div
          style={{width: '100%', height: 2, background: '#CC8A51', opacity: 1}}
        />
      </div>
      <div
        style={{width: '100%', height: 600}}
        className="d-flex justify-content-center align-items-start"
      >
        {show && (
          <>
            <div id="progus-store-locator"></div>
          </>
        )}
      </div>
    </>
  );
};

// old brown text 502C1D
// old brown 502b1d
// new brown 2A1B16

// old coffee C9A977
// new copper CC8A52

// footer 2F4135
