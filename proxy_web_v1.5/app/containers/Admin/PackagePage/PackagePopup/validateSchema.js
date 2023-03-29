import * as Yup from 'yup';
import messages from '../messages';

export default (intl) => (Yup.object().shape({
  name: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  packageUnit: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  duration: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  price: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  status: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  minTimeChangeIp: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  seq: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
}));
