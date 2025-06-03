import {Suspense} from 'react';
import {useShopQuery, gql, useLocalization, Seo, Head} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PAGINATION_SIZE} from '~/lib/const';
import {ProductGrid, Section, IconBar} from '~/components';
import {Layout} from '~/components/index.server';
import {PageHeader} from '~/components/sections/PageHeader.server';

export default function AllProducts() {
  return (
    <Layout>
      <Seo type="page" data={{ title: 'All Products' }} />
      <Head>
        <meta property="og:image:secure_url" content='https://shoptheodent.com/imgs/shopAllOG.png' />
        <meta property="og:image" content='http://shoptheodent.com/imgs/shopAllOG.png' />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:width" content="400" />
      </Head>
      <Suspense>
        <AllProductsGrid />
        <IconBar />
      </Suspense>
    </Layout>
  );
}

function AllProductsGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const { data } = useShopQuery({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      pageBy: PAGINATION_SIZE,
    },
    preload: true,
  });

  const products = data.products;

  return (
    <>
      <PageHeader title={'Shop All Products'} imgPath={'/imgs/shopAllBanner.webp'} maxWidth={'100%'} imgContainer={false} />
      <div className='container mt-3 mt-md-5'>
        <div className='container'>
          <ProductGrid
            key="products"
            url={`/products?country=${countryCode}`}
            collection={{products}}
            all={true}
          />
        </div>
      </div>
    </>
  );
}

// API to paginate products
// @see templates/demo-store/src/components/product/ProductGrid.client.tsx
export async function api(request, {params, queryShop}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {Allow: 'POST'},
    });
  }

  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const {handle} = params;

  return await queryShop({
    query: PAGINATE_ALL_PRODUCTS_QUERY,
    variables: {
      handle,
      cursor,
      pageBy: PAGINATION_SIZE,
      country,
    },
  });
}

const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor) {
      nodes {
        subtitle: metafield(namespace: "product", key: "subtitle") {
          value
        }
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const PAGINATE_ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage(
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor) {
      nodes {
        subtitle: metafield(namespace: "product", key: "subtitle") {
          value
        }
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
