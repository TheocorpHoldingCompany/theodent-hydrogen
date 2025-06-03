import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
  useLocalization
} from '@shopify/hydrogen';
import {Text} from '~/components';
import {useRef, useEffect, useState} from 'react';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductCard({product, label, className, loading, onClick, all}) {
  const [colWidth, setColWidth] = useState('');
  let cardLabel;
  const imgRef = useRef();
  const cardData = product?.variants ? product : getProductPlaceholder();
  const {
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(cardData?.variants)[0] || {};

  if (label) {
    cardLabel = label;
  }

  const currencySymbol = symbols[countryCode] || '$';

  useEffect(() => {
    if (imgRef?.current) {
      let bounds = imgRef?.current?.getBoundingClientRect();
      setColWidth(bounds?.width)
    }

  }, [imgRef])

  const priceContent = () => {
    return `$${Math.round(price?.amount)}`
  }

  return (
    <Link onClick={onClick} to={`/products/${product.handle}`} style={{ textDecoration: 'none' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0, top: 24, padding: '1px 16px 2px 16px', background: '#2A1B16', color: '#fefcf3', borderRadius: 2 }} className='theo-h3'>
          NEW
        </div>
        <div className='d-flex justify-content-center mb-3' ref={imgRef}>
          <Image
            className="swimline-img"
            width='100%'
            height='100%'
            src={image?.url}
            loading={loading}
            alt={image.altText || `Picture of ${product.title}`}
            style={{ width: '100%', maxHeight: colWidth | '' }}
          />
        </div>
        <div className="d-flex align-items-center flex-column" style={{ width: '100%' }}>
          <div className='theo-h2' style={{ textAlign: 'center', color: '#2A1B16', marginTop: -20 }}>
            {product.title}
          </div>
          <div className='theo-h3 mb-4' style={{ textAlign: 'center', color: '#2A1B16' }}>
            {product?.subtitle?.value}
          </div>
          <div className='theo-btn swimline-btn swimline-btn' style={{  }}>
            SHOP NOW {all && <span style={{fontStyle: 'italic', marginLeft: 6 }}>{priceContent()}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

const symbols = {
  FR: '€',
  US: '$',
  CA: 'CAD $',
  AU: 'AUD $',
  GB: '£'
}

const imgs = {
  'gid://shopify/Product/4180907884649': '/imgs/featuredClassic.png',
  'gid://shopify/Product/4180908048489': '/imgs/featured300.png',
  'gid://shopify/Product/4180908179561': '/imgs/featuredKids.png',
}
