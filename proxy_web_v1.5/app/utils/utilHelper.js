import { to } from 'await-to-js';
import orderBy from 'lodash/orderBy';
import debounce from 'lodash/debounce';
import { routes } from '../containers/Routes/routeHelper';
import { eUserType } from '../enums/EUserType';

const DEBOUNCE_WAIT_DEFAULT = 500;
export const MAX_DATATABLE_ROW = 1000;
const DEFAULT_URL_AFTER_LOGIN_CLIENT = routes.HOME;
const DEFAULT_URL_AFTER_LOGIN_OTHER_TYPES = routes.ACCOUNT_MGMT;

export const TO = async (promise) => {
  const [err, res] = await to(promise);
  if (err) {
    return [err];
  }

  return [null, res];
};

export const cancelablePromise = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (value) => (hasCanceled ? reject({ isCanceled: true, value }) : resolve(value)),
      (error) => reject({ isCanceled: hasCanceled, error }),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (hasCanceled = true),
  };
};

export const convertDropdownList = (items, allLable = null, allValue = null) => {
  const options = items.map((item) => ({
    label: item.name || item.nameVi,
    value: item.id,
  }));
  if (allLable) {
    options.unshift({
      label: allLable,
      value: allValue,
    });
  }
  return options;
};

export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0MB';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / (1024 ** i)).toFixed(1)}${sizes[i]}`;
};

export const copyToClipboard = (textToCopy) => {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  }
    // text area method
  const textArea = document.createElement('textarea');
  textArea.value = textToCopy;
    // make the textarea out of viewport
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  return new Promise((res, rej) => {
      // here the magic happens
    document.execCommand('copy') ? res() : rej();
    textArea.remove();
  });
};

export const getValueSocialMedia = (socialMedia, key) => {
  if (!socialMedia) return '#';

  const linkObj = socialMedia.find((item) => item.key === key);

  if (!linkObj) return '#';

  return linkObj.value;
};

export const formatDataList = (data, page = 0, pageSize = 1) => (data || []).map((el, idx) => ({
  index: (idx + 1) + (page * pageSize),
  ...el,
}));
