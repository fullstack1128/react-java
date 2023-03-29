import React from 'react';

import FormInputGroup from 'components/common/FormInputGroup';

// eslint-disable-next-line react/prefer-stateless-function
class FormPasswordInput extends React.Component {
  render() {
    return (
      <FormInputGroup
        // maxLength={MAX_LENGTH_PASSWORD}
        autoComplete="off"
        {...this.props}
      />
    );
  }
}

export default FormPasswordInput;
