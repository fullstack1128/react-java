import request from '../../utils/request';
import env from 'env';


export function getProfiles(data) {
  const requestURL = `${env.API_URL}/admin-api/profiles`;

  return request(requestURL, { method: 'POST', body: data });
}

export function getProfileData(id) {
  const requestURL = `${env.API_URL}/admin-api/profile/${id}`;

  return request(requestURL, { method: 'GET' });
}

export function createProfile(data) {
  const requestURL = `${env.API_URL}/admin-api/profile/create`;

  return request(requestURL, { method: 'POST', body: data });
}

export function updateProfile(data) {
  const requestURL = `${env.API_URL}/admin-api/profile/update`;

  return request(requestURL, { method: 'PUT', body: data });
}
