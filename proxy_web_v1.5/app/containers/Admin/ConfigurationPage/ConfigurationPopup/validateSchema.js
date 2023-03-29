import * as Yup from 'yup';
import messages from '../messages';

export default (intl) => (Yup.object().shape({
  value: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  description: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
}));
