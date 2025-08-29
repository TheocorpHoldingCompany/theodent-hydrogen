import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';
import {AccountLoginForm} from '~/components';
import {Layout} from '~/components/index.server';

export async function loader({context}) {
  const {shop} = await context.storefront.query(SHOP_QUERY, {cache: {mode: 'public', maxAge: 300}});
  return json({name: shop.name});
}

export async function action({request, context}) {
  const jsonBody = await request.json();
  if (!jsonBody.email || !jsonBody.password) {
    return new Response(JSON.stringify({error: 'Incorrect email or password.'}), {status: 400});
  }
  const {data, errors} = await context.storefront.mutate(LOGIN_MUTATION, {
    variables: {input: {email: jsonBody.email, password: jsonBody.password}},
  });
  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    await context.session.set('customerAccessToken', data.customerAccessTokenCreate.customerAccessToken.accessToken);
    return new Response(null, {status: 200});
  } else {
    return new Response(
      JSON.stringify({error: data?.customerAccessTokenCreate?.customerUserErrors ?? errors}),
      {status: 401},
    );
  }
}

export default function Login() {
  const {name} = useLoaderData();
  return (
    <Layout>
      <Suspense>
        <AccountLoginForm shopName={name} />
      </Suspense>
    </Layout>
  );
}

const SHOP_QUERY = gql`
  query shopInfo { shop { name } }
`;

const LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors { code field message }
      customerAccessToken { accessToken expiresAt }
    }
  }
`;
