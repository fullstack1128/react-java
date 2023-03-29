import React from 'react';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import FormInputGroup from 'components/common/FormInputGroup';
import Button from 'components/common/Button';
import imgRegister from 'images/formIcon/register.svg';
import commonMessage from 'containers/AuthPage/messages';
import message from './messages';
import FormOTPInput from '../FormOTPInput';
import FormPasswordInput from '../FormPasswordInput';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { StyledAuthForm } from '../StyledLayout';
import ButtonLink from "../../ButtonLink";
import CancelButton from "../CancelButton";

const RegisterForm = (props) => {
  const {
    intl,
    values,
    handleChange,
    handleBlur,
    isRegisterLoading,
    registerPhoneFieldName,
    registerCodeFieldName,
    registerPasswordFieldName,
    registerConfirmPasswordFieldName,
    handleSubmitRegister,
    handleShowRegister,
    handleSkipRegister,
    handleSendOTPRegister,
  } = props;

  return (
    <StyledAuthForm className="form-1-col">
      <div className="title-header">
        <div className="form-icon">
          <img src={imgRegister} alt="congratulation" />
        </div>
        <div className="message">{intl.formatMessage(message.title)}</div>
      </div>

      <FormInputGroup
        disabled
        label={intl.formatMessage(commonMessage.phoneNumber)}
        name={registerPhoneFieldName}
        onChange={props.handleChange}
        type={'text'}
        value={get(props.values, registerPhoneFieldName)}
        hasSendOTP
        onSendOTP={() => handleSendOTPRegister(get(props.values, registerPhoneFieldName))}
        sentOTP={props.sentOTP}
        placeholder={intl.formatMessage(commonMessage.enterPhoneNumber)}
        {...props}
      />

      <FormOTPInput
        label={intl.formatMessage(commonMessage.otpCode)}
        name={registerCodeFieldName}
        onChange={props.handleChange}
        type={'text'}
        value={get(props.values, registerCodeFieldName)}
        placeholder={intl.formatMessage(commonMessage.enterOtpCode)}
        onBlur={handleBlur}
        {...props}
      />

      <FormPasswordInput
        label={intl.formatMessage(commonMessage.password)}
        name={registerPasswordFieldName}
        onChange={handleChange}
        type={'password'}
        value={get(values, registerPasswordFieldName)}
        placeholder={intl.formatMessage(commonMessage.enterPassword)}
        onBlur={handleBlur}
        {...props}
      />

      <FormPasswordInput
        label={intl.formatMessage(commonMessage.confirmPassword)}
        name={registerConfirmPasswordFieldName}
        onChange={handleChange}
        type={'password'}
        value={get(values, registerConfirmPasswordFieldName)}
        placeholder={intl.formatMessage(commonMessage.confirmPassword)}
        onBlur={handleBlur}
      />

      <div className="register-wrapper">
        <a
          className="skip-step"
          onClick={handleSkipRegister(props)}
          role={'button'}
          tabIndex={-1}
        >
          {intl.formatMessage(message.skipStep)}
        </a>

        <Button
          loading={isRegisterLoading}
          onClick={handleSubmitRegister(props)}
          primary
          text={intl.formatMessage(message.btnRegister)}
          type="button"
          className={classNames(Classes.FILL)}
        />

        <CancelButton
          onClick={() => {
            handleShowRegister(props, false);
          }}
          text={intl.formatMessage(message.btnCancel)}
          type="button"
        />
      </div>
    </StyledAuthForm>
  );
};

export default injectIntl(RegisterForm);
