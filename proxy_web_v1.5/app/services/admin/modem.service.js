import request from '../../utils/request';
import env from 'env';

export function getModems(data) {
  const requestURL = `${env.API_URL}/admin/modems/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getModem(id) {
  const requestURL = `${env.API_URL}/admin/modems/${id}`;

  return request(requestURL, { method: 'GET' });
}


export function createModem(data) {
  const requestURL = `${env.API_URL}/admin/modems`;

  return request(requestURL, { method: 'POST', body: data });
}


export function updateModem(id, data) {
  const requestURL = `${env.API_URL}/admin/modems/${id}`;

  return request(requestURL, { method: 'PUT', body: data });
}

export function syncModem(id) {
  const requestURL = `${env.API_URL}/admin/modems/${id}/sync`;

  return request(requestURL, { method: 'GET' });
}

export function pauseModem(id) {
  const requestURL = `${env.API_URL}/admin/modems/${id}/pause`;

  return request(requestURL, { method: 'GET' });
}


export function resumeModem(id) {
  const requestURL = `${env.API_URL}/admin/modems/${id}/resume`;

  return request(requestURL, { method: 'GET' });
}

export function deleteModem(id) {
  const requestURL = `${env.API_URL}/admin/modems/${id}`;

  return request(requestURL, { method: 'DELETE' });
}

export function generatePort(data) {
  const requestURL = `${env.API_URL}/admin/modems/generate-port`;

  return request(requestURL, { method: 'POST', body: data });
}

