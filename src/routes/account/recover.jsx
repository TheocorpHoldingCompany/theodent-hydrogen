import {Suspense} from 'react';
import {gql} from '@shopify/hydrogen';
import {AccountRecoverForm} from '~/components';
import {Layout} from '~/components/index.server';

export default function AccountRecover() {
  return (
    <Layout>
      <Suspense>
        <AccountRecoverForm />
      </Suspense>
    </Layout>
  );
}

export async function action({request, context}) {
  const jsonBody = await request.json();
  if (!jsonBody.email) {
    return new Response(JSON.stringify({error: 'Email required'}), {status: 400});
  }
  await context.storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
    variables: {email: jsonBody.email},
  });
  return new Response(null, {status: 200});
}

const CUSTOMER_RECOVER_MUTATION = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) { customerUserErrors { code field message } }
  }
`;

