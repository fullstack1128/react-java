import * as Yup from 'yup';
import messages from './messages';
import {
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_OTP,
  MIN_LENGTH_PHONE,
  PHONE_REGEX,
  PASSWORD_REGEX,
  MAX_LENGTH_PHONE,
} from 'constants/index';

export default (intl) => {
  return Yup.object().shape({
    currentPassword: Yup
      .string()
      .required(intl.formatMessage(messages.currentPasswordRequiredError)),
    newPassword: Yup
      .string()
      .required(intl.formatMessage(messages.new_passwordRequiredError))
      .max(MAX_LENGTH_PASSWORD, intl.formatMessage(messages.new_passwordMaxLengthError))
      .min(MIN_LENGTH_PASSWORD, intl.formatMessage(messages.new_passwordMinLengthError))
      .matches(PASSWORD_REGEX, intl.formatMessage(messages.new_passwordStrongError)),
    confirmPassword: Yup
        .string()
        .required(intl.formatMessage(messages.confirm_passwordRequiredError))
        .oneOf([Yup.ref('newPassword')], intl.formatMessage(messages.passwordNotMatchError)),
  });
};
