import * as Yup from 'yup';
import messages from '../messages';

export default (intl, isAuthenticateWithUsername) => {
  let schema = {
    quantity: Yup.string()
      .required(intl.formatMessage(messages.requiredNotNull)),
    // time: Yup.string()
    //   .required(intl.formatMessage(messages.requiredNotNull)),
  };

  if (isAuthenticateWithUsername) {
    // schema = {
    //   ...schema,
    //   username: Yup.string()
    //     .required(intl.formatMessage(messages.requiredNotNull)),
    // };
  } else {
    schema = {
      ...schema,
      whiteListIps: Yup.string()
        .required(intl.formatMessage(messages.requiredNotNull)),
    };
  }

  return Yup.object().shape(schema);
};
