import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import FormInputGroup from 'components/common/FormInputGroup';

import CustomLink from '../../../components/CustomLink';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';
import StyledMoreFunctionDiv from './StyledMoreFunctionDiv';
import { Form, Formik } from 'formik';
import commonMessage from '../messages';
import messages from './messages';
import imgLogin from 'images/formIcon/login.svg';
import CommonButton from '../../../components/common/Button';
import getSchema from './validateSchema';
import FormCheckBox from '../../../components/common/FormCheckBox';
import get from 'lodash/get';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import FormPhoneInput from 'components/Transactions/FormPhoneInput';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: {
        username: '',
        password: '',
      },
    };
  }

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    this.props.onSubmit(values, () => {
      setSubmitting(false);
      resetForm(this.state.initialValue);
      this.phoneInput.focus();
    });
  };

  render() {
    const { intl } = this.props;
    const { initialValue } = this.state;
    return (
      <Fragment>
        <Row>
          <Col xs={4}>
            <div className="form__icon">
              <img alt={''} src={imgLogin} />
            </div>
          </Col>

          <Col xs={8}>
            <div className="form__title">
              {intl.formatMessage(messages.title)}
            </div>
          </Col>
        </Row>

        <Formik
          initialValues={initialValue}
          validationSchema={getSchema(intl)}
          enableReinitialize
          onSubmit={this.handleSubmit}
          render={(props) => (
            <Form>
              <FormInputGroup
                autoFocus
                didCheckErrors={false}
                label={intl.formatMessage(commonMessage.username)}
                name="username"
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'username')}
                placeholder={intl.formatMessage(commonMessage.enterUsername)}
                onBlur={props.handleBlur}
                inputRef={(ref) => { this.phoneInput = ref; }}
              />

              <FormInputGroup
                didCheckErrors={false}
                label={intl.formatMessage(commonMessage.password)}
                name="password"
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'password')}
                placeholder={intl.formatMessage(commonMessage.enterPassword)}
              />

              <StyledMoreFunctionDiv>
                <FormCheckBox
                  didCheckErrors={false}
                  label={intl.formatMessage(messages.remember_me)}
                  name={'remember_me'}
                  value={get(props.values, 'remember_me')}
                  {...props}
                />
                <CustomLink
                  className={'d-inline to-right'}
                  to="/create-password"
                >
                  {intl.formatMessage(messages.changePassword)}
                </CustomLink>
              </StyledMoreFunctionDiv>

              <CommonButton
                primary
                className={classNames(Classes.LARGE, 'ml-auto', Classes.FILL)}
                type="submit"
                text={intl.formatMessage(messages.submit)}
                loading={props.isSubmitting}
              />

              <div className="form__link">
                <span>
                  {intl.formatMessage(messages.have_no_account)}
                </span>

                <CustomLink to="/register" className="ml-2">
                  {intl.formatMessage(messages.register)}
                </CustomLink>
              </div>
            </Form>
          )}
        />

      </Fragment>
    );
  }
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(FormLogin);
