/* eslint-disable hydrogen/prefer-image-component */
import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
  Head,
} from '@shopify/hydrogen';
import {Link} from '@shopify/hydrogen';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Hero, IconBar} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';
import {FeaturedBlogs} from '~/components/sections/FeaturedBlogs';
import Compare from '~/components/Compare';
import VideoSection from '~/components/LandingVideo.client';
import {FDAAnnouncementPopup} from '~/components/FDAAnnouncementPopup.client';

export default function Homepage() {
  useServerAnalytics({
    shopify: {
      canonicalPath: '/',
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout>
      <Suspense>
        <SeoForHomepage />
        <Head>
          <meta
            property="og:image"
            content="http://shoptheodent.com/imgs/landingOG.png"
          />
          <meta property="og:image:height" content="600" />
          <meta property="og:image:width" content="400" />
        </Head>
      </Suspense>
      <HomepageContent />
      <FDAAnnouncementPopup />
    </Layout>
  );
}

function HomepageContent() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: HOMEPAGE_CONTENT_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

  const {featuredProducts} = data;

  return (
    <>
      <Hero />
      <VideoSection />
      <ProductSwimlane
        data={featuredProducts.nodes}
        title="Featured Products"
        divider="bottom"
      />

      <div style={{overflowX: 'hidden'}}>
        <div className="row" style={{paddingTop: 90, color: '#2A1B16'}}>
          <div className="col-12 col-md-6 pe-lg-0">
            <img
              alt=""
              src="/imgs/greenHome1.png"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 660,
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="col-12 col-md-6 p-4 p-md-0 d-flex justify-content-center align-items-center">
            <div className="banner-content">
              <div className="theo-h1 theo-info-h1">
                What Makes Theodent the #1 Alternative to Fluoride?
              </div>
              <div className="theo-h3 mt-3 mb-4">
                Theodent is a landmark breakthrough in oral care. Our patented
                technology, Rennou™, harnesses the power of cacao to deliver
                top-tier protection without the toxicity. Simply, Theodent is a
                safer AND more effective option than fluoride-based toothpastes.
              </div>
              <Link to={`/pages/technology`} style={{textDecoration: 'none'}}>
                <div className="theo-btn">Learn More About the Technology</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="row" style={{paddingTop: 90}}>
          <div className="col-12 d-md-none">
            <img
              alt=""
              src="/imgs/greenHome2.webp"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 660,
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="col-12 col-md-6 p-4 p-md-0 d-flex flex-col justify-content-center align-items-center">
            <div className="banner-content text-md-end">
              <div className="theo-h1 theo-info-h1">
                Committed to Premium Ingredients
              </div>
              <div className="theo-h3 mt-3 mb-4">
                At Theodent, we are committed to using only the best ingredients
                in our toothpaste. We carefully select each ingredient and
                subject them to a rigorous quality control process to ensure
                that our toothpaste is of the highest quality. This dedication
                to premium ingredients allows us to provide our customers with a
                superior oral care experience.
              </div>
              <Link to={`/pages/ingredients`} style={{textDecoration: 'none'}}>
                <div className="theo-btn">Learn More About Our Ingredients</div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-6 d-none d-md-block ps-lg-0">
            <img
              alt=""
              src="/imgs/greenHome2.webp"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: 660,
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        <div className="row" style={{paddingTop: 90}}>
          <div className="col-12 col-md-6 pe-lg-0">
            <img
              alt=""
              src="/imgs/greenHome3.webp"
              style={{width: '100%', objectFit: 'contain'}}
            />
          </div>
          <div className="col-12 col-md-6 p-4 p-md-0 d-flex justify-content-center align-items-center">
            <div className="banner-content">
              <div className="theo-h1 theo-info-h1">Store Locator</div>
              <div className="theo-h3 mt-3 mb-4">
                Our official distributors around the world are stocked with
                Theodent and ready to assist all of your oral-health needs.
              </div>
              <Link to={`/pages/find-us`} style={{textDecoration: 'none'}}>
                <div className="theo-btn">Find a nearby store</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Compare />
      <FeaturedBlogs />
      <IconBar />
    </>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: name,
        description,
        titleTemplate: '%s',
      }}
    />
  );
}

/**
 * The homepage content query includes a request for custom metafields inside the alias
 * `heroBanners`. The template loads placeholder content if these metafields don't
 * exist. Define the following five custom metafields on your Shopify store to override placeholders:
 * - hero.title             Single line text
 * - hero.byline            Single line text
 * - hero.cta               Single line text
 * - hero.spread            File
 * - hero.spread_secondary  File
 *
 * @see https://help.shopify.com/manual/metafields/metafield-definitions/creating-custom-metafield-definitions
 * @see https://github.com/Shopify/hydrogen/discussions/1790
 */

const HOMEPAGE_CONTENT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    heroBanners: collections(
      first: 3
      query: "collection_type:custom"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        handle
        title
        descriptionHtml
        heading: metafield(namespace: "hero", key: "title") {
          value
        }
        byline: metafield(namespace: "hero", key: "byline") {
          value
        }
        cta: metafield(namespace: "hero", key: "cta") {
          value
        }
        spread: metafield(namespace: "hero", key: "spread") {
          reference {
            ...Media
          }
        }
        spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
          reference {
            ...Media
          }
        }
      }
    }
    featuredCollections: collections(
      first: 3
      query: "collection_type:smart"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        subtitle: metafield(namespace: "product", key: "subtitle") {
          value
        }
        ...ProductCard
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = gql`
  query store {
    shop {
      name
      description
    }
  }
`;