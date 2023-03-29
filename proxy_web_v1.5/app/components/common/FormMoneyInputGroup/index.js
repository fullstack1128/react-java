import React from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';
import ErrorMessage from 'components/common/ErrorMessage';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import messages from '../messages';
import isEmpty from 'lodash/isEmpty';
import lowerFirst from 'lodash/lowerFirst';

const StyledContainer = styled(FormGroup)`  
  
`;


const FormMoneyInputGroup = ({ label, name, intl, isRequired = true, isAsterisk, placeholder, decimalScale = 0, ...rest }) => (
  <StyledContainer>
    <FormLabel
      isRequired={isRequired}
      isAsterisk={isAsterisk}
    >{label}</FormLabel>

    <div className="d-flex">
      <NumberFormat
        displayType={'input'}
        thousandSeparator
        decimalScale={decimalScale}
        name={name}
        large
        className="flex-grow-1"
        customInput={InputGroup}
        allowNegative={false}
        placeholder={isEmpty(placeholder) ? `${intl.formatMessage(messages.inputMessage)} ${lowerFirst(label || '')}` : placeholder}
        {...rest}
      />
    </div>
    <ErrorMessage name={name} />
  </StyledContainer>
);

export default injectIntl(FormMoneyInputGroup);
