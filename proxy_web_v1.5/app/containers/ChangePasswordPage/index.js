/**
 *
 * ChangePasswordPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectChangePasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import FormInputGroup from 'components/common/FormInputGroup';
import CommonButton from '../../components/common/Button';
import { changePassword } from './actions';
import get from 'lodash/get';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import Container from 'reactstrap/es/Container';
import classNames from 'classnames';
import { Classes, Intent } from '@blueprintjs/core';
import { injectIntl } from 'react-intl';
import messages from './messages';
import { CommonToaster } from '../../components/CommonToaster';
import Wrapper from '../AuthPage/styled/Wrapper';
import imgCreatePassword from 'images/formIcon/createPassword.svg';
import { Formik, Form } from 'formik';
import getSchema from './validateSchema';
import background from 'images/background.png';
import styled from 'styled-components';
import errMessage from '../../constants/responseCode/messages';
import breakpoint from '../../styles/breakpoint';
import { getErrorMessageFromError } from "../../constants/responseCode/utils";


const StyledComponent = styled.div`
  background-image: url(${background});    
  background-position: center -200px;
  background-size: 100%;
  background-color: #f5f5f5;
  background-repeat: no-repeat;
  flex-grow: 1;
  
  @media (max-width: ${breakpoint.md}) {
    background-position: center top;
  }
`;


export class ChangePasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      initialValue: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };

    this.onChange = this.onChange.bind(this);
    this.callbackError = this.callbackError.bind(this);
    this.changePasswordSuccess = this.changePasswordSuccess.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  callbackError(errorObj) {
    CommonToaster.show({
      message: this.props.intl.formatMessage(getErrorMessageFromError(errorObj)),
      intent: Intent.DANGER,
    });
  }

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    this.props.changePassword(values, this.changePasswordSuccess, this.callbackError);
    resetForm(this.state.initFormValues);
    setSubmitting(false);
  }

  changePasswordSuccess() {
    CommonToaster.show({
      message: this.props.intl.formatMessage(messages.messageSuccess),
      intent: Intent.SUCCESS,
    });
  }

  render() {
    const { intl } = this.props;
    const { initialValue } = this.state;

    return (
      <StyledComponent>
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Wrapper>
                <div className="form__content">
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
                    render={(props) => (
                      <Form>
                        <FormInputGroup
                          label={intl.formatMessage(messages.currentPassword)}
                          name="currentPassword"
                          onChange={props.handleChange}
                          type={'password'}
                          value={get(props.values, 'currentPassword')}
                          autoFocus
                          placeholder={intl.formatMessage(messages.currentPassword)}
                        />

                        <FormInputGroup
                          label={intl.formatMessage(messages.newPassword)}
                          name="newPassword"
                          onChange={props.handleChange}
                          type={'password'}
                          value={get(props.values, 'newPassword')}
                          placeholder={intl.formatMessage(messages.newPassword)}
                        />

                        <FormInputGroup
                          label={intl.formatMessage(messages.confirmPassword)}
                          name="confirmPassword"
                          onChange={props.handleChange}
                          type={'password'}
                          value={get(props.values, 'confirmPassword')}
                          placeholder={intl.formatMessage(messages.confirmPassword)}

                        />

                        <div className="text-right">
                          <CommonButton
                            primary
                            text={intl.formatMessage(messages.update)}
                            type={'submit'}
                            className={classNames(
                              Classes.LARGE,
                              Classes.FILL
                            )}
                          />
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </Wrapper>
            </Col>
          </Row>
        </Container>
      </StyledComponent>
    );
  }
}

ChangePasswordPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  changepasswordpage: makeSelectChangePasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePassword,
  }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'changePasswordPage', reducer });
const withSaga = injectSaga({ key: 'changePasswordPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl
)(ChangePasswordPage);
