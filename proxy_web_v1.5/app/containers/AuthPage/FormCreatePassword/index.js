// import { get } from 'lodash';
import React, { Fragment } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Classes } from '@blueprintjs/core';
import { Formik, Form } from 'formik';
import FormInputGroup from '../../../components/common/FormInputGroup';
import CommonButton from '../../../components/common/Button';
import imgCreatePassword from '../../../images/formIcon/createPassword.svg';
import messages from './messages';
import getSchema from './validateSchema';
import get from 'lodash/get';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import commonMessage from '../messages';
import FormPasswordInput from '../../../components/Transactions/FormPasswordInput'


class FormCreatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: {
        email: '',
        currentPassword: '',
        newPassword: '',
        confirm_password: '',
      },
    };
  }

  handleSubmit = (values, { setSubmitting, resetForm }) => {
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
              <img alt={''} src={imgCreatePassword} />
            </div>
          </Col>

          <Col xs={8}>
            <div className="form__title">
              {intl.formatMessage(messages.title)}
            </div>
          </Col>
        </Row>

        <Formik
          onSubmit={this.handleSubmit}
          initialValues={initialValue}
          enableReinitialize
          validationSchema={getSchema(intl)}
          className="mt-4"

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
                label={'Nhập mật khẩu cũ'}
                name={'currentPassword'}
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'currentPassword')}
                placeholder={intl.formatMessage(messages.passwordPlaceHolder)}
                {...props}
                onBlur={props.handleBlur}
              />
              <FormPasswordInput
                label={intl.formatMessage(messages.new_password)}
                name={'newPassword'}
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'newPassword')}
                autoFocus
                placeholder={intl.formatMessage(messages.passwordPlaceHolder)}

              />

              <FormPasswordInput
                label={intl.formatMessage(messages.confirm_new_password)}
                name={'confirm_password'}
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'confirm_password')}
                placeholder={intl.formatMessage(messages.confirm_new_password)}

              />

              <CommonButton
                primary
                className={classNames(
                  Classes.LARGE,
                  Classes.FILL
                )}
                type="submit"
                text={intl.formatMessage(messages.submit)}
              >
              </CommonButton>
            </Form>
          )}
        />

      </Fragment>
    );
  }
}

FormCreatePassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  modifiedData: PropTypes.object,
  errorMessages: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default injectIntl(FormCreatePassword);
