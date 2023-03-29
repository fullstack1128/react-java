import * as Yup from 'yup';
import messages from './messages';
import { MIN_LENGTH_PHONE, PHONE_REGEX } from 'constants/index';

// const commonMaxLength = 15;
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default (intl) => Yup.object().shape({
  phone: Yup.string()
    // .matches(PHONE_REGEX, intl.formatMessage(messages.phoneInvalidError))
    // .min(MIN_LENGTH_PHONE, intl.formatMessage(messages.phoneInvalidError))
    // .required(intl.formatMessage(messages.phoneRequiredError))
  ,

  password: Yup.string()
    .required(intl.formatMessage(messages.passwordRequiredError)),
  // .max(30, intl.formatMessage(messages.passwordMaxLengthError))
  // .min(8, intl.formatMessage(messages.passwordMinLengthError)),
});
