import React from 'react';
import saga from './saga';
import reducer from './reducer';
import { bindActionCreators, compose } from 'redux';
import FormLogin from './FormLogin/index';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import FormRegister from './FormRegister/index';
import { eUserType } from 'enums/EUserType';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import messages from './messages';

import {
  getBanks,
  getProvinces,
  initDataRegister,
  submit,
  submitForgotPasswordOTP,
  submitOTP,
  uploadAvatar,
  uploadContractFile,
  uploadPhotoCard,
} from './actions';
import injectReducer from 'utils/injectReducer';
import {
  FORM_TYPE_CREATE_PASSWORD_VI,
  FORM_TYPE_FORGOT_PASSWORD_VI,
  FORM_TYPE_LOGIN_VI,
  FORM_TYPE_REGISTER_VI,
  FORM_TYPE_REGISTER_SUCCESS_VI,
  KEY_APP,
} from 'containers/AuthPage/constants';
import FormForgotPassword from './FormForgotPassword';
import FormCreatePassword from './FormCreatePassword';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import Wrapper from './styled/Wrapper';
import Container from 'reactstrap/es/Container';
import FormRegisterSuccess from './FormRegisterSuccess';
import { CommonToaster } from '../../components/CommonToaster';
import { Intent } from '@blueprintjs/core';
import background from 'images/background.png';
import styled from 'styled-components';
import breakpoint from '../../styles/breakpoint';
import messagesRegister from './FormRegister/messages';
import { eVerifyCodeType } from '../../enums/EVerifyCodeType';
import { getErrorMessageFromError } from '../../constants/responseCode/utils';
import { history } from 'history';


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
  
  .left-content {
    .block {
      margin: 25% 10% 5% 5%;
      h3 {
        font-weight: 600;
        font-size: 2.2rem;
        color: #216883;
      }
      span {
        font-size: 1.1rem;
        line-height: 1.75rem;
        color: #174b7a;
        opacity: 0.9;
      }
    }
  }
