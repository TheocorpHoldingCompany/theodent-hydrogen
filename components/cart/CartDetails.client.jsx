import {useRef} from 'react';
import {useScroll, useWindowSize} from 'react-use';
import {
  Link,
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Money,
} from '@shopify/hydrogen';

import {Button, Text, CartLineItem, CartEmpty} from '~/components';

export function CartDetails({layout, onClose}) {
  const {lines} = useCart();
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} layout={layout} />;
  }

  const container = {
    drawer: 'grid grid-cols-1 grid-rows-[1fr_auto] theo-cart',
    page: 'pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12 theo-cart',
  };

  const content = {
    drawer: 'overflow-auto transition theo-cart',
    page: 'flex-grow md:translate-y-4 theo-cart',
  };

  const summary = {
    drawer: 'grid cart-summary-pd',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full cart-summary-pd',
  };

  return (
    <form
      style={{ height: '100%', position: 'relative', overflow: 'hidden' }}
      className={container[layout]}
      onSubmit={(evt) => evt.preventDefault()}
    >
      <section
        ref={scrollRef}
        aria-labelledby="cart-contents"
      >
        <div className='theo-h2 mt-1' style={{ fontSize: 20, fontWeight: 600 }}>Shopping Bag</div>
        <div className='mt-1' style={{ width: '48%', height: 1, background: '#CC8A52' }} />
        <div className='theo-h2' style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 24, marginTop: 3, cursor: 'pointer' }} onClick={onClose}>Continue Shopping</div>
      </section>
      <section className={`${content[layout]}`}>
        <ul className="grid" style={{ paddingLeft: 0 }}>
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="summary-heading" className={summary[layout]} style={{ borderTop: '1px solid #CC8A52' }}>
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </form>
  );
}

function CartCheckoutActions() {
  const {checkoutUrl} = useCart();

  if (checkoutUrl) {
    return(
      <Link to={checkoutUrl} prefetch={false} target="_self" style={{ textDecoration: 'none', marginBottom: 10 }}>
        <div className='theo-btn d-flex justify-content-center' style={{ width: '100%', background: '#2A1B16', color: '#fefcf3'}}>
          Continue to Checkout
        </div>
      </Link>
    )
  } else {
    return null;
  }
}

function OrderSummary() {
  const {cost} = useCart();
  const {width} = useWindowSize();

  return (
    <>
      <dl className="grid mt-3 mb-3">
        <div className="flex justify-between align-items-center">
          <div className='theo-h2' style={{ fontSize: width < 992 ? 15 : 16, fontWeight: 600 }}>
            SUBTOTAL
            <span style={{ fontWeight: 400, marginLeft: 5 }}>
              (SHIPPING EXCLUDED)
            </span>
          </div>
          <div className='theo-h2' style={{ fontSize: 20, fontWeight: 600 }}>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </div>
        </div>
      </dl>
    </>
  );
}
//        <CartShopPayButton />
