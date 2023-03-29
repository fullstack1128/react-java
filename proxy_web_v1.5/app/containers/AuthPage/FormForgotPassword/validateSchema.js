import * as Yup from 'yup';
import messages from './messages';
const commonMaxLength = 15;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export default (intl) => {
  return Yup.object().shape({
    phone: Yup
      .string()
      .required(intl.formatMessage(messages.phoneRequiredError))
      .matches(phoneRegExp, intl.formatMessage(messages.phoneInvalidError))
      .test('len', intl.formatMessage(messages.phoneMaxLengthError, { length: commonMaxLength }), (val) => val && val.length < commonMaxLength + 1),
    code: Yup
      .string()
      .required(intl.formatMessage(messages.codeRequiredError))
      .max(30, intl.formatMessage(messages.codeMaxLengthError)),
  });
};
