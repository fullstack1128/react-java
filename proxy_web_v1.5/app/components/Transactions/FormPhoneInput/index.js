import React from 'react';

import { allowKeyPressNumber } from 'utils/transactions/formValidation';
import { ENTER_KEY, MAX_LENGTH_PHONE } from 'constants/index';

import FormInputGroup from 'components/common/FormInputGroup';
import { isNumberString } from '../../../utils/stringHelper';

class FormPhoneInput extends React.Component {
  onKeyPress = (e) => {
    const keyValue = e.key;
    if (!allowKeyPressNumber(keyValue) && keyValue !== ENTER_KEY) {
      e.preventDefault();
    }
  };

  onPaste = (e) => {
    const textCopied = e.clipboardData.getData('text/plain');

    if (!isNumberString(textCopied)) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <FormInputGroup
        maxLength={MAX_LENGTH_PHONE}
        onKeyPress={this.onKeyPress}
        onPaste={this.onPaste}
        autoComplete="off"
        {...this.props}
      />
    );
  }
}

export default FormPhoneInput;
