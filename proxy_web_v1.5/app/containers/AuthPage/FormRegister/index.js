import React, { Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import FormRadioGroup from 'components/common/FormRadioGroup';
import { eUserType, userTypeMessages } from 'enums/EUserType';
import CustomLink from '../../../components/CustomLink';
import get from 'lodash/get';
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl';
import commonMessage from '../messages';
import messages from './messages';
import CommonButton from 'components/common/Button';
import iconRegister from 'images/formIcon/register.svg';
import { Form, Formik } from 'formik';
import getSchema from './validateSchema';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import FormInputGroup from 'components/common/FormInputGroup';
import FormOTPInput from 'components/Transactions/FormOTPInput';
import FormPasswordInput from 'components/Transactions/FormPasswordInput';
import { useLocation } from 'react-router-dom';
const USER_TYPES = [eUserType.INDIVIDUAL];
const USER_TYPE_DEFAULT = eUserType.INDIVIDUAL;
import auth from 'utils/auth';
import FormPhoneInput from 'components/Transactions/FormPhoneInput';

class FormRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValue: {
        name: '',
        userName: `Player ${Date.now()}`,
        email: '',
        password: '',
        confirm_password: '',
        type: USER_TYPE_DEFAULT,
        affiliateCode: '',
        address: '',
        city: '',
        country: '',
        phone: '',
      },
      userType: USER_TYPE_DEFAULT,
      inChargeOfConsulting: false,
      showBankerForm: false,
    };
  }

  componentWillMount() {
    const query = new URLSearchParams(location.search);
    let affiliateCode = query.get('code');
    if (affiliateCode !== null) {
      auth.set(affiliateCode, 'affiliate_code');
    } else {
      affiliateCode = auth.get('affiliate_code');
    }

    const { initialValue } = this.state;
    this.setState({
      initialValue: {
        ...initialValue,
        affiliateCode,
      },
    });
  }

  handleSubmit = (values, { setSubmitting }) => {
    const valueSubmit = {
      name: values.name,
      userName: values.userName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      affiliateCode: values.affiliateCode,
      address: values.address,
      city: values.city,
      country: values.country,
    };

    this.props.onSubmit(valueSubmit, () => {
      setSubmitting(false);
    });
  }

  handleChangeType = (type) => {
    this.setState({
      userType: type,
    });
  }

  render() {
    const { intl } = this.props;
    const { initialValue } = this.state;

    return (
      <Fragment>
        <Row>
          <Col xs={4}>
            <div className="form__icon">
              <img alt={''} src={iconRegister} />
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
          onSubmit={this.handleSubmit}
          initialValues={initialValue}
          enableReinitialize
          validationSchema={getSchema(intl)}
          render={(props) => (
            <Form>
              
              <FormInputGroup
                autoFocus
                label={intl.formatMessage(commonMessage.email)}
                name={'email'}
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'email')}
                placeholder={intl.formatMessage(commonMessage.enterEmail)}
                {...props}
                onBlur={props.handleBlur}
              />

              {/* <FormPhoneInput
                didCheckErrors={false}
                label={intl.formatMessage(commonMessage.phoneNumber)}
                name="phone"
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'phone')}
                placeholder={intl.formatMessage(commonMessage.enterPhoneNumber)}
                onBlur={props.handleBlur}
                inputRef={(ref) => { this.phoneInput = ref; }}
              /> */} 


              <FormPasswordInput
                label={intl.formatMessage(commonMessage.password)}
                name={'password'}
                onChange={props.handleChange}
                type={'password'}
                value={get(props.values, 'password')}
                placeholder={intl.formatMessage(messages.passwordPlaceHolder)}
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

              {/* <FormInputGroup*/}
              {/* label={'Mã người giới thiệu'}*/}
              {/* name={'affiliateCode'}*/}
              {/* onChange={props.handleChange}*/}
              {/* type={'text'}*/}
              {/* value={get(props.values, 'affiliateCode')}*/}
              {/* placeholder={'Nhập mã người giới thiệu'}*/}
              {/* {...props}*/}
              {/* onBlur={props.handleBlur}*/}
              {/* />*/}

              <FormInputGroup
                label={intl.formatMessage(commonMessage.name)}
                name={'name'}
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'name')}
                placeholder={intl.formatMessage(commonMessage.enterName)}
                {...props}
                autocomplete={'name'}
                onBlur={props.handleBlur}
              />

              {<FormInputGroup
                didCheckErrors={false}
                label={intl.formatMessage(commonMessage.address)}
                name="address"
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'address')}
                placeholder={intl.formatMessage(commonMessage.enterAddress)}
                onBlur={props.handleBlur}
              />}

              {<FormInputGroup
                didCheckErrors={false}
                label={intl.formatMessage(commonMessage.city)}
                name="city"
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'city')}
                placeholder={intl.formatMessage(commonMessage.enterCity)}
                onBlur={props.handleBlur}
              />} 

              {<FormInputGroup
                didCheckErrors={false}
                label={intl.formatMessage(commonMessage.country)}
                name="country"
                onChange={props.handleChange}
                type={'text'}
                value={get(props.values, 'country')}
                placeholder={intl.formatMessage(commonMessage.enterCountry)}
                onBlur={props.handleBlur}
              />} 

              <CommonButton
                primary
                className={classNames(Classes.LARGE, 'ml-auto', Classes.FILL)}
                type="submit"
                text={intl.formatMessage(messages.submit)}
                loading={props.isSubmitting}
              />

              <div className="form__link">
                <FormattedMessage {...messages.already_registered} />

                <CustomLink
                  to="/login"
                  className="ml-2"
                >
                  <FormattedMessage {...messages.link_signin} />
                </CustomLink>
              </div>
            </Form>
          )}
        />

      </Fragment>
    );
  }
}

FormRegister.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSendOTP: PropTypes.func.isRequired,
};

export default injectIntl(FormRegister);
