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

export default (intl) => Yup.object().shape({
  email: Yup
    .string()
    .required(intl.formatMessage(messages.emailRequiredError)),
  currentPassword: Yup
      .string()
      .required(intl.formatMessage(messages.passwordRequiredError))
      .max(MAX_LENGTH_PASSWORD, intl.formatMessage(messages.passwordMaxLengthError))
      .min(MIN_LENGTH_PASSWORD, intl.formatMessage(messages.passwordMinLengthError))
      .matches(PASSWORD_REGEX, intl.formatMessage(messages.passwordStrongError)),
  newPassword: Yup
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
      .oneOf([Yup.ref('newPassword')], intl.formatMessage(messages.passwordNotMatchError)),
});
