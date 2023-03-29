import * as Yup from 'yup';
import messages from '../messages';


export default (intl) => Yup.object().shape({
  amount: Yup
      .string()
      .required(intl.formatMessage(messages.new_passwordRequiredError))
});
