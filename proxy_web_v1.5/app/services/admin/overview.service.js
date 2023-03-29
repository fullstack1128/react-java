import request from '../../utils/request';
import env from 'env';

export function getOverview() {
  const requestURL = `${env.API_URL}/admin/overview`;

  return request(requestURL, { method: 'GET' });
}
