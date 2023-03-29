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
import { getMinAmount, getEstimatedAmount, createTransfer } from 'services/payment.service';
import { errorCode } from 'constants/responseCode';
import FormInputGroup from 'components/common/FormInputGroup';
import { formatCurrency, formatCryptoCurrency } from 'utils/numberHelper';
import FormMoneyInputGroup from 'components/common/FormMoneyInputGroup';
import DropdownList from 'components/common/DropdownList';
import FormLabel from 'components/common/FormLabel';

const StyledContainer = styled(ActionDialog)`
  
`;

class TopupPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedId: '',
      initData: {
        currency: '',
        amount: 0,
        minAmount: 0,
        estimatedAmount: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIds !== undefined) {
      this.setState({
        selectedId: nextProps.selectedId,
      });
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { forceRefresh, handleOnClose, intl, selectedId } = this.props;

    const data = {
      payCurrency: values.currency,
      priceCurrency: 'usd',
      priceAmount: values.amount,
    };

    const [err, response] = await TO(createTransfer(data));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgCreateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgCreateSuccess));
      handleOnClose();
      forceRefresh();
    } else if (response.message) {
      this.props.handleAlertError(response.message);
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    setSubmitting(false);
  }

  handleLoadMinAmount = async (currency, props) => {
    const data = await getMinAmount(currency);
    const minAmount = get(data, 'data.min_amount');
    props.setFieldValue('minAmount', minAmount);
  }

  handleEstimatedAmount = async (amount, currency, props) => {
    const data = await getEstimatedAmount(currency, amount);
    const estimatedAmount = get(data, 'data.estimated_amount');
    props.setFieldValue('estimatedAmount', estimatedAmount);
  }


  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
      currencies,
    } = this.props;

    const {
      initData,
    } = self.state;

    const currencyOptions = convertDropdownList(currencies.map((i) => ({ name: i, id: i })));

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Deposit Crypto'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={600}
      >
        <Wrapper className="m-4">
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={initData}
            enableReinitialize
            validationSchema={getSchema(intl)}
            render={(props) => (
              <Form>
                <DropdownList
                  label={'Crypto currencies'}
                  isAsterisk
                  name="currency"
                  value={currencyOptions.find((option) =>
                    option.value === get(props.values, 'currency', 0)
                  )}
                  options={currencyOptions}
                  onChange={(option) => {
                    props.setFieldTouched('currency', true);
                    props.setFieldValue('currency', option.value);
                    props.setFieldValue('amount', 0);
                    props.setFieldValue('estimatedAmount', 0);
                    this.handleLoadMinAmount(option.value, props);
                  }}
                  {...props}
                />

                <FormMoneyInputGroup
                  label={'Input Amount (USD)'}
                  name="amount"
                  decimalScale={2}
                  onChange={(e) => {
                    props.setFieldTouched('amount', true);
                    props.setFieldValue('amount', e.target.value);
                    this.handleEstimatedAmount(e.target.value, get(props.values, 'currency'), props);
                  }}
                  value={get(props.values, 'amount')}
                  {...props}
                />
                <FormInputGroup
                  disabled
                  label={'Min Amount (Coin)'}
                  name="minAmount"
                  type={'text'}
                  value={`${formatCryptoCurrency(get(props.values, 'minAmount', 0))}`}
                  placeHolder={''}
                />
                <FormInputGroup
                  disabled
                  label={'Estimate Amount (Coin)'}
                  name="estimatedAmount"
                  type={'text'}
                  value={`${formatCryptoCurrency(get(props.values, 'estimatedAmount', 0))}`}
                  placeHolder={''}
                />

                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex">
                    <Button
                      primary
                      type="submit"
                      className="min-width-100 mt-4 mr-1"
                      loading={props.isSubmitting}
                    >Create</Button>
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


TopupPopup.propTypes = {};

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
)(TopupPopup);
