import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PageHeader, ProductGrid, Section, Text} from '~/components';
import {NotFound, Layout} from '~/components/index.server';

const pageBy = 48;

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const {language, country} = storefront.i18n;
  const data = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, language, country, pageBy},
    cache: {mode: 'public', maxAge: 60},
  });
  return json(data);
}

export async function action({request, params, context}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {status: 405, headers: {Allow: 'POST'}});
  }
  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const {handle} = params;
  const data = await context.storefront.query(PAGINATE_COLLECTION_QUERY, {
    variables: {handle, cursor, pageBy, country},
  });
  return json(data);
}

export const meta = ({data}) => {
  const collection = data?.collection;
  const title = collection?.seo?.title || collection?.title || 'Collection';
  const description = collection?.seo?.description || '';
  return [
    {title},
    {name: 'description', content: description},
  ];
};

export default function Collection() {
  const {collection} = useLoaderData();
  if (!collection) {
    return <NotFound type="collection" />;
  }

  return (
    <Layout>
      <Suspense />
      <PageHeader heading={collection.title}>
        {collection?.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <Text format width="narrow" as="p" className="inline-block">
                {collection.description}
              </Text>
            </div>
          </div>
        )}
      </PageHeader>
      <Section>
        <ProductGrid
          key={collection.id}
          collection={collection}
          url={`/collections/${collection.handle}`}
        />
      </Section>
    </Layout>
  );
}

const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      seo { description title }
      image { id url width height altText }
      products(first: $pageBy, after: $cursor) {
        nodes { ...ProductCard }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

const PAGINATE_COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionPage(
    $handle: String!
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      products(first: $pageBy, after: $cursor) {
        nodes { ...ProductCard }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

