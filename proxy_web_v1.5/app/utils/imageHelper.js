import { isBase64File } from './fileHelper';

const SUPPORTED_FORMATS = ['png', 'jpe', 'jpeg'];

export const isUrlOrSupportedImageType = (str) => {
  if (!isBase64File(str)) return true;

  const type = str.substring('data:image/'.length, str.indexOf(';base64'));
  return SUPPORTED_FORMATS.includes(type);
};

export const imageSize = (base64Data) => (
  (base64Data.length * (3 / 4)) - 1
);
