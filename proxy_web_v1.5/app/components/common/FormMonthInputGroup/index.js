import React from 'react';
import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';
import NumberFormat from 'react-number-format';
import { injectIntl } from 'react-intl';

import ErrorMessage from 'components/common/ErrorMessage';

import { MAX_LENGTH_MONTH_INPUT } from 'utils/transactions/constants';
import { focusControl } from 'styles/commonCss';
import {
  convertToYearDuration,
} from 'utils/transactions/converter';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import dateMessages from '../../../utils/date/messages';
import messages from './messages';


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
    padding: 0 20px;
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

const StyledTimeLabelGroup = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  div {
    color: ${(props) => props.theme.colors.gray1000};
    font-size: ${(props) => props.theme.fontSizes.small};
    text-transform: uppercase;
  }

  .value-label {
    width: 45px;
    color: rgba(0,0,0,0.3);
    background-color: ${(props) => props.theme.colors.green200};
    cursor: not-allowed;
    padding: 0 5px;
    text-align: center;
    line-height: 38px;

    &:focus {
      ${focusControl}
    }
  }

  .vertical-divider {
    height: 100%;
    border-left: 1px solid ${(props) => props.theme.colors.gray300};
  }

  .month-label {
    padding-right: 10px;
  }

  .year-label {
    padding-left: 10px;
  }
`;

const TimeLabelGroup = ({ value = 0, intl }) => (
  <StyledTimeLabelGroup>
    <div className="month-label">{intl.formatMessage(messages.month, { value })}</div>
    <div className="vertical-divider" />
    <div className="value-label">{value}</div>
    <div className="vertical-divider" />
    <div className="year-label">{intl.formatMessage(messages.year, { value })}</div>
  </StyledTimeLabelGroup>
);

const CustomInputGroup = (props) => {
  const year = convertToYearDuration(props.value);
  const { intl } = props;

  return (
    <StyledCustomInputGroup>
      <InputGroup
        className="time-input-group"
        rightElement={
          <TimeLabelGroup value={year} intl={intl} />
        }
        {...props}
      />
    </StyledCustomInputGroup>
  );
};

const FormMonthInputGroup = (props) => {
  const { label, name, ...rest } = props;

  return (
    <StyledContainer>
      <FormLabel>{label}</FormLabel>

      <div className="input-content-group">
        <NumberFormat
          displayType={'input'}
          // thousandSeparator lấy dấu ,
          maxLength={MAX_LENGTH_MONTH_INPUT}
          decimalScale={0}
          large
          name={name}
          customInput={CustomInputGroup}
          allowNegative={false}
          {...rest}
        />
      </div>

      <ErrorMessage name={name} />
    </StyledContainer>
  );
};

export default injectIntl(FormMonthInputGroup);
