import request from '../../utils/request';
import env from 'env';

export function getProxies(data) {
  const requestURL = `${env.API_URL}/admin/proxies/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getProxy(id) {
  const requestURL = `${env.API_URL}/admin/proxies/${id}`;

  return request(requestURL, { method: 'GET' });
}

export function deleteProxies(data) {
  const requestURL = `${env.API_URL}/admin/proxies/delete`;

  return request(requestURL, { method: 'POST', body: data });
}
