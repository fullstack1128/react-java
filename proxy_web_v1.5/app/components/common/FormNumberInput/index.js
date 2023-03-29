import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';
import ErrorMessage from 'components/common/ErrorMessage';
import { focusControl } from 'styles/commonCss';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import messages from '../messages';
import isEmpty from 'lodash/isEmpty';
import { InputGroup } from '@blueprintjs/core';

const StyledContainer = styled(FormGroup)`  
  display: flex; 

  .label {    
    width: 22%;
  }

  .bp3-input {
    min-height: 40px;
    // padding: 0 20px;
    font-size: ${(props) => props.theme.fontSizes.small} !important;

    &:focus {
      ${focusControl}
    }
  }
`;

const StyledCustomInputGroup = styled.div`
  display: flex;

  .bp3-input-action {
    border-left: 1px solid ${(props) => props.theme.colors.gray300};
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bp3-input:disabled {
    color: #000000;
    background-color: ${(props) => props.theme.colors.green200};
    border: solid 1px ${(props) => props.theme.colors.gray300};
    border-left: transparent;
  }

  .time-input-group {
    flex: 1;
  }
`;

const CustomInputGroup = (props) => (
  <StyledCustomInputGroup>
    <InputGroup
      className="time-input-group"
      {...props}
    />
  </StyledCustomInputGroup>
);

const FormNumberInput = (props) => {
  const { label, name, intl, placeholder, ...rest } = props;

  return (
    <StyledContainer>
      <div className="label">
        <FormLabel>{label}</FormLabel>
      </div>
      <div className="d-flex">
        <NumberFormat
          displayType={'input'}
          decimalScale={0}
          large
          name={name}
          className="flex-grow-1"
          allowNegative={false}
          customInput={CustomInputGroup}
          placeholder={isEmpty(placeholder) ? `${intl.formatMessage(messages.inputMessage)} ${(label || '').toLowerCase()}` : placeholder}
          {...rest}
        />
        <ErrorMessage name={name} />
      </div>
    </StyledContainer>
  );
};

export default injectIntl(FormNumberInput);
