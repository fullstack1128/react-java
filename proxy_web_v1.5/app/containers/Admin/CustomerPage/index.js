import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ModemPage/styles';
import Card from 'components/Card';
import CustomerList from './CustomerList';
import FormInputGroup from 'components/common/FormInputGroup';
import { forwardTo } from '../../../utils/history';
import ButtonCreate from 'components/common/ButtonCreate';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import FilterDropdownGroupWrapper from 'components/FilterDropdownWrapper';
import { TO, convertDropdownList } from 'utils/utilHelper';
import DropdownList from 'components/DropdownList';
import ConfirmDialog from 'components/common/ConfirmDialog';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import ChangePasswordPopup from './ChangePasswordPopup';
import TopupPopup from './TopupPopup';
import RefundPopup from './RefundPopup';
import CustomerPopup from './CustomerPopup';

export class CustomerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      selectedId: null,
      forceRefresh: false,
      filteredList: {
        name: '',
        email: '',
      },
      isConfirm: false,
      isOpenChangePassword: false,
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.loadInitData();
  }

  loadInitData = async () => {

  }

  getKeyFromFilteredList = () => {
    const { filteredList, forceRefresh } = this.state;
    return `${filteredList.name}
            -${filteredList.email}
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

  handleSelectRow = (id) => {
    this.setState({
      isOpenChangePassword: true,
      selectedId: id,
    });
  };

  handleCloseDetails = () => () => {
    forwardTo(routes.ADMIN_MODEM);
  };

  forceRefresh = () => {
    this.setState({
      forceRefresh: !this.state.forceRefresh,
    });
  }

  handleSearch = (name, value) => {
    this.setState((prevState) => ({
      filteredList: {
        ...prevState.filteredList,
        [name]: value,
      },
    }));
  }

  handleMultiSearch = (payload) => {
    this.setState((prevState) => ({
      filteredList: {
        ...prevState.filteredList,
        ...payload,
      },
    }));
  }

  handleClearAllFilters = () => {
    this.setState({
      filteredList: {
        name: '',
        email: '',
      },
    });
  }

  handleAdvancedSearch = (isOpen = true) => {
    this.setState({
      isOpenAdvancedSearch: isOpen,
    });
  }

  handleRemoveRow = (id) => {
    this.setState({
      selectedId: id,
      isConfirm: true,
    });
  }

  handleCloseConfirmPopup = () => {
    this.setState({
      isConfirm: false,
    });
  }

  handleAcceptConfirmPopup = async () => {
    const { intl } = this.props;
    const { selectedId } = this.state;

    this.setState({
      isConfirm: false,
    });
  }

  togglePopup = (isOpen = true) => {
    this.setState({
      isOpenChangePassword: isOpen,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
      });
    }
  }

  handleTopup = (isOpen = true, id = null) => {
    this.setState({
      isOpenTopup: isOpen,
      selectedId: id,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
      });
    }
  }

  handleRefund = (isOpen = true, id = null) => {
    this.setState({
      isOpenRefund: isOpen,
      selectedId: id,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
      });
    }
  }

  handleUpdateCustomer = (isOpen = true, id = null) => {
    this.setState({
      isOpenCustomer: isOpen,
      selectedId: id,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
      });
    }
  }

  render() {
    const { intl } = this.props;
    const { filteredList,
      dataList,
      isOpenAdvancedSearch,
      isConfirm,
      isOpenChangePassword,
      isOpenTopup,
      isOpenRefund,
      isOpenCustomer,
      selectedId,
    } = this.state;

    return (
      <StyledContainer>
        <Fragment>
          <Card>
            <div className="margin-bottom-13 d-flex justify-content-between">
              <FilterDropdownGroupWrapper>
                <div className="row no-gutters min-width-100">
                  <div className={'col-md-2'}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={intl.formatMessage(messages.search)}
                      name="name"
                      onChange={(e) => {
                        this.handleSearch('name', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.name}
                      placeholder={'Name'}
                    />
                  </div>
                  <div className={'col-md-2'}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Email'}
                      name="name"
                      onChange={(e) => {
                        this.handleSearch('email', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.email}
                      placeholder={'Email'}
                    />
                  </div>
                </div>
              </FilterDropdownGroupWrapper>
            </div>
            <CustomerList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              handleRemoveRow={this.handleRemoveRow}
              forceRefresh={this.forceRefresh}
              handleTopup={this.handleTopup}
              handleRefund={this.handleRefund}
              handleUpdateCustomer={this.handleUpdateCustomer}
            />
          </Card>
        </Fragment>
        <ConfirmDialog
          message={intl.formatMessage(messages.messageConfirm)}
          title={intl.formatMessage(messages.titleConfirm)}
          isOpen={isConfirm}
          confirmButtonText={intl.formatMessage(messages.confirmButton)}
          cancelButtonText={intl.formatMessage(messages.cancelButton)}
          onConfirm={this.handleAcceptConfirmPopup}
          onClose={this.handleCloseConfirmPopup}
          focusCloseButton
        />
        <ChangePasswordPopup
          isOpen={isOpenChangePassword}
          selectedId={selectedId}
          handleOnClose={() => this.togglePopup(false)}
          forceRefresh={this.forceRefresh}
        />
        <TopupPopup
          isOpen={isOpenTopup}
          selectedId={selectedId}
          handleOnClose={() => this.handleTopup(false)}
          forceRefresh={this.forceRefresh}
        />
        <RefundPopup
          isOpen={isOpenRefund}
          selectedId={selectedId}
          handleOnClose={() => this.handleRefund(false)}
          forceRefresh={this.forceRefresh}
        />
        <CustomerPopup
          isOpen={isOpenCustomer}
          selectedId={selectedId}
          handleOnClose={() => this.handleUpdateCustomer(false)}
          forceRefresh={this.forceRefresh}
        />
      </StyledContainer>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(CustomerPage);
