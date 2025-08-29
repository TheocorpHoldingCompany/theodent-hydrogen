import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';

import {PageHeader, Section, Grid} from '~/components';
import {Layout, CollectionCard} from '~/components/index.server';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

export const meta = () => [{title: 'All Collections'}];

export async function loader({context}) {
  const {storefront} = context;
  const {language, country} = storefront.i18n;
  const data = await storefront.query(COLLECTIONS_QUERY, {
    variables: {pageBy: PAGINATION_SIZE, country, language},
    cache: {mode: 'public', maxAge: 60},
  });
  return json(data);
}

export default function Collections() {
  return (
    <Layout>
      <PageHeader heading="Collections" />
      <Section>
        <Suspense>
          <CollectionGrid />
        </Suspense>
      </Section>
    </Layout>
  );
}

function CollectionGrid() {
  const data = useLoaderData();
  const collections = data.collections.nodes;
  return (
    <Grid items={collections.length === 3 ? 3 : 2}>
      {collections.map((collection, i) => (
        <CollectionCard
          collection={collection}
          key={collection.id}
          loading={getImageLoadingPriority(i, 2)}
        />
      ))}
    </Grid>
  );
}

const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        seo { description title }
        image { id url width height altText }
      }
    }
  }
`;

