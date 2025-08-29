import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  Head,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {NotFound, Layout, ProductSwimlane} from '~/components/index.server';
import {ProductDetail, ProductDetail2, ProductForm} from '~/components';
import {ProductPhotos} from '~/components/product';
import {Reviews} from './Reviews.client';

export default function Product() {
  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product, shop},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="product" />;
  }

  const {
    media,
    title,
    vendor,
    descriptionHtml,
    id,
    productType,
    subtitle,
    howtouse,
    ingredients,
    specifications,
  } = product;
  // const {shippingPolicy, refundPolicy} = shop;
  const {
    priceV2,
    id: variantId,
    sku,
    title: variantTitle,
  } = product.variants.nodes[0];
  // const additional = productData[id];

  const getReviewId = () => {
    let id1 = id?.split('/');
    if (id1?.length > 0) {
      return id1?.slice(-1)[0];
    }
  };

  useServerAnalytics({
    shopify: {
      canonicalPath: `/products/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: id,
      products: [
        {
          product_gid: id,
          variant_gid: variantId,
          variant: variantTitle,
          name: title,
          brand: vendor,
          category: productType,
          price: priceV2.amount,
          sku,
        },
      ],
    },
  });

  const specs = specifications?.value?.split(',');
  const productImages = product?.media?.nodes?.map((i) => i?.image?.url) || [];
  const firstMedia = media?.nodes[0]?.image;
  const notSecureImg = firstMedia?.url?.replace('https', 'http');

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
        <Head>
          <meta property="og:image:height" content={firstMedia?.height} />
          <meta property="og:image:width" content={firstMedia?.width} />
          <meta property="og:image" content={notSecureImg} />
        </Head>
      </Suspense>
      <ProductOptionsProvider data={product}>
        <div className="container mt-3 mt-lg-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-5">
              <ProductPhotos photos={productImages} />
            </div>
            <div className="col-12 col-md-6 col-lg-7">
              <div className="theo-h2">{title}</div>
              <div
                style={{fontWeight: 600, fontSize: 18}}
                className="theo-h3 mb-3"
              >
                {subtitle?.value}
              </div>
              <div
                className="theo-h3"
                dangerouslySetInnerHTML={{__html: descriptionHtml}}
              />
              <ProductForm country={countryCode} />
              <div
                className="mt-4 pt-1"
                style={{borderBottom: '2px solid #CC8A51'}}
              >
                <ProductDetail title="How to Use" content={howtouse?.value} />
                <ProductDetail
                  title="Ingredients"
                  content={
                    <>
                      {ingredients?.value}
                      <div style={{marginTop: 20}}>
                        <a
                          style={{fontSize: 15, letterSpacing: 0.3}}
                          className="theo-footer-header footer-pp-link"
                          href="/pages/ingredients"
                        >
                          Click here for more information
                        </a>
                      </div>
                    </>
                  }
                />
                <ProductDetail2 title="Specifications" content={[specs]} />
              </div>
              <div
                className="d-flex justify-content-around align-items-center mt-5 ps-md-4 pe-md-4"
                style={{}}
              >
                <img
                  alt=""
                  src="/imgs/icon1.webp"
                  style={{width: 90, margin: 18}}
                />
                <img
                  alt=""
                  src="/imgs/icon2.webp"
                  style={{width: 90, margin: 18}}
                />
                <img
                  alt=""
                  src="/imgs/icon3.webp"
                  style={{width: 90, margin: 18}}
                />
              </div>
              <div
                className="d-flex justify-content-around align-items-center ps-md-4 pe-md-4"
                style={{}}
              >
                <img
                  alt=""
                  src="/imgs/icon4.webp"
                  style={{width: 90, margin: 18}}
                />
                <img
                  alt=""
                  src="/imgs/icon5.webp"
                  style={{width: 90, margin: 18}}
                />
                <img
                  alt=""
                  src="/imgs/icon6.webp"
                  style={{width: 90, margin: 18}}
                />
              </div>
            </div>
          </div>
        </div>
        <Reviews id={getReviewId()} />
        <Suspense>
          <ProductSwimlane title="People Also Love" data={id} />
        </Suspense>
        <div style={{height: 90, width: '100%'}} />
      </ProductOptionsProvider>
    </Layout>
  );
}
//        <div id="looxReviews" data-product-id={id}></div>
const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      subtitle: metafield(namespace: "product", key: "subtitle") {
        value
      }
      howtouse: metafield(namespace: "product", key: "howtouse") {
        value
      }
      ingredients: metafield(namespace: "product", key: "ingredients") {
        value
      }
      specifications: metafield(namespace: "product", key: "specifications") {
        value
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      productType
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;

const photos = [
  '/imgs/ProductPhotos/classic1.png',
  '/imgs/ProductPhotos/classic2.png',
  '/imgs/ProductPhotos/classic3.png',
  '/imgs/ProductPhotos/classic4.png',
  '/imgs/ProductPhotos/classic5.png',
  '/imgs/ProductPhotos/classic6.png',
  '/imgs/ProductPhotos/classic7.png',
];

const productData = {
  'gid://shopify/Product/4180907884649': {
    photos: [
      '/imgs/ProductPhotos/classic1.png',
      '/imgs/ProductPhotos/classic2.png',
      '/imgs/ProductPhotos/classic3.png',
      '/imgs/ProductPhotos/classic4.png',
      '/imgs/ProductPhotos/classic5.png',
      '/imgs/ProductPhotos/classic6.png',
      '/imgs/ProductPhotos/classic7.png',
    ],
  },
  'gid://shopify/Product/4180908048489': {
    photos: [
      '/imgs/ProductPhotos/classic1.png',
      '/imgs/ProductPhotos/classic2.png',
      '/imgs/ProductPhotos/classic3.png',
      '/imgs/ProductPhotos/classic4.png',
      '/imgs/ProductPhotos/classic5.png',
      '/imgs/ProductPhotos/classic6.png',
      '/imgs/ProductPhotos/classic7.png',
    ],
  },
  'gid://shopify/Product/4180908179561': {
    photos: [
      '/imgs/ProductPhotos/classic1.png',
      '/imgs/ProductPhotos/classic2.png',
      '/imgs/ProductPhotos/classic3.png',
      '/imgs/ProductPhotos/classic4.png',
      '/imgs/ProductPhotos/classic5.png',
      '/imgs/ProductPhotos/classic6.png',
      '/imgs/ProductPhotos/classic7.png',
    ],
  },
  // 'gid://shopify/Product/4180908048489': {},
  // 'gid://shopify/Product/4180908048489': {},
};

const productDropdowns = {
  'gid://shopify/Product/4180907884649': {
    howTo: 'Brush twice daily for two minutes. Rinse and repeat.',
    ingredients:
      'Aqua/Water/Eau, Hydrated Silica, Xylitol, Sorbitol, Glycerin, Sodium Lauroyl Sarcosinate, Xanthan Gum, Theobromine, Calcium Acetate, Disodium Phosphate, Titanium Dioxide (CI 77891), Citric Acid, Sodium Bicarbonate, Sodium Benzoate, Sodium Chloride, Stevioside, Mentha Viridis (Spearmint) Leaf Oil, Vanilla Planifolia Flower Extract *Limonene',
    specs: [
      '3.4 oz (96.4g)',
      'Silky smooth white paste',
      'Delicate spearmint and vanilla flavor',
      'Approximately two months of twice-daily use',
      'New and improved packaging',
    ],
  },
  'gid://shopify/Product/4180908048489': {
    howTo: 'Brush twice daily for two minutes. Rinse and repeat.',
    ingredients:
      'Aqua/Water/Eau, Hydrated Silica, Xylitol, Sorbitol, Glycerin, Sodium Lauroyl Sarcosinate, Xanthan Gum, Theobromine, Calcium Acetate, Disodium Phosphate, Titanium Dioxide (CI 77891), Citric Acid, Sodium Bicarbonate, Sodium Benzoate, Sodium Chloride, Stevioside, Mentha Viridis (Spearmint) Leaf Oil, Vanilla Planifolia Flower Extract *Limonene',
    specs: [
      '3.4 oz (96.4g)',
      'Silky smooth white paste',
      'Delicate spearmint and vanilla flavor',
      'Approximately two months of twice-daily use',
      'New and improved packaging',
    ],
  },
  'gid://shopify/Product/4180908179561': {
    howTo: 'Brush twice daily for two minutes. Rinse and repeat.',
    ingredients: 'Need ingredients for kids',
    specs: ['need specs for kids'],
  },
};

// make sure find us is working
// share on tech page
// tech footnotes
