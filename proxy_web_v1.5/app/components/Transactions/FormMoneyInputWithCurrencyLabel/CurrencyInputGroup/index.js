import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import styled from 'styled-components';

import { DEFAULT_CURRENCY_UNIT } from 'utils/transactions/constants';

const StyledInputGroup = styled(InputGroup)`
  width: 100%;

  .bp3-input-action {
    border-left: 1px solid ${(props) => props.theme.colors.gray300};
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledCurrencyLabel = styled.div`
  display: flex;
  align-items: center;

  span {
    color: ${(props) => props.theme.colors.gray1000};
    font-size: ${(props) => props.theme.fontSizes.small};
    text-transform: uppercase;
  }
`;

const CurrencyLabel = ({ currencyName = DEFAULT_CURRENCY_UNIT }) => (
  <StyledCurrencyLabel>
    <span>{currencyName}</span>
  </StyledCurrencyLabel>
);

const CurrencyInputGroup = ({
  currencyName,
  ...rest
}) => (
  <StyledInputGroup
    {...rest}
    rightElement={
      <CurrencyLabel currencyName={currencyName} />
    }
  />
  );

export default CurrencyInputGroup;

