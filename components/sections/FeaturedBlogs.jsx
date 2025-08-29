import {Suspense} from 'react';
import {
  gql,
  useLocalization,
  useShopQuery,
  flattenConnection,
} from '@shopify/hydrogen';

import {ArticleCard} from '~/components';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';

const BLOG_HANDLE = 'news-1';

export function FeaturedBlogs({pageBy = PAGINATION_SIZE, response}) {
  return (
    <Suspense>
      <JournalsGrid pageBy={pageBy} />
    </Suspense>
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

  // // TODO: How to fix this type?
  const rawArticles = flattenConnection(data?.blog?.articles) || [];

  const articles = rawArticles
    ?.map((article) => {
      const {publishedAt} = article;
      return {
        ...article,
        publishedAt: new Intl.DateTimeFormat(`${languageCode}-${countryCode}`, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(publishedAt)),
      };
    })
    ?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    ?.filter((blog, index) => index < 2);

  if (articles.length === 0) {
    return null;
  }
console.log('rawArticles', rawArticles?.map(a => a.title));
  return (
    <div className="swimline">
      <div className="theo-h1 d-flex justify-content-center swimline-title">
        News
      </div>
      <div className="container">
        <div className="row">
          {articles?.map((article, i) => {
            return (
              <div className="col-12 col-md-6 mt-4 mt-md-0" key={article.id}>
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
    </div>
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

// metafields(first:10){
//   edges {
//     node {
//       key
//       value
//     }
//   }
// }
