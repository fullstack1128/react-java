import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ModemPage/styles';
import Card from 'components/Card';
import TransactionList from './TransactionList';
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
import AdvancedSearchPopup from './AdvancedSearchPopup';
import ConfirmDialog from 'components/common/ConfirmDialog';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';

export class ModemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      selectedId: props.match.params.id,
      forceRefresh: false,
      filteredList: {
        name: '',
        type: '',
        email: '',
      },
      isConfirm: false,
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
            -${filteredList.type}
            -${filteredList.email}
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

  handleSelectRow = (id) => {
    alert('Developing');
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
        type: '',
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

  render() {
    const { intl } = this.props;
    const { filteredList, dataList, isOpenAdvancedSearch, isConfirm } = this.state;

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
                      placeholder={'Transaction code'}
                    />
                  </div>
                  {/* <div className={'col-md-2'}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Type'}
                      name="type"
                      onChange={(e) => {
                        this.handleSearch('type', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.type}
                      placeholder={''}
                    />
                  </div> */}
                  <div className={'col-md-2'}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Customer email'}
                      name="email"
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

            <TransactionList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              handleRemoveRow={this.handleRemoveRow}
              forceRefresh={this.forceRefresh}
            />
          </Card>
          <AdvancedSearchPopup
            isOpen={isOpenAdvancedSearch}
            handleOnClose={() => this.handleAdvancedSearch(false)}
            filteredList={filteredList}
            handleMultiSearch={this.handleMultiSearch}
          />
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
      </StyledContainer>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(ModemPage);
