import * as Yup from 'yup';
import messages from './messages';


const getSchema = (intl, messageErrors) => (
  Yup.object().shape({
    files: Yup.string()
      .nullable()
      .required(messageErrors.filesRequiredMessage || intl.formatMessage(messages.filesRequiredMessage)),
  })
);

export default getSchema;
