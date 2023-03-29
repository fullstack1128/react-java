import request from '../../utils/request';
import env from 'env';

export function getIspList() {
  const requestURL = `${env.API_URL}/isp/list`;

  return request(requestURL, { method: 'GET' });
}
