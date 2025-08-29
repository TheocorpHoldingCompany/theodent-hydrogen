import {json} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';

import {PageHeader, Section, Heading} from '~/components';
import {Layout, NotFound} from '~/components/index.server';

export const meta = () => [{title: 'Policies'}];

export async function loader({context}) {
  const {shop} = await context.storefront.query(POLICIES_QUERY);
  return json(shop);
}

export default function Policies() {
  const {privacyPolicy, shippingPolicy, termsOfService, refundPolicy, subscriptionPolicy} = useLoaderData();
  const policies = [privacyPolicy, shippingPolicy, termsOfService, refundPolicy, subscriptionPolicy];

  if (policies.every((element) => element === null)) {
    return <NotFound type="page" />;
  }

  return (
    <Layout>
      <PageHeader heading="Policies" />
      <Section padding="x" className="mb-24">
        {policies.map((policy) => {
          if (!policy) return null;
          return (
            <Heading className="font-normal text-heading" key={policy.id}>
              <Link to={`/policies/${policy.handle}`}>{policy.title}</Link>
            </Heading>
          );
        })}
      </Section>
    </Layout>
  );
}

const POLICIES_QUERY = gql`
  fragment Policy on ShopPolicy { id title handle }
  query PoliciesQuery {
    shop {
      privacyPolicy { ...Policy }
      shippingPolicy { ...Policy }
      termsOfService { ...Policy }
      refundPolicy { ...Policy }
      subscriptionPolicy { id title handle }
    }
  }
`;