`;

export class AuthPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      createLoginObj: {
        phone: '',
        password: '',
        remember_me: false,
      },
      createRegisterObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
        address: '',
        city: '',
        country: '',
        type: eUserType.INDIVIDUAL,
      },
      createForgotPasswordObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
      },
      createCompleteProfileObj: {
        avatar: '',
        photo_card_front_url: '',
        photo_card_back_url: '',
        contract_url: '',
      },
      errorMessage: null,
      sentCode: false,
      phoneNumber: '',
      bankOptions: [],
      provinceOptions: [],
    };

    this.handleSubmitSendOTP = this.handleSubmitSendOTP.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    this.callbackError = this.callbackError.bind(this);
    this.handleResetFields = this.handleResetFields.bind(this);
    this.handleSubmitForgotPassword = this.handleSubmitForgotPassword.bind(this);
    this.handleSubmitSendOTPForgotPassword = this.handleSubmitSendOTPForgotPassword.bind(this);
    this.handleSubmitCreatePassword = this.handleSubmitCreatePassword.bind(this);
    this.getBanksSuccess = this.getBanksSuccess.bind(this);
    this.uploadAvatarSuccess = this.uploadAvatarSuccess.bind(this);
    this.getProvinceSuccess = this.getProvinceSuccess.bind(this);
    this.uploadPhotoCardSuccess = this.uploadPhotoCardSuccess.bind(this);
    this.handleSubmitCompleteProfile = this.handleSubmitCompleteProfile.bind(this);
    this.uploadContractFileSuccess = this.uploadContractFileSuccess.bind(this);
  }

  componentDidMount() {
    this.handleResetFields();
  }

  handleResetFields(cbData) {
    this.setState({
      createLoginObj: {
        phone: '',
        password: '',
        remember_me: false,
      },

      createRegisterObj: {
        phone: '',
        password: '',
        confirm_password: '',
        code: '',
        address: '',
        city: '',
        country: '',
        type: eUserType.INDIVIDUAL,
      },

      createForgotPasswordObj: {
        phone: cbData ? cbData.phone : '',
        password: '',
        confirm_password: '',
        code: cbData ? cbData.code : '',
        typeCode: cbData ? cbData.typeCode : eVerifyCodeType.FORGOT_PASSWORD,
      },

      createCompleteProfileObj: {
        avatar: '',
        photo_card_front_url: '',
        photo_card_back_url: '',
        contract_url: '',
      },

      errorMessage: '',
      sentCode: false,
      phoneNumber: cbData ? cbData.phone : '',
      userID: cbData ? cbData.id : '',
      userType: cbData ? cbData.type : '',
      userStatus: cbData ? cbData.status : '',
    });
  }

  handleSubmitLogin(dtoObj, cb) {
    this.props.onSubmit(
      {
        ...dtoObj,
      },
      FORM_TYPE_LOGIN_VI,
      (err) => {
        cb();
        this.callbackError(err);
      },
      (user) => {
        cb();
        this.handleResetFields(user);
      }
    );
  }

  handleSubmitSendOTP(phone) {
    this.setState({
      sentCode: true,
    });
    this.props.onSubmitSendOTP(phone, this.callbackError);
  }

  handleSubmitRegister(dtoObj, cb) {
    this.props.onSubmit(
      dtoObj,
      FORM_TYPE_REGISTER_VI,
      (err) => {
        cb();
        this.callbackError(err);
      },
      (user) => {
        cb();
        this.handleResetFields(user);
        CommonToaster.show({
          message: this.props.intl.formatMessage(messagesRegister.registerSuccess),
          intent: Intent.SUCCESS,
        });
      }
    );
  }

  handleSubmitConfirmOTP = (values, cb) => {
    this.props.onSubmit(
      {
        ...values,
      },
      (err) => {
        cb();
        this.callbackError(err);
      },
      () => {
        cb();
        this.handleResetFields();
      }
    );
  };

  handleSubmitSendOTPForgotPassword(phone) {
    this.setState({
      sentCode: true,
    });
    this.props.onSubmitSendOTPForgotPassword(phone, this.callbackError);
  }

  handleSubmitForgotPassword(dtoObj) {
    const { phone, code } = dtoObj;
    const createForgotPasswordObj = { ...this.state.createForgotPasswordObj };

    createForgotPasswordObj.phone = phone;
    createForgotPasswordObj.code = code;

    this.setState({
      createForgotPasswordObj,
    }, () => {
      this.props.onSubmit(
        dtoObj,
        FORM_TYPE_FORGOT_PASSWORD_VI,
        this.callbackError,
        this.handleResetFields
      );
    });
  }

  handleSubmitCreatePassword(dtoObj) {
    const { phone, code, typeCode } = this.state.createForgotPasswordObj;
    dtoObj.phone = phone;
    dtoObj.code = code;
    dtoObj.typeCode = typeCode;

    this.props.onSubmit(
      dtoObj,
      FORM_TYPE_CREATE_PASSWORD_VI,
      (err) => {
        CommonToaster.show({
          message: 'Đổi mật khẩu không thành công. Vui lòng nhập đúng email/mật khẩu cũ!',
          intent: Intent.DANGER,
        });
      },
      (user) => {
        this.handleResetFields(user);
        CommonToaster.show({
          message: 'Đổi mật khẩu thành công.',
          intent: Intent.SUCCESS,
        });
      }
    );
  }

  handleSubmitCompleteProfile(values) {
    this.props.onSubmit(
      {
        ...values,
        id: this.state.userID,
      },
      this.callbackError,
      this.handleResetFields
    );
  }

  callbackError(errorObj) {
    CommonToaster.show({
      message: this.props.intl.formatMessage(getErrorMessageFromError(errorObj)),
      intent: Intent.DANGER,
    });
  }

  getBanksSuccess(banks) {
    this.setState({ bankOptions: banks });
  }

  getProvinceSuccess(provinces) {
    this.setState({ provinceOptions: provinces });
  }

  uploadAvatarSuccess(url) {
    const { createCompleteProfileObj } = this.state;
    createCompleteProfileObj.avatar = url;

    this.setState({ createCompleteProfileObj });
  }

  uploadPhotoCardSuccess(url, type) {
    const { createCompleteProfileObj } = this.state;
    createCompleteProfileObj[`photo_card_${type}_url`] = url;

    this.setState({ createCompleteProfileObj });
  }

  uploadContractFileSuccess(url) {
    const { createCompleteProfileObj } = this.state;
    createCompleteProfileObj.contract_url = url;

    this.setState({ createCompleteProfileObj });
  }

  renderForm() {
    const { authType } = this.props.match.params;
    switch (authType) {
      case FORM_TYPE_LOGIN_VI:
        return (
          <FormLogin
            onSubmit={this.handleSubmitLogin}
            modifiedData={this.state.createLoginObj}
            errorMessages={this.state.errorMessage}
          />
        );

      case FORM_TYPE_REGISTER_VI:
        return (
          <FormRegister
            onSubmit={this.handleSubmitRegister}
            onSendOTP={this.handleSubmitSendOTP}
            modifiedData={this.state.createRegisterObj}
            errorMessages={this.state.errorMessage}
            sentOTP={this.state.sentCode}
            initDataBankerForm={this.props.initDataRegister}
            uploadPhotoCard={this.props.uploadPhotoCard}
          />
        );

      case FORM_TYPE_FORGOT_PASSWORD_VI:
        return (
          <FormForgotPassword
            onSubmit={this.handleSubmitForgotPassword}
            onSendOTP={this.handleSubmitSendOTPForgotPassword}
            errorMessages={this.state.errorMessage}
            sentOTP={this.state.sentCode}
          />
        );

      case FORM_TYPE_CREATE_PASSWORD_VI:
        return (
          <FormCreatePassword
            onSubmit={this.handleSubmitCreatePassword}
            modifiedData={this.state.createForgotPasswordObj}
            errorMessages={this.state.errorMessage}
          />
        );

      default:
        return <div />;
    }
  }

  render() {
    const { intl } = this.props;
    const { authType } = this.props.match.params;
    if (authType === FORM_TYPE_REGISTER_SUCCESS_VI) {
      return (
        <FormRegisterSuccess
          userStatus={this.state.userStatus}
          userType={this.state.userType}
        />
      );
    }
    return (
      <StyledComponent>
        <Container>
          <Row>
            <Col md={{ size: 5 }} className="left-content">
              <div className="block">
                <img alt="NeoProxy" width="400" src="https://soax.com/content/uploads/2020/07/soax-icon-big-2-data-center-proxy-net.svg" />
                <h3 className="mt-5 mb-3">{intl.formatMessage(messages.info1)}<br /> PROXY / SOCKS5.</h3>
                <span>{intl.formatMessage(messages.info2)}</span>
              </div>
            </Col>
            <Col md={{ size: 7 }} className="mt-5">
              <Wrapper>
                <div className="form__content">
                  {this.renderForm()}
                </div>
              </Wrapper>
            </Col>
          </Row>
        </Container>
      </StyledComponent>
    );
  }
}

AuthPage.propTypes = {
  match: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitSendOTP: PropTypes.func,
  onSubmitSendOTPForgotPassword: PropTypes.func,
  getBanks: PropTypes.func,
  getProvinces: PropTypes.func,
  uploadPhotoCard: PropTypes.func,
  uploadContractFile: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSubmit: submit,
    onSubmitSendOTP: submitOTP,
    onSubmitSendOTPForgotPassword: submitForgotPasswordOTP,
    getBanks,
    uploadAvatar,
    getProvinces,
    uploadPhotoCard,
    uploadContractFile,
    initDataRegister,
  }, dispatch);
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: KEY_APP, reducer });
const withSaga = injectSaga({ key: KEY_APP, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl
)(AuthPage);
