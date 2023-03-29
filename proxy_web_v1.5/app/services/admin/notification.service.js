import request from '../../utils/request';
import env from 'env';

export function getNotification(data) {
  const requestURL = `${env.API_URL}/admin/modems/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function readNotification(data) {
  const requestURL = `${env.API_URL}/admin/modems/list`;

  return request(requestURL, { method: 'POST', body: data });
}
