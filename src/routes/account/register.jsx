import {Suspense} from 'react';
import {gql} from '@shopify/hydrogen';
import {AccountCreateForm} from '~/components';
import {Layout} from '~/components/index.server';
import {getApiErrorMessage} from '~/lib/utils';

export default function Register() {
  return (
    <Layout>
      <Suspense>
        <AccountCreateForm />
      </Suspense>
    </Layout>
  );
}

export async function action({request, context}) {
  const jsonBody = await request.json();
  if (!jsonBody.email || !jsonBody.password) {
    return new Response(JSON.stringify({error: 'Email and password are required'}), {status: 400});
  }
  const {data, errors} = await context.storefront.mutate(CUSTOMER_CREATE_MUTATION, {
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
        firstName: jsonBody.firstName,
        lastName: jsonBody.lastName,
      },
    },
  });
  const errorMessage = getApiErrorMessage('customerCreate', data, errors);
  if (!errorMessage && data?.customerCreate?.customer?.id) {
    return new Response(null, {status: 200});
  } else {
    return new Response(JSON.stringify({error: errorMessage ?? 'Unknown error'}), {status: 401});
  }
}

const CUSTOMER_CREATE_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id }
      customerUserErrors { code field message }
    }
  }
`;

