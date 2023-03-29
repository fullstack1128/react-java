import React from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';
import ErrorMessage from 'components/common/ErrorMessage';
import isEqual from 'lodash/isEqual';

import { focusControl } from 'styles/commonCss';
import { MAX_LENGTH_RATE_INPUT } from 'utils/transactions/constants';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import isUndefined from 'lodash/isUndefined';

const MAX_RATE_PERCENT = 15;

const StyledContainer = styled(FormGroup)`
  margin-bottom: 10px;

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

// Component cho lãi suất, lãi chỉ được nhận XX,YY.
class FormRateInputGroupValidate extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.value, this.props.value)) {
      const {
        name,
        setFieldTouched,
      } = this.props;

      setFieldTouched(name, true, false);
    }
  }

  handleChange = (values) => {
    const { name, setFieldValue } = this.props;
    setFieldValue(name, values.floatValue);
  };

  render() {
    const {
      label,
      name,
      maxRatePercent = MAX_RATE_PERCENT,
      ...rest
    } = this.props;

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
              return isUndefined(floatValue) || (floatValue <= maxRatePercent);
            }}
            {...rest}
          />
        </div>

        <ErrorMessage name={'step2.rate'} />
      </StyledContainer>
    );
  }
}

export default injectIntl(FormRateInputGroupValidate);
