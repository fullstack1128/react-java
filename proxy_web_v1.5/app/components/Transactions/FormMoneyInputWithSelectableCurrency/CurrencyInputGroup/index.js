import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';

import CurrencyDropdown from '../CurrencyDropdown';

const StyledInputGroup = styled(InputGroup)`
  width: 100%;

  .bp3-input-action {
    border-left: 1px solid ${(props) => props.theme.colors.gray300};
    height: 100%;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CurrencyInputGroup = ({
  currencies,
  currencyName,
  currencyValue,
  setFieldValue,
  ...rest
}) => (
  <StyledInputGroup
    {...rest}
    rightElement={
      <CurrencyDropdown
        setFieldValue={setFieldValue}
        currencies={currencies}
        name={currencyName}
        value={currencyValue}
      />
    }
  />
);

export default CurrencyInputGroup;

