import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql, ProductOptionsProvider} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {NotFound, Layout, ProductSwimlane} from '~/components/index.server';
import {ProductDetail, ProductDetail2, ProductForm} from '~/components';
import {ProductPhotos} from '~/components/product';
import {Reviews} from './Reviews.client';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const {language, country} = storefront.i18n;

  const data = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, language, country},
    cache: {mode: 'public', maxAge: 60},
  });

  return json({...data, i18n: {country, language}});
}

export const meta = ({data}) => {
  const product = data?.product;
  if (!product) return [{title: 'Product'}];
  const first = product?.media?.nodes?.[0]?.image;
  const og = first?.url ? first.url.replace('https', 'http') : undefined;
  const title = product?.seo?.title || product?.title || 'Product';
  const description = product?.seo?.description || '';
  const tags = [
    {title},
    {name: 'description', content: description},
  ];
  if (og) tags.push({property: 'og:image', content: og});
  if (first?.height) tags.push({property: 'og:image:height', content: String(first.height)});
  if (first?.width) tags.push({property: 'og:image:width', content: String(first.width)});
  return tags;
};

export default function Product() {
  const {product, shop, i18n} = useLoaderData();
  if (!product) return <NotFound type="product" />;

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

  const {
    priceV2,
    id: variantId,
    sku,
    title: variantTitle,
  } = product.variants.nodes[0];

  const getReviewId = () => {
    let id1 = id?.split('/');
    if (id1?.length > 0) {
      return id1?.slice(-1)[0];
    }
  };

  const specs = specifications?.value?.split(',');
  const productImages = product?.media?.nodes?.map((i) => i?.image?.url) || [];
  const firstMedia = media?.nodes[0]?.image;
  const notSecureImg = firstMedia?.url?.replace('https', 'http');

  return (
    <Layout>
      <Suspense>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${title} - Fluoride-Free Toothpaste`,
            description: `${title} by Theodent features patented Rennou® technology using cacao to safely remineralize tooth enamel. A fluoride-free alternative that's safe if swallowed.`,
            brand: { '@type': 'Brand', name: 'Theodent' },
            manufacturer: { '@type': 'Organization', name: 'Theodent' },
            image: productImages,
            offers: {
              '@type': 'Offer',
              url: `https://shoptheodent.com/products/${product.handle}`,
              priceCurrency: priceV2.currencyCode,
              price: priceV2.amount,
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: 'Theodent' },
            },
            additionalProperty: [
              { '@type': 'PropertyValue', name: 'Fluoride-Free', value: 'Yes' },
              { '@type': 'PropertyValue', name: 'Active Ingredient', value: 'Rennou® (Cacao-based)' },
              { '@type': 'PropertyValue', name: 'Safe if Swallowed', value: 'Yes' },
            ],
          }),
        }} />
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
              <ProductForm country={i18n?.country} />
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
                <img alt="Fluoride-free formula" src="/imgs/icon1.webp" style={{width: 90, margin: 18}} />
                <img alt="Safe if swallowed" src="/imgs/icon2.webp" style={{width: 90, margin: 18}} />
                <img alt="Remineralizes enamel" src="/imgs/icon3.webp" style={{width: 90, margin: 18}} />
              </div>
              <div
                className="d-flex justify-content-around align-items-center ps-md-4 pe-md-4"
                style={{}}
              >
                <img alt="Cacao-based Rennou technology" src="/imgs/icon4.webp" style={{width: 90, margin: 18}} />
                <img alt="Premium natural ingredients" src="/imgs/icon5.webp" style={{width: 90, margin: 18}} />
                <img alt="Clinically proven effective" src="/imgs/icon6.webp" style={{width: 90, margin: 18}} />
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
      subtitle: metafield(namespace: "product", key: "subtitle") { value }
      howtouse: metafield(namespace: "product", key: "howtouse") { value }
      ingredients: metafield(namespace: "product", key: "ingredients") { value }
      specifications: metafield(namespace: "product", key: "specifications") { value }
      media(first: 7) { nodes { ...Media } }
      productType
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions { name value }
          image { id url altText width height }
          priceV2 { amount currencyCode }
          compareAtPriceV2 { amount currencyCode }
          sku
          title
          unitPrice { amount currencyCode }
        }
      }
      seo { description title }
    }
    shop {
      shippingPolicy { body handle }
      refundPolicy { body handle }
    }
  }
`;
