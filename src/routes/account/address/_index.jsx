import {gql} from '@shopify/hydrogen';
import {getApiErrorMessage} from '~/lib/utils';

export async function action({request, context}) {
  if (request.method !== 'POST') {
    return new Response(null, {status: 405, headers: {Allow: 'POST'}});
  }
  const token = await context.session.get('customerAccessToken');
  if (!token) return new Response(null, {status: 401});
  const {firstName, lastName, company, address1, address2, country, province, city, zip, phone, isDefaultAddress} = await request.json();
  const address = {};
  if (firstName) address.firstName = firstName;
  if (lastName) address.lastName = lastName;
  if (company) address.company = company;
  if (address1) address.address1 = address1;
  if (address2) address.address2 = address2;
  if (country) address.country = country;
  if (province) address.province = province;
  if (city) address.city = city;
  if (zip) address.zip = zip;
  if (phone) address.phone = phone;

  const {data, errors} = await context.storefront.mutate(CREATE_ADDRESS_MUTATION, {
    variables: {address, customerAccessToken: token},
  });
  const error = getApiErrorMessage('customerAddressCreate', data, errors);
  if (error) return new Response(JSON.stringify({error}), {status: 400});

  if (isDefaultAddress) {
    const resp = await setDefaultAddress(context.storefront, data.customerAddressCreate.customerAddress.id, token);
    const setErr = getApiErrorMessage('customerDefaultAddressUpdate', resp.data, resp.errors);
    if (setErr) return new Response(JSON.stringify({error: setErr}), {status: 400});
  }
  return new Response(null);
}

export function setDefaultAddress(storefront, addressId, customerAccessToken) {
  return storefront.mutate(UPDATE_DEFAULT_ADDRESS_MUTATION, {
    variables: {customerAccessToken, addressId},
  });
}

const CREATE_ADDRESS_MUTATION = gql`
  mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
    customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
      customerAddress { id }
      customerUserErrors { code field message }
    }
  }
`;

const UPDATE_DEFAULT_ADDRESS_MUTATION = gql`
  mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
    customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
      customerUserErrors { code field message }
    }
  }
`;

export default function AddressApi() { return null; }

