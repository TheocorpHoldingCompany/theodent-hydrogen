import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';
import {useWindowSize} from 'react-use';
import {Heading, IconRemove, Text} from '~/components';

export function CartLineItem() {
  const {linesRemove} = useCart();
  const {width} = useWindowSize();
  const {id: lineId, quantity, merchandise} = useCartLine();
  const isSmall = width < 767;
  const imgSize = isSmall ? 90 : 100

  return (
    <li key={lineId} className="d-flex" style={{ marginBottom: isSmall ? 40 : 30 }}>
      <Image
        alt='cart-product-image'
        width={imgSize}
        height={imgSize}
        widths={[imgSize]}
        data={merchandise.image}
        loaderOptions={{
          scale: 2,
          crop: 'center',
        }}
        style={{ flexShrink: 0, marginRight: 20, width: imgSize, height: imgSize, objectFit: 'cover' }}
      />
        <div className="" style={{ width: '100%' }}>
          <div className='theo-h2' style={{ fontSize: isSmall ? 18 : 20, fontWeight: 600, lineHeight: 1 }}>
            {merchandise.product.title}
          </div>
          <div className='theo-h2' style={{ fontSize: isSmall ? 13 : 14 }}>
            {merchandise.product.productType}
          </div>
          <div style={{ width: '100%', height: 1, background: '#CC8A52', marginTop: 8, marginBottom: 12 }} />
          <div className="flex items-center justify-between">
            <div className="flex justify-start text-copy">
              <CartLineQuantityAdjust lineId={lineId} quantity={quantity} isSmall={isSmall} />
            </div>
            <button
              type="button"
              onClick={() => linesRemove([lineId])}
              className='theo-p'
              style={{ fontSize: 12, marginBottom: isSmall ? 2 : 0 }}
            >
              REMOVE
            </button>
        </div>
      </div>
    </li>
  );
}

function CartLineQuantityAdjust({lineId, quantity, isSmall}) {
  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center" style={{ border: '1px solid #2A1B16' }}>
        <CartLineQuantityAdjustButton
          adjust="decrease"
          aria-label="Decrease quantity"
          style={{ borderRight: '1px solid #2A1B16', color: '#2A1B16', height: isSmall ? 29 : 33, outline: 'none' }}
          className="w-10 transition hover:text-primary disabled:cursor-wait"
        >
          &#8722;
        </CartLineQuantityAdjustButton>
        <div style={{ width: 60, color: '#2A1B16' }}>
          <CartLineQuantity as="div" className="px-2 text-center" />
        </div>
        <CartLineQuantityAdjustButton
          adjust="increase"
          aria-label="Increase quantity"
          style={{ borderLeft: '1px solid #2A1B16', color: '#2A1B16', height: isSmall ? 29 : 33, outline: 'none' }}
          className="w-10 h-10 transition hover:text-primary disabled:cursor-wait"
        >
          &#43;
        </CartLineQuantityAdjustButton>
      </div>
    </>
  );
}
