import * as Yup from 'yup';
import messages from './messages';

import {
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  PASSWORD_REGEX,
} from 'constants/index';

export default (intl) => {
  const schema = {
    name: Yup
      .string()
      .required(intl.formatMessage(messages.usernameRequiredError)),
    email: Yup
      .string()
      .required(intl.formatMessage(messages.emailRequiredError)),
    // phone: Yup
    //   .string()
    //   .required(intl.formatMessage(messages.phoneRequiredError)),
    password: Yup
      .string()
      .required(intl.formatMessage(messages.passwordRequiredError))
      .max(MAX_LENGTH_PASSWORD, intl.formatMessage(messages.passwordMaxLengthError))
      .min(MIN_LENGTH_PASSWORD, intl.formatMessage(messages.passwordMinLengthError))
      .matches(PASSWORD_REGEX, intl.formatMessage(messages.passwordStrongError)),
    confirm_password: Yup
      .string()
      .required(intl.formatMessage(messages.confirm_passwordRequiredError))
      .max(MAX_LENGTH_PASSWORD, intl.formatMessage(messages.passwordMaxLengthError))
      .min(MIN_LENGTH_PASSWORD, intl.formatMessage(messages.passwordMinLengthError))
      .oneOf([Yup.ref('password')], intl.formatMessage(messages.passwordNotMatchError)),
  };

  return Yup.object().shape(schema);
};
