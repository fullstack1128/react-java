import request from '../../utils/request';
import env from 'env';

export function getPackages(data) {
  const requestURL = `${env.API_URL}/packages/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getPackage(id) {
  const requestURL = `${env.API_URL}/packages/${id}`;

  return request(requestURL, { method: 'GET' });
}

export function createPackage(data) {
  const requestURL = `${env.API_URL}/packages`;

  return request(requestURL, { method: 'POST', body: data });
}

export function updatePackage(id, data) {
  const requestURL = `${env.API_URL}/packages/${id}`;

  return request(requestURL, { method: 'PUT', body: data });
}

export function deletePackage(id) {
  const requestURL = `${env.API_URL}/packages/${id}`;

  return request(requestURL, { method: 'DELETE' });
}
