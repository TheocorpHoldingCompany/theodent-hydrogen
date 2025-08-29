import {json} from '@shopify/remix-oxygen';
import {gql} from '@shopify/hydrogen';

export async function loader({context}) {
  const {storefront} = context;
  const {
    localization: {availableCountries},
  } = await storefront.query(COUNTRIES_QUERY);

  return json(availableCountries.sort((a, b) => a.name.localeCompare(b.name)));
}

const COUNTRIES_QUERY = gql`
  query Localization {
    localization {
      availableCountries {
        isoCode
        name
        currency { isoCode }
      }
    }
  }
`;

