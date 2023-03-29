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
import { topup } from 'services/admin/customer.service';
import { getPaymentUrl } from 'services/payment.service';
import { errorCode } from 'constants/responseCode';
import FormInputGroup from 'components/common/FormInputGroup';
import { formatCurrency, formatCryptoCurrency } from 'utils/numberHelper';
import FormMoneyInputGroup from 'components/common/FormMoneyInputGroup';
import DropdownList from 'components/common/DropdownList';
import FormLabel from 'components/common/FormLabel';

const StyledContainer = styled(ActionDialog)`
  
`;

class CheckoutPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { forceRefresh, handleOnClose, intl } = this.props;

    const [err, response] = await TO(getPaymentUrl(values.amount));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgCreateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgCreateSuccess));
      handleOnClose();
      forceRefresh();
      window.open(response.data, '_blank');
    } else if (response.message) {
      this.props.handleAlertError(response.message);
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    setSubmitting(false);
  }


  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
    } = this.props;

    const {
      initData,
    } = self.state;


    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Deposit Money'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={400}
      >
        <Wrapper className="m-4">
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={initData}
            enableReinitialize
            validationSchema={getSchema(intl)}
            render={(props) => (
              <Form>

                <FormMoneyInputGroup
                  label={'Input Amount (USD)'}
                  name="amount"
                  decimalScale={2}
                  onChange={(e) => {
                    props.setFieldTouched('amount', true);
                    props.setFieldValue('amount', e.target.value);
                  }}
                  value={get(props.values, 'amount')}
                  {...props}
                />

                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex">
                    <Button
                      primary
                      type="submit"
                      className="min-width-100 mt-4 mr-1"
                      loading={props.isSubmitting}
                    >Create Checkout</Button>
                  </div>
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


CheckoutPopup.propTypes = {};

const Wrapper = styled.div`
  margin-bottom: 10px;

  .content {
    border: 1px solid ${(props) => props.theme.colors.gray300};
    display: flex;
    flex-wrap: wrap;

    .label {
      color: ${(props) => props.theme.colors.black};
      font-size: ${(props) => props.theme.fontSizes.small12};
      opacity: 0.5;
    }

    .bold-text {
      color: ${(props) => props.theme.colors.black};
      font-size: ${(props) => props.theme.fontSizes.normal};
      font-weight: ${(props) => props.theme.fontWeights.strong};
      opacity: 0.8;
    }

    .group {
      padding: 10px 18px;
      background-color: ${(props) => props.theme.colors.white};
      width: 50%;

      &.gray {
        background-color: ${(props) => props.theme.colors.gray};
      }
    }
  }
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(CheckoutPopup);
