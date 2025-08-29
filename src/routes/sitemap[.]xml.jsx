import {gql, flattenConnection} from '@shopify/hydrogen';

const MAX_URLS = 250;

export async function loader({context, request}) {
  const {storefront} = context;
  const url = new URL(request.url);
  const data = await storefront.query(QUERY, {
    variables: {language: 'EN', urlLimits: MAX_URLS},
    cache: {mode: 'public', maxAge: 60 * 60 * 24},
  });

  const xml = shopSitemap(data, url.origin);

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml',
      'cache-control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function shopSitemap(data, baseUrl) {
  const productsData = flattenConnection(data.products)
    .filter((product) => product.onlineStoreUrl)
    .map((product) => {
      const url = `${baseUrl}/products/${product.handle}`;

      const finalObject = {
        url,
        lastMod: product.updatedAt,
        changeFreq: 'daily',
      };

      if (product.featuredImage?.url) {
        finalObject.image = {url: product.featuredImage.url};

        if (product.title) {
          finalObject.image.title = product.title;
        }

        if (product.featuredImage.altText) {
          finalObject.image.caption = product.featuredImage.altText;
        }
      }

      return finalObject;
    });

  const pagesData = flattenConnection(data.pages)
    .filter((page) => page.onlineStoreUrl)
    .map((page) => {
      const url = `${baseUrl}/pages/${page.handle}`;

      return {
        url,
        lastMod: page.updatedAt,
        changeFreq: 'weekly',
      };
    });

  const urlsDatas = [...productsData, ...pagesData];

  return `
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${urlsDatas.map((url) => renderUrlTag(url)).join('')}
    </urlset>`;
}

function renderUrlTag({url, lastMod, changeFreq, image}) {
  return `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastMod}</lastmod>
      <changefreq>${changeFreq}</changefreq>
      ${
        image
          ? `
        <image:image>
          <image:loc>${image.url}</image:loc>
          <image:title>${image.title ?? ''}</image:title>
          <image:caption>${image.caption ?? ''}</image:caption>
        </image:image>`
          : ''
      }

    </url>
  `;
}

const QUERY = gql`
  query sitemaps($urlLimits: Int, $language: LanguageCode)
  @inContext(language: $language) {
    products(
      first: $urlLimits
      query: "published_status:'online_store:visible'"
    ) {
      edges {
        node {
          updatedAt
          handle
          onlineStoreUrl
          title
          featuredImage {
            url
            altText
          }
        }
      }
    }
    collections(
      first: $urlLimits
      query: "published_status:'online_store:visible'"
    ) {
      edges {
        node {
          updatedAt
          handle
          onlineStoreUrl
        }
      }
    }
    pages(first: $urlLimits, query: "published_status:'published'") {
      edges {
        node {
          updatedAt
          handle
          onlineStoreUrl
        }
      }
    }
  }
`;

