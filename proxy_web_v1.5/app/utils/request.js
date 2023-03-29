import 'whatwg-fetch';
import auth from './auth';
import cloneDeep from 'lodash/cloneDeep';
import { CommonToaster } from 'components/CommonToaster';
import { Intent } from '@blueprintjs/core/lib/esm/index';
import env from '../env';
import axios from 'axios';
import * as Sentry from '@sentry/browser';
import { forwardTo } from 'utils/history';
import ApiError from '../errors/apiError';

const KEY_SESSION = 'session';
const ERR_PERMISSION_MESSAGE = '[403] You do not have permission to access data.';
const ERR_SESSION_MESSAGE = 'Please log in again.';
const DEFAULT_MESSAGE = 'There has been an error processing your request.';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response, responseType = 'json') {
  if (response.status !== 204) {
    const stringify = JSON.stringify;
    if (!localStorage.getItem(KEY_SESSION) || (localStorage.getItem(KEY_SESSION) !== stringify(response.headers.get(KEY_SESSION)) && response.headers.get(KEY_SESSION) !== null)) {
      localStorage.setItem(KEY_SESSION, stringify(response.headers.get(KEY_SESSION)));
    }
  }

  return (responseType === 'text' && response.text) ?
    response.text() :
    response.json ?
      response.json() :
      response;
}

/**
 * Parses the JSON returned by a network request include headers
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSONIncludeHeaders(response) {
  return response.json ? response.json().then((data) => ({ response: data, headers: response.headers })) : response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300 && response.status !== 401) {
    return response;
  }

  if (response.status === 401 && !response.url.includes('users/authentication/email')) {
    auth.clearUserInfo();
    auth.clearToken();
    forwardTo('/auth/login');
    CommonToaster.show({
      message: ERR_SESSION_MESSAGE,
      intent: Intent.DANGER,
    });
  }

  if (response.status === 403) {
    CommonToaster.show({
      message: ERR_PERMISSION_MESSAGE,
      intent: Intent.DANGER,
    });
  }

  if (response.status >= 500) {
    CommonToaster.show({
      message: DEFAULT_MESSAGE,
      intent: Intent.DANGER,
    });
  }

  return parseJSON(response).then((responseFormatted) => {
    const error = new ApiError(response.statusText);
    error.response = response;
    error.response.payload = responseFormatted.error;
    throw error;
  });
}

/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */
function formatQueryParams(params) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @param shouldWatchServerRestart
 * @param includeHeaders
 * @return {object}           The response data
 */
export default function request(url, options = {}, shouldWatchServerRestart = false, includeHeaders = false, responseType = 'json') {
  const reqOptions = cloneDeep(options);
  // Set headers
  if (!options.headers) {
    reqOptions.headers = Object.assign({}, {
      'Content-Type': 'application/json',
    });
  } else if (options.headers['Content-Type'] === 'multipart/form-data') {
    reqOptions.headers['Content-Type'] = undefined;
  } else {
    reqOptions.headers = Object.assign({}, options.headers);
  }

  const token = auth.getToken();
  const sessionId = JSON.parse(localStorage.getItem(KEY_SESSION));

  if (token) {
    reqOptions.headers = Object.assign(reqOptions.headers, {
      Authorization: `Bearer ${token}`,
    });
  }
  if (sessionId) {
    reqOptions.headers = Object.assign(reqOptions.headers, {
      session: sessionId,
    });
  }

  if (options && options.params) {
    const params = formatQueryParams(options.params);
    url = `${url}?${params}`;
  }

  // Stringify body object
  if (options && options.body) {
    if (options.headers && options.headers['Content-Type'] === 'multipart/form-data') {
      reqOptions.body = options.body;
    } else {
      reqOptions.body = JSON.stringify(options.body);
    }
  }

  return fetch(url, reqOptions)
    .then(checkStatus)
    .then(
      !includeHeaders ?
        (response) => parseJSON(response, responseType) :
        parseJSONIncludeHeaders
    )
    .catch((err) => {
      if (env.SENTRY_ENABLE) {
        Sentry.captureException(err);
      }

      throw err;
    });
}

export const uploadFileRequest = (url, files) => {
  const requestURL = `${env.API_URL}/${url}`;

  const formData = new FormData();
  files.map((file) => {
    formData.append('files', file);
    return file;
  });

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return axios.post(requestURL, formData, config);
};

export const uploadSingleFileRequest = (url, file) => {
  const requestURL = `${env.API_URL}/${url}`;

  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return axios.post(requestURL, formData, config);
};

export const exportExcel = (url, body) => {
  const config = {
    headers: {
      // 'content-type': 'multipart/form-data',
    },
  };

  config.responseType = 'arraybuffer';

  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return axios.post(url, body, config);
};
