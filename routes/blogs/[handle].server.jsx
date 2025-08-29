import {
  useLocalization,
  useShopQuery,
  Seo,
  gql,
  Link,
  Head,
  Image,
  CacheLong,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {PageHeader} from '~/components/sections/PageHeader.server';
import {CustomFont, Section, IconBar} from '~/components';
import {Layout, NotFound} from '~/components/index.server';
import {ATTR_LOADING_EAGER} from '~/lib/const';
import {Share} from '~/components/sections';
import {FbIcon} from '~/assets/fbIcon';
import {format} from 'date-fns';

const BLOG_HANDLE = 'news-1';

export default function Post({params, response}) {
  response.cache(CacheLong());
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {handle} = params;
  const {data} = useShopQuery({
    query: ARTICLE_QUERY,
    variables: {
      language: languageCode,
      blogHandle: BLOG_HANDLE,
      articleHandle: handle,
    },
  });

  useServerAnalytics({
    shopify: {
      canonicalPath: `/blogs/${handle}`,
      pageType: ShopifyAnalyticsConstants.pageType.article,
    },
  });

  if (!data?.blog?.articleByHandle) {
    return <NotFound />;
  }

  const {title, publishedAt, contentHtml, author, excerpt, readtime} =
    data.blog.articleByHandle;
  const formattedDate = new Intl.DateTimeFormat(
    `${languageCode}-${countryCode}`,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  ).format(new Date(publishedAt));

  const seoImage = data?.blog?.articleByHandle?.image;
  const notSecure = seoImage?.url?.replace('https', 'http');

  return (
    <Layout>
      <CustomFont />
      <Suspense>
        <Seo type="page" data={data.blog.articleByHandle} />
        <Head>
          <meta property="og:image:height" content={seoImage?.height} />
          <meta property="og:image:width" content={seoImage?.width} />
          <meta property="og:image" content={seoImage?.url} />
        </Head>
      </Suspense>
      <PageHeader
        title={title}
        imgPath={data?.blog?.articleByHandle?.image?.url}
        isBlog={true}
      />
      <div className="container d-flex justify-content-center">
        <div style={{maxWidth: 920}}>
          <div
            style={{fontWeight: 600, fontSize: 18}}
            className="theo-h3 mt-4 mb-1"
          >
            {excerpt}
          </div>
          <span
            className="block acumin-semibold"
            style={{
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#C9AA77',
            }}
          >
            {formattedDate}
          </span>
          <div className="row pt-3">
            <div className="col-12 col-md-6">
              <div className="pages-pre-header">Share this article</div>
              <Share handle={handle} body={data?.blog} />
              <div
                style={{width: 300, height: 2, background: '#CC8A52'}}
                className="mb-4"
              />
            </div>
          </div>

          <div
            style={{color: 'black', textAlign: 'left'}}
            dangerouslySetInnerHTML={{__html: contentHtml}}
            className="blog"
          />
          <div className="row mt-5 pt-3">
            <div className="col-12 col-md-6">
              <div className="pages-pre-header">
                Ready to boost your health now?
              </div>
              <Link to={`/products`} style={{textDecoration: 'none'}}>
                <div className="theo-btn mt-3 mb-4">SHOP FOR THEODENT</div>
              </Link>
              <div style={{width: '100%', height: 2, background: '#CC8A52'}} />
            </div>
          </div>
          <IconBar border={false} />
        </div>
      </div>
    </Layout>
  );
}
// <PageHeader heading={title} variant="blogPost">
//
//     {formattedDate} &middot; {author.name}
//   </span>
// </PageHeader>
const ARTICLE_QUERY = gql`
  query ArticleDetails(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        excerpt
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
      }
    }
  }
`;
