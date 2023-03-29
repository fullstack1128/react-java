import React, { Fragment } from 'react';
import StyledContainer from 'containers/Client/DashboardPage/styles';
import { forwardTo } from '../../../utils/history';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import { TO, convertDropdownList } from 'utils/utilHelper';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { Card, Elevation } from '@blueprintjs/core';
import { Row, Col } from 'reactstrap';
import { getPackages } from 'services/admin/package.service';
import { getUserBalance } from 'services/user.service';
import { formatCurrency } from 'utils/numberHelper';
import PurchasePopup from './PurchasePopup';
import PackageItem from './PackageItem';

export class OverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      salePackages: [],
      salePackage: null,
      isOpenPopup: false,
      forceRefresh: false,
      proxyType: 'MOBILE',
      config: {
        balance: 0,
        totalLicense: 0,
        totalExpiredLicense: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.handleGetPackages();
    this.handleGetUserInfo();
  }

  handleGetPackages = () => {
    const requestBody = {
      filtered: [{
        id: 'status',
        value: 'ACTIVE',
      }],
      pageSize: 100,
      page: 0,
    };
    this.props.handlePromise(getPackages(requestBody), (response) => {
      const { data } = response.data;
      this.setState({
        salePackages: data,
      });
    });
  }

  handleGetUserInfo = () => {
    this.props.handlePromise(getUserBalance(), (response) => {
      this.setState({
        config: {
          ...response,
        },
      });
    });
  }

  togglePopup = (isOpen = true, selectedId) => {
    if (isOpen) {
      const { salePackages } = this.state;
      const selectedObject = salePackages.find((item) => item.uuid === selectedId);

      this.setState({
        selectedId,
        selectedObject,
      });
    } else {
      this.handleGetUserInfo();
    }
    this.setState({
      isOpenPopup: isOpen,
    });
  }


  render() {
    const { intl } = this.props;
    const { dataList, salePackages, isOpenPopup, selectedObject, config } = this.state;

    const mobilePackageDays = salePackages.filter((i) => i.packageUnit === 'DAY');
    const mobilePackageWeeks = salePackages.filter((i) => i.packageUnit === 'WEEK');
    const mobilePackageMonths = salePackages.filter((i) => i.packageUnit === 'MONTH');

    return (
      <StyledContainer>
        <Fragment>
          <Row className="p-12">
            <Col md={{ size: 12 }} className="m-3">
              <div>
                <Row>
                  <Col md={{ size: 3 }}>
                    <Card interactive className="bg-info card-info">
                      <h6 className="text-white">Balance: <b>${formatCurrency(config.balance)}</b></h6>
                    </Card>
                  </Col>
                  <Col md={{ size: 3 }}>
                    <Card interactive className="bg-info card-info">
                      <h6 className="text-white">Total license: <b>{config.totalLicense}</b></h6>
                    </Card>
                  </Col>
                  <Col md={{ size: 4 }}>
                    <Card interactive className="bg-info card-info">
                      <h6 className="text-white">
                        Total license expires today: <b>{config.totalExpiredLicense}</b></h6>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 12 }} className="m-3">
              <div>
                <h5>List package</h5>
                <div>
                  <Row>
                    { mobilePackageDays.map((salePkg) => (
                      <Col md={{ size: 3 }}>
                        <PackageItem
                          salePkg={salePkg}
                          unit={intl.formatMessage(messages.day)}
                          onClick={() => this.togglePopup(true, salePkg.uuid)}
                        />
                      </Col>
                        )) }
                  </Row>
                  <Row>
                    { mobilePackageWeeks.map((salePkg) => (
                      <Col md={{ size: 3 }}>
                        <PackageItem
                          salePkg={salePkg}
                          unit={intl.formatMessage(messages.week)}
                          onClick={() => this.togglePopup(true, salePkg.uuid)}
                        />
                      </Col>
                        )) }
                  </Row>
                  <Row>
                    { mobilePackageMonths.map((salePkg) => (
                      <Col md={{ size: 3 }}>
                        <PackageItem
                          salePkg={salePkg}
                          unit={intl.formatMessage(messages.month)}
                          onClick={() => this.togglePopup(true, salePkg.uuid)}
                        />
                      </Col>
                        )) }
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <PurchasePopup
            isOpen={isOpenPopup}
            salePackage={selectedObject}
            handleOnClose={() => this.togglePopup(false)}
            forceRefresh={this.forceRefresh}
          />

        </Fragment>
      </StyledContainer>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(OverviewPage);
