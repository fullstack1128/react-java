import moment from 'moment';
import { eDateFormat } from '../enums/EDateFormat';
import isEmpty from 'lodash/isEmpty';

export const isDateFormat = (date, format) => moment(date, format, true).isValid();

export const formatDate = (date, format = eDateFormat.DD_MM_YYYY) => date ? moment(date).format(format) : '';

export const convertToDate = (dateString) => {
  let dateOfBirth = null;

  if (!isEmpty(dateString)) {
    dateOfBirth = moment(dateString, eDateFormat.DD_MM_YYYY);
    dateOfBirth = dateOfBirth.isValid() ? dateOfBirth.toDate() : new Date(1970, 0, 1);
  }

  return dateOfBirth;
};

export const convertJsonToDate = (dateString) => {
  let dateOfBirth = null;

  if (!isEmpty(dateString)) {
    dateOfBirth = moment(dateString);
    dateOfBirth = dateOfBirth.isValid() ? dateOfBirth.toDate() : new Date(1970, 0, 1);
  }

  return dateOfBirth;
};

export const convertToDateWithFormat = (dateString, format = eDateFormat.DD_MM_YYYY) => {
  const date = moment(dateString, format);
  return date.isValid() ? date.toDate() : null;
};

