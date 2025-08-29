import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductGrid, Section, Text} from '~/components';
import {NoResultRecommendations, SearchPage} from '~/components/index.server';
import {PAGINATION_SIZE} from '~/lib/const';
import {Suspense} from 'react';

export const meta = () => [{title: 'Search'}];

export async function loader({context, request}) {
  const {storefront} = context;
  const {language, country} = storefront.i18n;
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  const data = await storefront.query(SEARCH_QUERY, {
    variables: {country, language, pageBy: PAGINATION_SIZE, searchTerm},
    cache: {mode: 'public', maxAge: 30},
  });
  return json({products: data.products, searchTerm, i18n: storefront.i18n});
}

export async function action({request, context}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {status: 405, headers: {Allow: 'POST'}});
  }
  const url = new URL(request.url);
  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const searchTerm = url.searchParams.get('q');
  const data = await context.storefront.query(PAGINATE_SEARCH_QUERY, {
    variables: {cursor, pageBy: PAGINATION_SIZE, country, searchTerm},
  });
  return json(data);
}

export default function Search() {
  const {products, searchTerm, i18n} = useLoaderData();
  const countryCode = i18n?.country;
  const noResults = products?.nodes?.length === 0;

  if (!searchTerm || noResults) {
    return (
      <SearchPage searchTerm={searchTerm ? decodeURI(searchTerm) : null}>
        {noResults && (
          <Section padding="x">
            <Text className="opacity-50">No results, try something else.</Text>
          </Section>
        )}
        <Suspense>
          <NoResultRecommendations country={countryCode} language={i18n?.language} />
        </Suspense>
      </SearchPage>
    );
  }

  return (
    <SearchPage searchTerm={decodeURI(searchTerm)}>
      <Section>
        <ProductGrid
          key="search"
          url={`/search?country=${countryCode}&q=${searchTerm}`}
          collection={{products}}
        />
      </Section>
    </SearchPage>
  );
}

const SEARCH_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query search(
    $searchTerm: String
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $after: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, sortKey: RELEVANCE, query: $searchTerm, after: $after) {
      nodes { ...ProductCard }
      pageInfo { startCursor endCursor hasNextPage hasPreviousPage }
    }
  }
`;

const PAGINATE_SEARCH_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage(
    $searchTerm: String
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(sortKey: RELEVANCE, query: $searchTerm, first: $pageBy, after: $cursor) {
      nodes { ...ProductCard }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

