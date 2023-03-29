import * as Yup from 'yup';
import messages from '../messages';


export default (intl) => Yup.object().shape({
  // modemId: Yup.object().nullable()
  //     .required(intl.formatMessage(messages.requiredNotNull)),
});
