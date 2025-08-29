import {useEffect, useCallback, useState} from 'react';

import {
  useProductOptions,
  isBrowser,
  useUrl,
  AddToCartButton,
  Money,
  ShopPayButton,
} from '@shopify/hydrogen';

import {Heading, Text, Button, ProductOptions} from '~/components';

export function ProductForm({ country }) {
  const {pathname, search} = useUrl();
  const [quantity, setQuantity] = useState(1);
  const [params, setParams] = useState(new URLSearchParams(search));
  const [animate, setAnimate] = useState(false);

  const {options, setSelectedOption, selectedOptions, selectedVariant} =
    useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  const isOnSale =
    selectedVariant?.priceV2?.amount <
      selectedVariant?.compareAtPriceV2?.amount || false;

  useEffect(() => {
    if (params || !search) return;
    setParams(new URLSearchParams(search));
  }, [params, search]);

  useEffect(() => {
    options.map(({name, values}) => {
      if (!params) return;
      const currentValue = params.get(name.toLowerCase()) || null;
      if (currentValue) {
        const matchedValue = values.filter(
          (value) => encodeURIComponent(value.toLowerCase()) === currentValue,
        );
        setSelectedOption(name, matchedValue[0]);
      } else {
        params.set(
          encodeURIComponent(name.toLowerCase()),
          encodeURIComponent(selectedOptions[name].toLowerCase()),
        ),
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
      }
    });
  }, []);

  const handleChange = useCallback(
    (name, value) => {
      setSelectedOption(name, value);
      if (!params) return;
      params.set(
        encodeURIComponent(name.toLowerCase()),
        encodeURIComponent(value.toLowerCase()),
      );
      if (isBrowser()) {
        window.history.replaceState(
          null,
          '',
          `${pathname}?${params.toString()}`,
        );
      }
    },
    [setSelectedOption, params, pathname],
  );

  const handleDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleUp = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1)
    }
  }

  const handleBlur = () => {
    if (quantity?.length > 0) {
      let num = parseInt(quantity);
      if (num === 0) {
        setQuantity(1)
      } else {
        if (num > 99) {
          setQuantity(99)
        } else {
          setQuantity(num)
        }
      }
    } else {
      setQuantity(1)
    }
  }

  const handleAnimate = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 2000)
  }

  const singlePrice = Math.round(selectedVariant?.priceV2?.amount)
  const _currentPrice = singlePrice * quantity
  const safePrice = Math.max(_currentPrice, singlePrice)
  const currencySymbol = symbols[country] || '$'

  const priceContent = () => {
    return `ADD TO CART ${currencySymbol}${safePrice}`
  }

  return (
    <>
      <div style={{ height: 36, width: 142, border: '1px solid #2A1B16'}} className='flex mt-4'>
        <div style={{ width: 40, userSelect: 'none', height: '100%', borderRight: '1px solid #2A1B16', color: '#2A1B16', cursor: 'pointer', marginBottom: 1 }} onClick={handleDown} className='d-flex justify-content-center align-items-center'>
          &#8722;
        </div>
        <div style={{ width: 60, height: '100%', color: '#2A1B16' }} className='d-flex justify-content-center align-items-center'>
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} onBlur={handleBlur} style={{ width: '100%', height: '100%', border: 'none', outline: 'none', textAlign: 'center', background: 'transparent' }} />
        </div>
        <div style={{ width: 40, userSelect: 'none', height: '100%', borderLeft: '1px solid #2A1B16', color: '#2A1B16', cursor: 'pointer', marginBottom: 1 }} onClick={handleUp} className='d-flex justify-content-center align-items-center'>
          &#43;
        </div>
      </div>
      <div className="grid items-stretch mt-3" style={{ width: '100%' }}>
        <AddToCartButton
          variantId={selectedVariant?.id}
          quantity={quantity}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
          as='button'
        >
          <div className='theo-btn' style={{ width: '100%' }} onClick={handleAnimate}>
            {animate ? 'ADDED!' : priceContent()}
          </div>
        </AddToCartButton>
      </div>
    </>
  );
}

const symbols = {
  FR: '€',
  US: '$',
  CA: 'CAD $',
  AU: 'AUD $',
  GB: '£'
}
//      {!isOutOfStock && <ShopPayButton variantIds={[selectedVariant.id]} />}
