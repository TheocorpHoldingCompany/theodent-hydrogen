import {gql, useLocalization, useShopQuery} from '@shopify/hydrogen';

import {Suspense} from 'react';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Button, FeaturedCollections, PageHeader, Text} from '~/components';
import {ProductSwimlane, Layout} from '~/components/index.server';

export function NotFound({response, type = 'page'}) {
  return (
    <Layout>
      <div style={{ width: '100%', height: 'calc(100vh - 120px)' }}>
        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt='' src='/imgs/404.webp' />
        <div style={{ position: 'absolute', left: '50%', bottom: 60, transform: 'translate(-50%, 0%)', textAlign: 'center'}}>
          <div className='theo-h3'>Unfortunately the page you are looking for does not exist.<br /> Fortunately you have landed on the web’s most elegant 404 page.</div>
          <a href='/' className='theo-btn mt-4'>RETURN TO HOME PAGE</a>
        </div>
      </div>
    </Layout>
  );
}

// function FeaturedSection() {
//   const {
//     language: {isoCode: languageCode},
//     country: {isoCode: countryCode},
//   } = useLocalization();
//
//   const {data} = useShopQuery({
//     query: NOT_FOUND_QUERY,
//     variables: {
//       language: languageCode,
//       country: countryCode,
//     },
//     preload: true,
//   });
//
//   const {featuredCollections, featuredProducts} = data;
//
//   return (
//     <>
//       {featuredCollections.nodes.length < 2 && (
//         <FeaturedCollections
//           title="Popular Collections"
//           data={featuredCollections.nodes}
//         />
//       )}
//       <ProductSwimlane data={featuredProducts.nodes} />
//     </>
//   );
// }
//
// const NOT_FOUND_QUERY = gql`
//   ${PRODUCT_CARD_FRAGMENT}
//   query homepage($country: CountryCode, $language: LanguageCode)
//   @inContext(country: $country, language: $language) {
//     featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
//       nodes {
//         id
//         title
//         handle
//         image {
//           altText
//           width
//           height
//           url
//         }
//       }
//     }
//     featuredProducts: products(first: 12) {
//       nodes {
//         ...ProductCard
//       }
//     }
//   }
// `;
