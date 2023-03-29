import { ACCEPT_ALL_TYPES } from './transactions/constants'

export const getBase64Async = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new Error('Problem parsing input file'));
    };

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
};

export const isUrlOrSupportedAllType = (str) => {
  if (!isBase64File(str)) return true;

  const type = str.substring('data:'.length, str.indexOf(';base64'));
  return ACCEPT_ALL_TYPES.includes(type);
};

export const isBase64File = (str) => (
  str.startsWith('data:') && str.includes(';base64,')
);
