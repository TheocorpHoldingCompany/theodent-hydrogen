import {PageHeader, Section, CartDetails} from '~/components';
import {Layout} from '~/components/index.server';

export const meta = () => [{title: 'Cart'}];

export default function Cart() {
  return (
    <Layout>
      <PageHeader heading="Your Cart" className="max-w-7xl mx-auto" />
      <Section className="max-w-7xl mx-auto">
        <CartDetails layout="page" />
      </Section>
    </Layout>
  );
}

