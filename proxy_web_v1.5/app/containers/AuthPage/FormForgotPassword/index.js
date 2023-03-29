import React, { Fragment } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import messages from './messages';
import { injectIntl } from 'react-intl';
import { Formik, Form } from 'formik';
import commonMessage from '../messages';
import CommonButton from '../../../components/common/Button';
import FormOTPInput from 'components/Transactions/FormOTPInput';
import getSchema from './validateSchema';
import imgForgotPass from 'images/formIcon/forgotPass.svg';
import get from 'lodash/get';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import FormInputGroup from 'components/common/FormInputGroup';
import { eVerifyCodeType } from 'enums/EVerifyCodeType';
import FormPasswordInput from 'components/Transactions/FormPasswordInput';

class FormForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: {
        phone: '',
        code: '',
      },
    };
  }


  handleSubmit = (values, { setSubmitting, resetForm }) => {
    values.type = eVerifyCodeType.FORGOT_PASSWORD;
    this.props.onSubmit(values);
    resetForm(this.state.initialValue);
    setSubmitting(false);
  };


  render() {
    const { intl } = this.props;
    const { initialValue } = this.state;

    return (
      <Fragment>
        <Row>
          <Col xs={4}>
            <div className="form__icon">
              <img alt={''} src={imgForgotPass} />
            </div>
          </Col>

          <Col xs={8}>
            <div className="form__title">
              {intl.formatMessage(messages.title)}
            </div>

            <div className="form__subtitle">
              {intl.formatMessage(messages.guidance)}
            </div>
          </Col>
        </Row>

        <Formik
          initialValues={initialValue}
          onSubmit={this.handleSubmit}
          className="mt-4"
          enableReinitialize
          validationSchema={getSchema(intl)}
          render={(props) => (
            <Form>
              <FormInputGroup
                label={intl.formatMessage(commonMessage.email)}
                name={'email'}
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'email')}
                placeholder={intl.formatMessage(commonMessage.enterEmail)}
                {...props}
                onBlur={props.handleBlur}
              />

              <FormPasswordInput
                label={intl.formatMessage(commonMessage.password)}
                name={'password'}
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'password')}
                placeholder={intl.formatMessage(commonMessage.passwordPlaceHolder)}
                {...props}
                onBlur={props.handleBlur}
              />

              <FormPasswordInput
                label={intl.formatMessage(commonMessage.confirmPassword)}
                name={'confirm_password'}
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'confirm_password')}
                placeholder={intl.formatMessage(commonMessage.confirmPassword)}
                onBlur={props.handleBlur}
              />

              <CommonButton
                primary
                className={classNames(Classes.LARGE, Classes.FILL)}
                type={'submit'}
                text={intl.formatMessage(messages.submit)}
              />
            </Form>
          )}
        />

      </Fragment>
    );
  }
}

FormForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSendOTP: PropTypes.func.isRequired,
  modifiedData: PropTypes.object,
  errorMessages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sentOTP: PropTypes.bool,
};

export default injectIntl(FormForgotPassword);
