import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {Hero, IconBar} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';
import {FeaturedBlogs} from '~/components/sections/FeaturedBlogs';
import Compare from '~/components/Compare';
import VideoSection from '~/components/LandingVideo.client';
import {FDAAnnouncementPopup} from '~/components/FDAAnnouncementPopup.client';

export const meta = ({data}) => {
  const name = data?.seo?.shop?.name ?? 'Theodent';
  const description = data?.seo?.shop?.description ?? '';
  return [
    {title: name},
    {name: 'description', content: description},
    {property: 'og:image', content: 'http://shoptheodent.com/imgs/landingOG.png'},
    {property: 'og:image:height', content: '600'},
    {property: 'og:image:width', content: '400'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const {language, country} = storefront.i18n;

  const [homepage, seo] = await Promise.all([
    storefront.query(HOMEPAGE_CONTENT_QUERY, {
      variables: {language, country},
      cache: {mode: 'public', maxAge: 60},
    }),
    storefront.query(HOMEPAGE_SEO_QUERY, {
      cache: {mode: 'public', maxAge: 60},
    }),
  ]);

  return json({homepage, seo});
}

export default function Homepage() {
  const {homepage} = useLoaderData();

  return (
    <Layout>
      <Suspense>
        {/* JSON-LD structured data preserved */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Theodent',
            url: 'https://shoptheodent.com',
            logo: 'https://shoptheodent.com/imgs/theodent-logo.png',
            description:
              "Theodent creates fluoride-free toothpaste using patented Rennou® technology with cacao to safely remineralize tooth enamel. The safer, effective alternative to fluoride.",
            foundingDate: '2012',
            slogan: 'The smarter fluoride alternative',
            sameAs: [
              'https://www.facebook.com/theodenttoothpaste',
              'https://www.instagram.com/theodenttoothpaste',
            ],
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: 'https://shoptheodent.com',
            name: 'Theodent - Fluoride Alternative Toothpaste',
            description:
              "Shop Theodent's patented fluoride-free toothpaste with Rennou® technology. Safely remineralizes enamel using cacao. The effective fluoride alternative.",
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://shoptheodent.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }} />
      </Suspense>
      <HomepageContent homepage={homepage} />
      <FDAAnnouncementPopup />
    </Layout>
  );
}

function HomepageContent({homepage}) {
  const {featuredProducts} = homepage;

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
              alt="Theodent fluoride-free toothpaste with Rennou technology for safe enamel remineralization"
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
                What Makes Theodent the #1 Fluoride Alternative?
              </div>
              <div className="theo-h3 mt-3 mb-4">
                Theodent is a breakthrough in fluoride-free oral care. Our patented
                Rennou™ technology harnesses cacao to remineralize tooth enamel
                safely and effectively. Unlike fluoride toothpaste, Theodent is
                safe if swallowed while delivering superior enamel protection.
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
              alt="Premium ingredients in Theodent cacao-based fluoride alternative toothpaste"
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
              alt="Premium ingredients in Theodent cacao-based fluoride alternative toothpaste"
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
              alt="Find Theodent fluoride-free toothpaste at stores worldwide - safe enamel remineralization"
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

