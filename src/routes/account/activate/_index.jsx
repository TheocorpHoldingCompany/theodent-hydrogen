import {gql} from '@shopify/hydrogen';
import {getApiErrorMessage} from '~/lib/utils';

export async function action({request, context}) {
  const jsonBody = await request.json();
  if (!jsonBody?.id || !jsonBody?.password || !jsonBody?.activationToken) {
    return new Response(JSON.stringify({error: 'Incorrect password or activation token.'}), {status: 400});
  }
  const {data, errors} = await context.storefront.mutate(CUSTOMER_ACTIVATE_MUTATION, {
    variables: {id: `gid://shopify/Customer/${jsonBody.id}`, input: {password: jsonBody.password, activationToken: jsonBody.activationToken}},
  });
  if (data?.customerActivate?.customerAccessToken?.accessToken) {
    await context.session.set('customerAccessToken', data.customerActivate.customerAccessToken.accessToken);
    return new Response(null, {status: 200});
  } else {
    return new Response(JSON.stringify({error: getApiErrorMessage('customerActivate', data, errors)}), {status: 401});
  }
}

const CUSTOMER_ACTIVATE_MUTATION = gql`
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

export default function AccountActivateApi() { return null; }

