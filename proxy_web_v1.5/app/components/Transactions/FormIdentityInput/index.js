import React from 'react';

import { allowKeyPressNumber } from 'utils/transactions/formValidation';
import { MAX_LENGTH_IDENTITY } from 'utils/transactions/constants';

import FormInputGroup from 'components/common/FormInputGroup';
import { isNumberString } from '../../../utils/stringHelper';

class FormIdentityInput extends React.Component {
  onKeyPress = (e) => {
    const keyValue = e.key;
    if (!allowKeyPressNumber(keyValue)) e.preventDefault();
  }

  onPaste = (e) => {
    const textCopied = e.clipboardData.getData('text/plain');

    if (!isNumberString(textCopied)) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <FormInputGroup
        onKeyPress={this.onKeyPress}
        onPaste={this.onPaste}
        maxLength={MAX_LENGTH_IDENTITY}
        autoComplete="off"
        {...this.props}
      />
    );
  }
}

export default FormIdentityInput;
