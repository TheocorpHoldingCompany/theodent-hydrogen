import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, useLocalization} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductCard, Section} from '~/components';

const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Our Products',
  data = mockProducts,
  count = 3,
  ...props
}) {

  const productCardsMarkup = useMemo(() => {
    // If the data is already provided, there's no need to query it, so we'll just return the data
    if (typeof data === 'object') {
      return <ProductCards products={data} />;
    }

    // If the data provided is a productId, we will query the productRecommendations API.
    // To make sure we have enough products for the swimlane, we'll combine the results with our top selling products.
    if (typeof data === 'string') {
      return (
        <Suspense>
          <RecommendedProducts productId={data} count={count} />
        </Suspense>
      );
    }

    // If no data is provided, we'll go and query the top products
    // return <TopProducts count={count} />;

    return null;
  }, [count, data]);

  return (
    <section className='swimline'>
      <div className='theo-h1 d-flex justify-content-center swimline-title'>{title}</div>
      {productCardsMarkup}
    </section>
  );
}

function ProductCards({products}) {
  let filteredProducts = products?.filter((p, i) => i < 3);
  let center = filteredProducts?.length < 3;

  if (center) {
    return (
      <div className='container d-block d-md-none d-lg-block'>
        <div className='row'>
          <div className='col-0 col-md-2'>
          </div>
          {filteredProducts.map((product, key) => (
            <div className='col-12 col-md-4' key={key}>
              <ProductCard
                product={product}
                key={product.id}
                className={'snap-start w-80'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className='container d-block d-md-none d-lg-block'>
          <div className='row'>
            {filteredProducts.map((product, key) => (
              <div className='col-12 col-md-4' key={key}>
                <ProductCard
                  product={product}
                  key={product.id}
                  className={'snap-start w-80'}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='container-fluid d-none d-md-block d-lg-none'>
          <div className='row'>
            {filteredProducts.map((product, key) => (
              <div className='col-12 col-md-4' key={key}>
                <ProductCard
                  product={product}
                  key={product.id}
                  className={'snap-start w-80'}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

function RecommendedProducts({productId, count}) {
  const recosToShow = ['theodent-300', 'theodent-kids', 'theodent-classic'];

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data: products} = useShopQuery({
    query: RECOMMENDED_PRODUCTS_QUERY,
    variables: {
      count,
      productId,
      languageCode,
      countryCode,
    },
  });

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);
  const filteredProducts = mergedProducts?.filter((p) => recosToShow?.includes(p.handle));

  return <ProductCards products={filteredProducts} />;
}

function TopProducts({count}) {
  const {
    data: {products},
  } = useShopQuery({
    query: TOP_PRODUCTS_QUERY,
    variables: {
      count,
    },
  });

  return <ProductCards products={products.nodes} />;
}

const RECOMMENDED_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    recommended: productRecommendations(productId: $productId) {
      subtitle: metafield(namespace: "product", key: "subtitle") {
        value
      }
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        subtitle: metafield(namespace: "product", key: "subtitle") {
          value
        }
        ...ProductCard
      }
    }
  }
`;

const TOP_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query topProducts(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        subtitle: metafield(namespace: "product", key: "subtitle") {
          value
        }
        ...ProductCard
      }
    }
  }
`;
