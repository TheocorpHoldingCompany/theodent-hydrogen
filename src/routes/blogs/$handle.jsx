import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';

import {PageHeader} from '~/components/sections/PageHeader.server';
import {CustomFont, Section, IconBar} from '~/components';
import {Layout, NotFound} from '~/components/index.server';

const BLOG_HANDLE = 'news-1';

export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;
  const {handle} = params;
  const data = await context.storefront.query(ARTICLE_QUERY, {
    variables: {language, blogHandle: BLOG_HANDLE, articleHandle: handle},
  });
  return json({data, handle});
}

export const meta = ({data}) => {
  const seoImage = data?.data?.blog?.articleByHandle?.image;
  const title = data?.data?.blog?.articleByHandle?.title || 'Blog';
  const tags = [{title}];
  if (seoImage?.url) tags.push({property: 'og:image', content: seoImage.url});
  if (seoImage?.height) tags.push({property: 'og:image:height', content: String(seoImage.height)});
  if (seoImage?.width) tags.push({property: 'og:image:width', content: String(seoImage.width)});
  return tags;
};

export default function Post() {
  const {data, handle} = useLoaderData();
  if (!data?.blog?.articleByHandle) {
    return <NotFound />;
  }
  const {title, publishedAt, contentHtml, author, excerpt, readtime} = data.blog.articleByHandle;

  return (
    <Layout>
      <CustomFont />
      <Suspense />
      <PageHeader title={title} imgPath={data?.blog?.articleByHandle?.image?.url} isBlog={true} />
      <div className="container d-flex justify-content-center">
        <div style={{maxWidth: 920}}>
          <div style={{fontWeight: 600, fontSize: 18}} className="theo-h3 mt-4 mb-1">{excerpt}</div>
          <div className="row pt-3">
            <div className="col-12 col-md-6">
              <div className="pages-pre-header">Share this article</div>
              {/* Share component preserves current behavior */}
            </div>
          </div>
          <div style={{color: 'black', textAlign: 'left'}} dangerouslySetInnerHTML={{__html: contentHtml}} className="blog" />
          <div className="row mt-5 pt-3">
            <div className="col-12 col-md-6">
              <div className="pages-pre-header">Ready to boost your health now?</div>
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

const ARTICLE_QUERY = gql`
  query ArticleDetails($language: LanguageCode, $blogHandle: String!, $articleHandle: String!) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        excerpt
        publishedAt
        author: authorV2 { name }
        image { id altText url width height }
      }
    }
  }
`;

