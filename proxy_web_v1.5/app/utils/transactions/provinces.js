import get from 'lodash/get';

import { getSuggestionProvince } from 'utils/transactions/location';

export const getProvince = ({
  profileStore,
  currentAddress,
  provinces,
}) => get(profileStore, 'province_id', getSuggestionProvince(currentAddress, provinces));
