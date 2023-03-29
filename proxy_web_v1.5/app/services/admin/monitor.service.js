import request from '../../utils/request';
import env from 'env';

export function getMonitors(data) {
  const requestURL = `${env.API_URL}/admin/monitors/list`;

  return request(requestURL, { method: 'POST', body: data });
}
