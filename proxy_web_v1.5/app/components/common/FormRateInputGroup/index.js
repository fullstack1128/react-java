import React from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';
import isUndefined from 'lodash/isUndefined';
import ErrorMessage from 'components/common/ErrorMessage';
import { focusControl } from 'styles/commonCss';
import { MAX_LENGTH_RATE_INPUT } from 'utils/transactions/constants';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';

const StyledContainer = styled(FormGroup)`
`;

export const MIN_RATE_PERCENT = 0;
export const MAX_RATE_PERCENT = 15;

// Component cho lãi suất, lãi chỉ được nhận XX,YY.
const FormRateInputGroup = (props) => {
  const {
    label,
    name,
    minRatePercent = props.minRate || MIN_RATE_PERCENT,
    maxRatePercent = props.maxRate || MAX_RATE_PERCENT,
    intl,
    isValidated,
    ...rest
  } = props;

  return (
    <StyledContainer>
      <FormLabel>{label}</FormLabel>

      <div className="d-flex">
        <NumberFormat
          displayType={'input'}
          thousandSeparator
          name={name}
          maxLength={MAX_LENGTH_RATE_INPUT}
          large
          className="flex-grow-1"
          customInput={InputGroup}
          allowNegative={false}
          decimalScale={2}
          isAllowed={(values) => {
            const { floatValue } = values;
            return isValidated || isUndefined(floatValue) ||
              (floatValue >= minRatePercent && floatValue <= maxRatePercent);
          }}
          {...rest}
        />
      </div>
      <ErrorMessage name={name} />
    </StyledContainer>
  );
};

export default injectIntl(FormRateInputGroup);
