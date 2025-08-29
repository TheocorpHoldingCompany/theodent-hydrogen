import {gql} from '@shopify/hydrogen';
import {getApiErrorMessage} from '~/lib/utils';

export async function action({request, params, context}) {
  const token = await context.session.get('customerAccessToken');
  if (!token) return new Response(null, {status: 401});
  if (request.method === 'PATCH') return updateAddress(token, request, params, context.storefront);
  if (request.method === 'DELETE') return deleteAddress(token, params, context.storefront);
  return new Response(null, {status: 405, headers: {Allow: 'PATCH,DELETE'}});
}

async function deleteAddress(customerAccessToken, params, storefront) {
  const {data, errors} = await storefront.mutate(DELETE_ADDRESS_MUTATION, {
    variables: {customerAccessToken, id: decodeURIComponent(params.addressId)},
  });
  const error = getApiErrorMessage('customerAddressDelete', data, errors);
  if (error) return new Response(JSON.stringify({error}), {status: 400});
  return new Response(null);
}

async function updateAddress(customerAccessToken, request, params, storefront) {
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

  const {data, errors} = await storefront.mutate(UPDATE_ADDRESS_MUTATION, {
    variables: {address, customerAccessToken, id: decodeURIComponent(params.addressId)},
  });
  const error = getApiErrorMessage('customerAddressUpdate', data, errors);
  if (error) return new Response(JSON.stringify({error}), {status: 400});

  if (isDefaultAddress) {
    const resp = await storefront.mutate(UPDATE_DEFAULT_ADDRESS_MUTATION, {
      variables: {customerAccessToken, addressId: decodeURIComponent(params.addressId)},
    });
    const setErr = getApiErrorMessage('customerDefaultAddressUpdate', resp.data, resp.errors);
    if (setErr) return new Response(JSON.stringify({error: setErr}), {status: 400});
  }
  return new Response(null);
}

const UPDATE_ADDRESS_MUTATION = gql`
  mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
    customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
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

const DELETE_ADDRESS_MUTATION = gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors { code field message }
      deletedCustomerAddressId
    }
  }
`;

export default function AddressIdApi() { return null; }

