import {
  CacheLong,
  flattenConnection,
  gql,
  Seo,
  useLocalization,
  useShopQuery,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';
import {Suspense} from 'react';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {PageHeader} from '~/components/sections/PageHeader.server';
import {ArticleCard, IconBar} from '~/components';
import {Layout} from '~/components/index.server';

const BLOG_HANDLE = 'news-1';

export default function Blog({pageBy = PAGINATION_SIZE, response}) {
  response.cache(CacheLong());

  return (
    <Layout>
      <Seo type="page" data={{title: 'All Journals'}} />
      <Suspense>
        <JournalsGrid pageBy={pageBy} />
      </Suspense>
    </Layout>
  );
}

function JournalsGrid({pageBy}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: BLOG_QUERY,
    variables: {
      language: languageCode,
      blogHandle: BLOG_HANDLE,
      pageBy,
    },
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: `/${BLOG_HANDLE}`,
      pageType: ShopifyAnalyticsConstants.pageType.page,
    },
  });

  // TODO: How to fix this type?
  const rawArticles = flattenConnection(data.blog.articles);

  const articles = rawArticles.map((article) => {
    const {publishedAt} = article;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${languageCode}-${countryCode}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt)),
    };
  });

  if (articles.length === 0) {
    return <p>No articles found</p>;
  }

  const sortedArticles = articles?.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
  );

  return (
    <>
      <PageHeader
        title={'The Blog'}
        imgPath={'/imgs/shopAllBanner.webp'}
        maxWidth={'100%'}
        imgContainer={false}
      />
      <div className="container mt-3 mt-md-5">
        <div className="row">
          {sortedArticles.map((article, i) => {
            return (
              <div className="col-12 col-md-6 mb-5" key={article.id}>
                <ArticleCard
                  blogHandle={'blogs'}
                  article={article}
                  key={article.id}
                  loading={getImageLoadingPriority(i, 2)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <IconBar />
    </>
  );
}

const BLOG_QUERY = gql`
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $pageBy: Int!
    $cursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articles(first: $pageBy, after: $cursor) {
        edges {
          node {
            author: authorV2 {
              name
            }
            contentHtml
            readtime: metafield(namespace: "article", key: "readtime") {
              value
            }
            handle
            id
            image {
              id
              altText
              url
              width
              height
            }
            publishedAt
            title
          }
        }
      }
    }
  }
`;
