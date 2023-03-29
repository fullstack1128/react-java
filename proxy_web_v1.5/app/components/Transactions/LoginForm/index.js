import React from 'react';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import messages from './messages';
import FormInputGroup from 'components/common/FormInputGroup';
import FormCheckBox from 'components/common/FormCheckBox';
import CustomLink from 'components/CustomLink';
import Button from 'components/common/Button';
import imgLogin from 'images/formIcon/login.svg';
import FormPhoneInput from '../FormPhoneInput';
import CancelButton from '../CancelButton';
import { StyledAuthForm } from '../StyledLayout';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import set from 'lodash/set';

class LoginForm extends React.Component {
  submitSuccess = () => {
    const { setFieldValue, setTouched, loginRememberFieldName, loginPhoneFieldName, loginPasswordFieldName } = this.props;

    if (setFieldValue) {
      setFieldValue(loginPhoneFieldName, '');
      setFieldValue(loginPasswordFieldName, '');
      setFieldValue(loginRememberFieldName, false);
    }

    if (this.phoneInput) {
      this.phoneInput.focus();
    }

    if (setTouched) {
      setTouched({});
    }
  };

  render() {
    const {
      intl,
      values,
      handleChange,
      handleBlur,
      handleLogin,
      isLogging,
      loginPhoneFieldName,
      loginPasswordFieldName,
      loginRememberFieldName,
      isSkipLogin,
      handleSkipLogin,
    } = this.props;

    return (
      <StyledAuthForm className="form-1-col">
        <div className="title-header">
          <div className="form-icon">
            <img src={imgLogin} alt="congratulation" />
          </div>
          <div className="message">
            {intl.formatMessage(isSkipLogin ? messages.optionTitle : messages.textMessage)}
          </div>
        </div>

        <FormPhoneInput
          name={loginPhoneFieldName}
          value={get(values, loginPhoneFieldName)}
          placeholder={intl.formatMessage(messages.phonePlaceholder)}
          label={intl.formatMessage(messages.phoneLabel)}
          onChange={handleChange}
          onBlur={handleBlur}
          inputRef={(ref) => {
            this.phoneInput = ref;
          }}
        />

        <FormInputGroup
          name={loginPasswordFieldName}
          value={get(values, loginPasswordFieldName)}
          type="password"
          placeholder={intl.formatMessage(messages.passwordPlaceholder)}
          label={intl.formatMessage(messages.passwordLabel)}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="d-flex justify-content-between">
          <FormCheckBox
            checked={get(values, loginRememberFieldName)}
            name={loginRememberFieldName}
            label={intl.formatMessage(messages.rememberLabel)}
            onChange={handleChange}
          />
          <CustomLink to="/quen-mat-khau">
            {intl.formatMessage(messages.forgotPassword)}
          </CustomLink>
        </div>

        <div className="register-wrapper login">

          <Button
            loading={isLogging}
            onClick={handleLogin(this.props, this.submitSuccess)}
            primary
            text={intl.formatMessage(messages.loginButton)}
            type="submit"
            className={classNames(Classes.FILL)}
          />
          <div className={'divider'}>
            <hr /><span className={'divider-context'}>{intl.formatMessage(messages.navigator)}</span>
          </div>
          <buton
            role={'button'}
            className="bp3-button skip-step"
            onClick={handleSkipLogin(this.props)}
            tabIndex={-1}
          >
            {intl.formatMessage(messages.skipStep)}
          </buton>
          <CancelButton />
        </div>

        {/* Comment by HienNT because isSkipLogin always true*/}
        {/* {isSkipLogin ?*/}
        {/*  <div className="register-wrapper">*/}
        {/*    <a*/}
        {/*      role={'button'}*/}
        {/*      className="skip-step"*/}
        {/*      onClick={handleSkipLogin(props)}*/}
        {/*      tabIndex={-1}*/}
        {/*    >*/}
        {/*      {intl.formatMessage(messages.skipStep)}*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*  :*/}
        {/*  <div className="register-wrapper">*/}
        {/*    <span className="title-have-account">*/}
        {/*      {intl.formatMessage(messages.doYouHaveAccount)}{' '}*/}
        {/*    </span>*/}
        {/*    <CustomLink to="/auth/register">*/}
        {/*      {intl.formatMessage(messages.registerButton)}*/}
        {/*    </CustomLink>*/}
        {/*  </div>*/}
        {/* }*/}
      </StyledAuthForm>
    );
  }
}

export default injectIntl(LoginForm);
