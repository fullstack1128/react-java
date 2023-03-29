import request from '../../utils/request';
import env from 'env';

export function getLocations() {
  const requestURL = `${env.API_URL}/locations/list`;

  return request(requestURL, { method: 'POST' });
}
