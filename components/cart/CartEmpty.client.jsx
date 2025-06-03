import {useRef} from 'react';
import {Suspense} from 'react';
import {useScroll} from 'react-use';
import {fetchSync} from '@shopify/hydrogen';
import {Button, Text, ProductCard, Heading, Skeleton} from '~/components';

export function CartEmpty({onClose, layout = 'drawer'}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  return (
    <div ref={scrollRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <section>
        <div className='theo-h2 mt-1' style={{ fontSize: 20, fontWeight: 600 }}>Shopping Bag</div>
        <div className='mt-1' style={{ width: '48%', height: 1, background: '#CC8A52' }} />
        <div className='theo-h2' style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 24, marginTop: 3, cursor: 'pointer' }} onClick={onClose}>Continue Shopping</div>
      </section>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img alt='empty cart image' src='/imgs/emptyCart.png' style={{ width: '100%' }} />
        <a href='/products' className='theo-btn mt-3'>SHOP THEODENT</a>
      </div>
    </div>
  );
}
