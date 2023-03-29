import request, { uploadSingleFileRequest } from '../../utils/request';
import env from 'env';

export function getLicenses(data) {
  const requestURL = `${env.API_URL}/admin/licenses/list`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getLicense(id) {
  const requestURL = `${env.API_URL}/admin/licenses/${id}`;

  return request(requestURL, { method: 'GET' });
}

export function updateLicense(id, data) {
  const requestURL = `${env.API_URL}/admin/licenses/${id}`;

  return request(requestURL, { method: 'PUT', body: data });
}

export function switchNewModem(data) {
  const requestURL = `${env.API_URL}/admin/licenses/switch-modem`;

  return request(requestURL, { method: 'POST', body: data });
}

export function updateLicenseStatus(data) {
  const requestURL = `${env.API_URL}/admin/licenses/update-license`;

  return request(requestURL, { method: 'POST', body: data });
}

export function importLicense(file) {
  const requestURL = 'admin/licenses/import-license';

  return uploadSingleFileRequest(requestURL, file);
}
