import React, { Fragment } from 'react';
import StyledContainer from 'containers/Client/RechargePage/styles';
import { forwardTo } from '../../../utils/history';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { TO, convertDropdownList } from 'utils/utilHelper';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { Elevation } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';
import { getUserBalance } from 'services/user.service';
import { getCurrencies } from 'services/payment.service';
import { formatCurrency } from 'utils/numberHelper';
import TransactionList from './TransactionList';
import Card from 'components/Card';
import ButtonCreate from 'components/common/ButtonCreate';
import TopupPopup from './TopupPopup';
import CheckoutPopup from './CheckoutPopup';
import GuidePopup from './GuidePopup';

export class RechargePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      intervalId: 0,
      config: {
        balance: 0,
        uuid: '',
        stripeEnable: 0,
      },
      currencies: [],
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.handleRecharge(true);
    this.loadInitData();

    const query = new URLSearchParams(location.search);
    const payment = query.get('payment');
    const result = query.get('result');
    if (payment !== null && payment === 'stripe') {
      if (result !== null && result === 'success') {
        this.props.handleAlertSuccess('Thanks for your recharge. Please check at Transaction History!');
      } else {
        this.props.handleAlertError('System is interrupted. Please try again or contact support!');
      }
    }
  }

  loadInitData = async () => {
    const resp = await getCurrencies();
    this.setState({
      currencies: resp && resp.code === 1 ? resp.data : [],
    });
  }


  componentDidMount() {
    const intervalId = setInterval(this.handleRecharge.bind(this), 5000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  forceRefresh = () => {
    this.setState({
      forceRefresh: !this.state.forceRefresh,
    });
  }

  handleRecharge(isFirst) {
    this.props.handlePromise(getUserBalance(), (response) => {
      if (response.balance !== this.state.config.balance && !isFirst) {
        this.props.handleAlertSuccess(`Recharge successful. New balance $${formatCurrency(response.balance)}`);
        this.forceRefresh();
      }

      this.setState({
        config: {
          ...response,
        },
      });
    });
  }

  handleUpdateList = (data) => {
    this.setState({
      dataList: data,
    });

    if (data) {
      data.forEach((item) => {
        if (item.status === 'PROCESSING' && item.note !== '') {
          this.handleGuide(true, item.uuid);
        }
      });
    }
  }

  handleTopup = (isOpen = true) => {
    this.setState({
      isOpenTopup: isOpen,
    });
  }

  handleCheckout = (isOpen = true) => {
    this.setState({
      isOpenCheckout: isOpen,
    });
  }

  handleGuide = (isOpen = true, selectedId) => {
    const { dataList } = this.state;
    const selectedObject = dataList.find((item) => item.uuid === selectedId);

    this.setState({
      isOpenGuide: isOpen,
      selectedObject,
    });
  }

  getKeyFromFilteredList = () => {
    const { forceRefresh } = this.state;
    return `${forceRefresh}`;
  }


  render() {
    const { intl } = this.props;
    const { dataList, config, isOpenTopup, isOpenCheckout, isOpenGuide, currencies, selectedObject } = this.state;

    return (
      <StyledContainer>
        <Fragment>
          <Row className="p-12">
            <Col md={{ size: 12 }} className="pl-5 pr-5 pt-1">
              <Card className="align-items-start pb-3">
                <div className="d-flex">
                  <h5><i className="fa fa-dolly-flatbed" />
                    &nbsp; TOPUP YOUR ACCOUNT WITH <strong>CRYPTO NOW</strong> TO PURCHASE A PROXY
                  </h5>
                  <div className="ml-3">
                    <ButtonCreate
                      onClick={() => this.handleTopup(true)}
                      animation
                      title={'Topup'}
                    />
                  </div>
                </div>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 1. Click the 'Add Funds' button to begin
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 2. Choose the currency between BTC or USDT (Trc20)
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 3. Input the amount you want to deposit, and create the order.
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 4.  Once payment has been completed, the funds will be available to purchase.
                </span>
              </Card>
            </Col>
          </Row>

          {config.stripeEnable === 1 &&
          <Row className="p-12">
            <Col md={{ size: 12 }} className="pl-5 pr-5 pt-1">
              <Card className="align-items-start pb-3">
                <div className="d-flex">
                  <h5><i className="fa fa-dolly-flatbed" />
                    &nbsp; TOPUP YOUR ACCOUNT WITH <strong>YOUR CARD</strong> TO PURCHASE A PROXY
                  </h5>
                  <div className="ml-3">
                    <ButtonCreate
                      onClick={() => this.handleCheckout(true)}
                      animation
                    />
                  </div>
                </div>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 1. Click the 'Add Funds' button to begin.
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 2. Input the amount you want to deposit, and create the checkout.
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 3. You’re redirected to the Stripe Checkout payment form.
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 4. Fill out the payment details with the card information.
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 5. Click Pay.
                </span>
                <span style={{ textAlign: 'left', fontSize: 16 }}>
                  <i className="fa fa-check" /> 6. You’re redirected to your new success page. The funds will be available to purchase.
                </span>
              </Card>
            </Col>
          </Row>
          }

          <Row className="p-12 mt-2">
            <Col md={{ size: 12 }} className="pl-5 pr-5 pt-1">
              <div>
                <Row className="mt-3">
                  <Col md={{ size: 12 }}>
                    <h6>Transaction History</h6>
                    <Card>
                      <div className="mb-2 d-flex justify-content-end" style={{ width: '100%' }}>
                      </div>
                      <TransactionList
                        dataList={dataList}
                        getKeyFromFilteredList={this.getKeyFromFilteredList}
                        handleUpdateList={this.handleUpdateList}
                        handleGuide={this.handleGuide}
                      />
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

        </Fragment>
        <TopupPopup
          isOpen={isOpenTopup}
          handleOnClose={() => this.handleTopup(false)}
          forceRefresh={this.forceRefresh}
          currencies={currencies}
        />
        <CheckoutPopup
          isOpen={isOpenCheckout}
          handleOnClose={() => this.handleCheckout(false)}
          forceRefresh={this.forceRefresh}
        />
        <GuidePopup
          isOpen={isOpenGuide}
          handleOnClose={() => this.handleGuide(false)}
          forceRefresh={this.forceRefresh}
          transaction={selectedObject}
        />
      </StyledContainer>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(RechargePage);
