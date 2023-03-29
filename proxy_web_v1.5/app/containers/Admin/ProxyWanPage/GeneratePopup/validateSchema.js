import * as Yup from 'yup';
import messages from '../messages';

export default (intl) => (Yup.object().shape({
  modemId: Yup.string().nullable()
    .required(intl.formatMessage(messages.requiredNotNull)),
  positionFrom: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  positionTo: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  numberOfPorts: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  // ipAuthenticationEntry: Yup.string()
  //   .required(intl.formatMessage(messages.requiredNotNull)),
  userAuthenticationEntry: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  httpPortStart: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
  sockPortStart: Yup.string()
    .required(intl.formatMessage(messages.requiredNotNull)),
}));
