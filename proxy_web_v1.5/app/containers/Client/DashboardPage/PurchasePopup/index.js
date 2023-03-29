import React from 'react';
import { injectIntl } from 'react-intl';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import ActionDialog from 'components/common/ActionDialog';
import { TO, convertDropdownList } from 'utils/utilHelper';
import messages from '../messages';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import getSchema from './validateSchema';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import { placeOrderProxy } from 'services/user.service';
import { errorCode } from 'constants/responseCode';
import FormInputGroup from 'components/common/FormInputGroup';
import auth from 'utils/auth';
import moment from 'moment';
import FormMoneyInputGroup from 'components/common/FormMoneyInputGroup';
import FormRadioGroup from 'components/common/FormRadioGroup';
import { formatCurrency, generateAuthProxy } from 'utils/numberHelper';

const StyledContainer = styled(ActionDialog)`
  
`;

class PurchasePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticateWithUsername: true,
      salePackage: {},
      initData: {
        authType: 'USERNAME',
        packageUuid: '',
        quantity: 1,
        time: 1,
        totalAmount: 0,
        username: '',
        whiteListIps: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.salePackage !== undefined) {
      const initData = {
        authType: 'USERNAME',
        packageUuid: '',
        quantity: 1,
        time: 1,
        totalAmount: nextProps.salePackage.price,
        username: generateAuthProxy(),
        whiteListIps: '',
      };
      this.setState({
        salePackage: {
          ...nextProps.salePackage,
        },
        initData,
      });
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { forceRefresh, handleOnClose, intl, salePackage } = this.props;

    const dataSubmit = {
      packageUuid: salePackage.uuid,
      quantity: values.quantity,
      time: values.time,
      username: values.username,
      whiteListIps: values.whiteListIps,
    };

    const [err, response] = await TO(placeOrderProxy(dataSubmit));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.buyProxyError));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.buyProxySuccess));
      handleOnClose();
      forceRefresh();
    } else if (response.message) {
      this.props.handleAlertError(response.message);
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.buyProxyError));
    }
    setSubmitting(false);
  }


  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
      selectedId,
    } = this.props;

    const {
      initData,
      salePackage,
      isAuthenticateWithUsername,
    } = self.state;

    const timeLabel = salePackage.packageUnit === 'DAY'
      ? intl.formatMessage(messages.day)
      : salePackage.packageUnit === 'WEEK' ? intl.formatMessage(messages.week)
        : intl.formatMessage(messages.month);

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={`${intl.formatMessage(messages.purchaseTitle)} ${salePackage.name}`}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={500}
      >
        <Wrapper className="m-4">
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={initData}
            enableReinitialize
            validationSchema={getSchema(intl, isAuthenticateWithUsername)}
            render={(props) => (
              <Form>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormMoneyInputGroup
                      didCheckErrors={false}
                      label={'Number of proxies'}
                      isAsterisk
                      name="quantity"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('quantity', true, true);
                        props.setFieldValue('totalAmount', salePackage.price * get(props.values, 'time', 0) * e.target.value);
                      }}
                      type={'number'}
                      value={get(props.values, 'quantity', [])}
                    />
                  </Col>
                </Row>
                {/* <Row>
                  <Col md={{ size: 12 }}>
                    <FormMoneyInputGroup
                      didCheckErrors={false}
                      label={timeLabel}
                      isAsterisk
                      name="time"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('time', true, true);
                        props.setFieldValue('totalAmount', salePackage.price * get(props.values, 'quantity', 0) * e.target.value);
                      }}
                      type={'number'}
                      value={get(props.values, 'time', [])}
                    />
                  </Col>
                </Row> */}
                <Row>
                  <Col>
                    <FormRadioGroup
                      options={[{
                        value: 'USERNAME',
                        label: 'Username:Password',
                      },
                      {
                        value: 'IP',
                        label: 'IP Whitelist',
                      }]}
                      name={'authType'}
                      label="Proxy authentication by:"
                      selectedValue={get(props.values, 'authType')}
                      {...props}
                      onChange={(value) => {
                        props.setFieldValue('authType', value);
                        props.setFieldValue('username', generateAuthProxy());
                        props.setFieldValue('whiteListIps', '');
                        this.setState({
                          isAuthenticateWithUsername: value === 'USERNAME',
                        });
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={{ size: 12 }}>
                    {isAuthenticateWithUsername ?
                      <FormInputGroup
                        didCheckErrors={false}
                        label={'Username:Password'}
                        name="username"
                        isTips
                        disabled
                        tips="Password will be generated randomly for each port. You can change during use."
                        onChange={(e) => {
                          props.handleChange(e);
                          props.setFieldTouched('username', true, true);
                        }}
                        type={'text'}
                        value={`${get(props.values, 'username', '')}`}
                        placeholder={'Password will be generated randomly for each port.'}
                        isRefreshButton
                        handleRefreshFunc={() => {
                          props.setFieldTouched('username', true, true);
                          props.setFieldValue('username', generateAuthProxy());
                        }}
                      />
                      :
                      <FormInputGroup
                        didCheckErrors={false}
                        label={'IP White list'}
                        name="whiteListIps"
                        isAsterisk
                        isTips
                        tips="IP whitelist: IP1,IP2,.... You can change during use."
                        onChange={(e) => {
                          props.handleChange(e);
                          props.setFieldTouched('whiteListIps', true, true);
                        }}
                        type={'text'}
                        value={get(props.values, 'whiteListIps', '')}
                        placeholder={'IP1,IP2'}
                      />
                    }
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      disabled
                      label={'Total amount (USD)'}
                      name="totalAmount"
                      type={'text'}
                      value={`${formatCurrency(get(props.values, 'totalAmount', 0))}`}
                      placeHolder={''}
                    />
                  </Col>
                </Row>
                <div className="d-flex flex-column align-items-center">
                  {selectedId === '' ?
                    <Button
                      primary
                      type="submit"
                      className="min-width-300 mt-4"
                      loading={false}
                    >{intl.formatMessage(messages.add)}</Button>
                    :
                    <div className="d-flex">
                      <Button
                        primary
                        type="submit"
                        className="min-width-100 mt-4 mr-1"
                        loading={props.isSubmitting}
                      >{intl.formatMessage(messages.buynow)}</Button>
                    </div>
                  }
                  <ButtonLink
                    onClick={handleOnClose}
                    type={'button'}
                  >{intl.formatMessage(messages.close)}</ButtonLink>
                </div>
              </Form>
           )}
          />
        </Wrapper>
      </StyledContainer>
    );
  }
}


PurchasePopup.propTypes = {
};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(PurchasePopup);
