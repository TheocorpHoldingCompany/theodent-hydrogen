import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';
import {Button, PageHeader, Section} from '~/components';
import {NotFound, Layout} from '~/components/index.server';

export async function loader({params, context}) {
  const {handle} = params;
  const languageCode = context.storefront.i18n.language;
  const policy = {
    privacyPolicy: handle === 'privacy-policy',
    shippingPolicy: handle === 'shipping-policy',
    termsOfService: handle === 'terms-of-service',
    refundPolicy: handle === 'refund-policy',
  };
  if (!policy.privacyPolicy && !policy.shippingPolicy && !policy.termsOfService && !policy.refundPolicy) {
    return json({page: null});
  }
  const activePolicy = Object.keys(policy).find((key) => policy[key]);
  const {shop} = await context.storefront.query(POLICIES_QUERY, {variables: {languageCode, ...policy}});
  const page = shop?.[activePolicy];
  return json({page});
}

export const meta = ({data}) => {
  const page = data?.page;
  return [{title: page?.title || 'Policy'}];
};

export default function Policy() {
  const {page} = useLoaderData();
  if (!page) return <NotFound />;

  return (
    <Layout>
      <Section padding="all" display="flex" className="flex-col items-baseline w-full gap-8 md:flex-row">
        <PageHeader heading={page.title} className="grid items-start flex-grow gap-4 md:sticky top-36 md:w-5/12">
          <Button className="justify-self-start" variant="inline" to={'/policies'}>
            &larr; Back to Policies
          </Button>
        </PageHeader>
        <div className="flex-grow w-full md:w-7/12">
          <div dangerouslySetInnerHTML={{__html: page.body}} className="prose dark:prose-invert" />
        </div>
      </Section>
    </Layout>
  );
}

const POLICIES_QUERY = gql`
  fragment Policy on ShopPolicy { body handle id title url }
  query PoliciesQuery(
    $languageCode: LanguageCode
    $privacyPolicy: Boolean!
    $shippingPolicy: Boolean!
    $termsOfService: Boolean!
    $refundPolicy: Boolean!
  ) @inContext(language: $languageCode) {
    shop {
      privacyPolicy @include(if: $privacyPolicy) { ...Policy }
      shippingPolicy @include(if: $shippingPolicy) { ...Policy }
      termsOfService @include(if: $termsOfService) { ...Policy }
      refundPolicy @include(if: $refundPolicy) { ...Policy }
    }
  }
`;

