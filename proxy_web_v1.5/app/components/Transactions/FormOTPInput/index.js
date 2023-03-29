import React from 'react';

import { allowKeyPressNumber } from 'utils/transactions/formValidation';
import { MAX_LENGTH_OTP, ENTER_KEY } from 'constants/index'

import FormInputGroup from 'components/common/FormInputGroup';

class FormOTPInput extends React.Component {
  onKeyPress = (e) => {
    const keyValue = e.key;
    if (!allowKeyPressNumber(keyValue) && keyValue !== ENTER_KEY) e.preventDefault();
  }

  onPaste = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <FormInputGroup
        maxLength={MAX_LENGTH_OTP}
        onKeyPress={this.onKeyPress}
        onPaste={this.onPaste}
        autoComplete="off"
        {...this.props}
      />
    );
  }
}

export default FormOTPInput;
