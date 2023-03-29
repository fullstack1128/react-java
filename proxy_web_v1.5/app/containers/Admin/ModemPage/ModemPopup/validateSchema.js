import * as Yup from 'yup';
import messages from '../messages';

export default (intl) => (Yup.object().shape({
  name: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  domain: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  location: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  isp: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  userName: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  password: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  type: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
}));
