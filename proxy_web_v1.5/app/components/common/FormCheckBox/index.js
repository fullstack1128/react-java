import React from 'react';
import { Checkbox } from '@blueprintjs/core';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';


const StyledCheckBox = styled(Checkbox)`
  color: #000000!important;
  margin-bottom: 15px;
  font-size: ${(props) => props.theme.fontSizes.small};

  input:checked ~ .bp3-control-indicator {
    background-color: ${(props) => props.theme.colors.green1000} !important;
  }
`;

class FormCheckBox extends React.Component {
  onChange = (e) => {
    const { name, setFieldValue } = this.props;
    setFieldValue(name, e.target.checked);
  };

  render() {
    const { label, name, intl, ...rest } = this.props;

    return (
      <StyledCheckBox
        label={label}
        name={name}
        onChange={this.onChange}
        {...rest}
      />
    );
  }

}

export default injectIntl(FormCheckBox);
