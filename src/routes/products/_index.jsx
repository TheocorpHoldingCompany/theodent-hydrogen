import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PAGINATION_SIZE} from '~/lib/const';
import {ProductGrid, Section, IconBar} from '~/components';
import {Layout} from '~/components/index.server';
import {PageHeader} from '~/components/sections/PageHeader.server';

export const meta = () => [
  {title: 'All Products'},
  {property: 'og:image:secure_url', content: 'https://shoptheodent.com/imgs/shopAllOG.png'},
  {property: 'og:image', content: 'http://shoptheodent.com/imgs/shopAllOG.png'},
  {property: 'og:image:height', content: '600'},
  {property: 'og:image:width', content: '400'},
];

export async function loader({context}) {
  const {storefront} = context;
  const {language, country} = storefront.i18n;
  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {country, language, pageBy: PAGINATION_SIZE},
    cache: {mode: 'public', maxAge: 60},
  });
  return json(data);
}

export async function action({request, context}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {status: 405, headers: {Allow: 'POST'}});
  }
  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const data = await context.storefront.query(PAGINATE_ALL_PRODUCTS_QUERY, {
    variables: {cursor, pageBy: PAGINATION_SIZE, country},
  });
  return json(data);
}

export default function AllProducts() {
  return (
    <Layout>
      <Suspense>
        <AllProductsGrid />
        <IconBar />
      </Suspense>
    </Layout>
  );
}

function AllProductsGrid() {
  const data = useLoaderData();
  const products = data.products;
  const country = data?.context?.i18n?.country || undefined;
  return (
    <>
      <PageHeader title={'Shop All Products'} imgPath={'/imgs/shopAllBanner.webp'} maxWidth={'100%'} imgContainer={false} />
      <div className='container mt-3 mt-md-5'>
        <div className='container'>
          <ProductGrid key="products" url={`/products${country ? `?country=${country}` : ''}`} collection={{products}} all={true} />
        </div>
      </div>
    </>
  );
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
        subtitle: metafield(namespace: "product", key: "subtitle") { value }
        ...ProductCard
      }
      pageInfo { hasNextPage startCursor endCursor }
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
        subtitle: metafield(namespace: "product", key: "subtitle") { value }
        ...ProductCard
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

