import {gql} from '@shopify/hydrogen';
import {getApiErrorMessage} from '~/lib/utils';

export async function action({request, context}) {
  const jsonBody = await request.json();
  if (!jsonBody.id || !jsonBody.password || !jsonBody.resetToken) {
    return new Response(JSON.stringify({error: 'Incorrect password or reset token.'}), {status: 400});
  }
  const {data, errors} = await context.storefront.mutate(CUSTOMER_RESET_MUTATION, {
    variables: {id: `gid://shopify/Customer/${jsonBody.id}`, input: {password: jsonBody.password, resetToken: jsonBody.resetToken}},
  });
  if (data?.customerReset?.customerAccessToken?.accessToken) {
    await context.session.set('customerAccessToken', data.customerReset.customerAccessToken.accessToken);
    return new Response(null, {status: 200});
  } else {
    return new Response(JSON.stringify({error: getApiErrorMessage('customerReset', data, errors)}), {status: 401});
  }
}

const CUSTOMER_RESET_MUTATION = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code field message }
    }
  }
`;

export default function AccountResetApi() { return null; }

