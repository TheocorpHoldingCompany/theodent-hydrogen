import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql, flattenConnection} from '@shopify/hydrogen';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {PageHeader} from '~/components/sections/PageHeader.server';
import {ArticleCard, IconBar} from '~/components';
import {Layout} from '~/components/index.server';

const BLOG_HANDLE = 'news-1';

export const meta = () => [{title: 'All Journals'}];

export async function loader({context}) {
  const {language, country} = context.storefront.i18n;
  const data = await context.storefront.query(BLOG_QUERY, {
    variables: {language, blogHandle: BLOG_HANDLE, pageBy: PAGINATION_SIZE},
  });
  return json({data, language, country});
}

export default function Blog() {
  return (
    <Layout>
      <Suspense>
        <JournalsGrid />
      </Suspense>
    </Layout>
  );
}

function JournalsGrid() {
  const {data, language, country} = useLoaderData();
  const rawArticles = flattenConnection(data.blog.articles);
  const articles = rawArticles.map((article) => {
    const {publishedAt} = article;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt)),
    };
  });

  if (articles.length === 0) {
    return <p>No articles found</p>;
  }

  const sortedArticles = articles?.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <>
      <PageHeader title={'The Blog'} imgPath={'/imgs/shopAllBanner.webp'} maxWidth={'100%'} imgContainer={false} />
      <div className="container mt-3 mt-md-5">
        <div className="row">
          {sortedArticles.map((article, i) => (
            <div className="col-12 col-md-6 mb-5" key={article.id}>
              <ArticleCard blogHandle={'blogs'} article={article} key={article.id} loading={getImageLoadingPriority(i, 2)} />
            </div>
          ))}
        </div>
      </div>
      <IconBar />
    </>
  );
}

const BLOG_QUERY = gql`
  query Blog($language: LanguageCode, $blogHandle: String!, $pageBy: Int!, $cursor: String) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articles(first: $pageBy, after: $cursor) {
        edges {
          node {
            author: authorV2 { name }
            contentHtml
            readtime: metafield(namespace: "article", key: "readtime") { value }
            handle
            id
            image { id altText url width height }
            publishedAt
            title
          }
        }
      }
    }
  }
`;

