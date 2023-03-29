import React from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';

import ErrorMessage from 'components/common/ErrorMessage';

import { MAX_LENGTH_YEAR_INPUT } from 'utils/transactions/constants';
import { focusControl } from 'styles/commonCss';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import messages from '../messages';
import isEmpty from 'lodash/isEmpty';


const StyledContainer = styled(FormGroup)`
  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 5px;
    min-height: 24px;

    &:first-letter {
      text-transform: uppercase;
    }
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
    color: rgba(0,0,0,0.3);
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

const FormYearInputGroup = (props) => {
  const { label, name, intl, placeholder, ...rest } = props;

  return (
    <StyledContainer>
      <FormLabel>{label}</FormLabel>

      <div className="input-content-group">
        <NumberFormat
          displayType={'input'}
          // thousandSeparator lấy dấu , 
          maxLength={MAX_LENGTH_YEAR_INPUT}
          decimalScale={0}
          large
          name={name}
          allowNegative={false}
          customInput={CustomInputGroup}
          placeholder={isEmpty(placeholder) ? `${intl.formatMessage(messages.inputMessage)} ${(label || '').toLowerCase()}` : placeholder}
          {...rest}
        />
      </div>

      <ErrorMessage name={name} />
    </StyledContainer>
  );
};

export default injectIntl(FormYearInputGroup);
