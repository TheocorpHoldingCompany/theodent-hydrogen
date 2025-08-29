import {json, redirect} from '@shopify/remix-oxygen';
import {gql} from '@shopify/hydrogen';

export async function loader({context}) {
  const {shop} = await context.storefront.query(SHOP_QUERY, {cache: {mode: 'public', maxAge: 300}});
  const {url} = shop.primaryDomain;
  throw redirect(`${url}/admin`);
}

const SHOP_QUERY = gql`
  query { shop { primaryDomain { url } } }
`;

export default function AdminRedirect() {
  return null;
}

