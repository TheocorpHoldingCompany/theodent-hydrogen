import {Suspense} from 'react';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {flattenConnection, gql} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getApiErrorMessage} from '~/lib/utils';
import {AccountAddressBook, AccountDetails, AccountOrderHistory, FeaturedCollections, LogoutButton, PageHeader} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';

export async function loader({context}) {
  const {session, storefront} = context;
  const token = await session.get('customerAccessToken');
  if (!token) throw redirect('/account/login');
  const {language, country} = storefront.i18n;
  const data = await storefront.query(CUSTOMER_QUERY, {
    variables: {customerAccessToken: token, language, country},
    cache: {mode: 'no-store'},
  });
  const {customer} = data;
  if (!customer) throw redirect('/account/login');
  const addresses = flattenConnection(customer.addresses).map((address) => ({
    ...address,
    id: address.id.substring(0, address.id.lastIndexOf('?')),
    originalId: address.id,
  }));
  const defaultAddress = customer?.defaultAddress?.id?.substring(0, customer.defaultAddress.id.lastIndexOf('?'));
  return json({data, addresses, defaultAddress});
}

export async function action({request, context}) {
  const {session, storefront} = context;
  const token = await session.get('customerAccessToken');
  if (!token) return new Response(null, {status: 401});

  if (request.method !== 'PATCH' && request.method !== 'DELETE') {
    return new Response(null, {status: 405, headers: {Allow: 'PATCH,DELETE'}});
  }
  const {email, phone, firstName, lastName, newPassword} = await request.json();
  const customer = {};
  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  if (firstName) customer.firstName = firstName;
  if (lastName) customer.lastName = lastName;
  if (newPassword) customer.password = newPassword;

  const {data, errors} = await storefront.mutate(CUSTOMER_UPDATE_MUTATION, {
    variables: {customer, customerAccessToken: token},
  });
  const error = getApiErrorMessage('customerUpdate', data, errors);
  if (error) return new Response(JSON.stringify({error}), {status: 400});
  return new Response(null);
}

export default function Account() {
  const {data, addresses, defaultAddress} = useLoaderData();
  const {customer, featuredCollections, featuredProducts} = data;
  const orders = flattenConnection(customer?.orders) || [];
  const heading = customer ? (customer.firstName ? `Welcome, ${customer.firstName}.` : `Welcome to your account.`) : 'Account Details';

  return (
    <Layout>
      <Suspense />
      <PageHeader heading={heading}>
        <LogoutButton>Sign out</LogoutButton>
      </PageHeader>
      {orders && <AccountOrderHistory orders={orders} />}
      <AccountDetails firstName={customer.firstName} lastName={customer.lastName} phone={customer.phone} email={customer.email} />
      <AccountAddressBook defaultAddress={defaultAddress} addresses={addresses} />
      {!orders && (
        <>
          <FeaturedCollections title="Popular Collections" data={flattenConnection(featuredCollections)} />
          <ProductSwimlane data={flattenConnection(featuredProducts)} />
        </>
      )}
    </Layout>
  );
}

const CUSTOMER_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CustomerDetails($customerAccessToken: String!, $country: CountryCode, $language: LanguageCode) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      defaultAddress { id formatted }
      addresses(first: 6) { edges { node { id formatted firstName lastName company address1 address2 country province city zip phone } } }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) { edges { node { id orderNumber processedAt financialStatus fulfillmentStatus currentTotalPrice { amount currencyCode } lineItems(first: 2) { edges { node { variant { image { url altText height width } } title } } } } } }
    }
    featuredProducts: products(first: 12) { nodes { ...ProductCard } }
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) { nodes { id title handle image { altText width height url } } }
  }
`;

const CUSTOMER_UPDATE_MUTATION = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customerUserErrors { code field message }
    }
  }
`;

