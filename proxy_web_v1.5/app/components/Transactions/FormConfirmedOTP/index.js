import React from 'react';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import FormInputGroup from 'components/common/FormInputGroup';
import Button from 'components/common/Button';
import icoConfirmOTP from 'images/formIcon/icoConfirmOTP.svg';
import messages from './messages';
import { MAX_LENGTH_OTP } from 'utils/transactions/constants';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { StyledAuthForm } from '../StyledLayout';

const FormConfirmedOTP = (props) => {
  const {
    intl,
    values,
    handleChange,
    handleBlur,
    handleConfirmOTP,
    isConfirmingOTP,
    otpFieldName,
  } = props;

  return (
    <StyledAuthForm className="form-1-col">
      <div className="title-header">
        <div className="form-icon">
          <img src={icoConfirmOTP} alt="otp confirmation" />
        </div>
        <div className="message">{intl.formatMessage(messages.confirmOTPToLogin)}</div>
      </div>

      <FormInputGroup
        maxLength={MAX_LENGTH_OTP}
        name={otpFieldName}
        value={get(values, otpFieldName)}
        placeholder={intl.formatMessage(messages.otpPlaceholder)}
        label={intl.formatMessage(messages.otpLabel)}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />

      <div className="register-wrapper">
        <Button
          loading={isConfirmingOTP}
          onClick={handleConfirmOTP(props)}
          primary
          text={intl.formatMessage(messages.send)}
          type="submit"
          className={classNames(Classes.FILL)}
        />
      </div>
    </StyledAuthForm>
  );
};

export default injectIntl(FormConfirmedOTP);
