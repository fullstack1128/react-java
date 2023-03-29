import request from '../../utils/request';
import env from 'env';

export function getConfigurations(data) {
  const requestURL = `${env.API_URL}/admin/configurations/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function updateConfiguration(id, data) {
  const requestURL = `${env.API_URL}/admin/configurations/${id}`;

  return request(requestURL, { method: 'PUT', body: data });
}
