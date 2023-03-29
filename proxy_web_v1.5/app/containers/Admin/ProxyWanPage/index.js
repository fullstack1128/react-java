import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ProxyWanPage/styles';
import Card from 'components/Card';
import ProxyList from './ProxyList';
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
import get from 'lodash/get';
import { getProxyStatusOptions } from './utils';
import { getModems } from 'services/admin/modem.service';
import GeneratePopup from './GeneratePopup';
import Button from 'components/common/Button';
import { deleteProxies } from 'services/admin/proxy.service';

export class ProxyWanList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      forceRefresh: false,
      filteredList: {
        name: '',
        license: '',
        status: '',
        host: '',
        port: '',
        authUserName: '',
        authIps: '',
        saleStatus: '',
        modemId: '',
      },
      isConfirm: false,
      modems: [],
      isSelectedOption: false,
      selectedIds: [],
      selectedId: null,
      isSelectedAll: false,
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.loadInitData();
  }

  loadInitData = async () => {
    const modems = await getModems({
      filtered: [],
      pageSize: 100,
      page: 0,
    });
    this.setState({
      modems: modems.data.data,
    });
  }

  getKeyFromFilteredList = () => {
    const { filteredList, forceRefresh } = this.state;
    return `${filteredList.name}
            -${filteredList.license}
            -${filteredList.status}
            -${filteredList.host}
            -${filteredList.port}
            -${filteredList.authUserName}
            -${filteredList.authIps}
            -${filteredList.saleStatus}
            -${filteredList.modemId}
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

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
        license: '',
        status: '',
        host: '',
        port: '',
        authUserName: '',
        authIps: '',
        saleStatus: '',
        modemId: '',
      },
    });
  }

  handleAdvancedSearch = (isOpen = true) => {
    this.setState({
      isOpenAdvancedSearch: isOpen,
    });
  }


  handleCloseConfirmPopup = () => {
    this.setState({
      isConfirm: false,
    });
  }

  handleAcceptConfirmPopup = async () => {
    const { intl } = this.props;
    const { selectedIds } = this.state;
    const requestBody = {
      uuids: selectedIds,
    };
    const [err, response] = await TO(deleteProxies(requestBody));
    if (err) {
      console.log(err);
    }

    if (response.data && response.data > 0) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgDeleteSuccess));
      this.forceRefresh();
    } else {
      this.props.handleAlertError(`${intl.formatMessage(messages.msgDeleteFailed)}. ${response.message}`);
    }
    this.setState({
      isConfirm: false,
    });
  }

  togglePopup = (isOpen = true) => {
    this.setState({
      isOpenPopup: isOpen,
    });
  }

  handleSelectAllRow = (isSelected) => {
    const { dataList } = this.state;
    if (isSelected) {
      this.setState({
        selectedIds: dataList.map((i) => get(i, 'uuid')),
        isSelectedOption: true,
        isSelectedAll: true,
      });
    } else {
      this.setState({
        selectedIds: [],
        isSelectedOption: false,
        isSelectedAll: false,
      });
    }
  }

  handleSelectBox = (id, isSelected) => {
    let { selectedIds, dataList } = this.state;
    if (isSelected) {
      selectedIds.push(id);
    } else {
      selectedIds = selectedIds.filter((item) => item !== id);
    }
    this.setState({
      selectedIds,
      isSelectedAll: selectedIds.length === dataList.length,
      isSelectedOption: selectedIds.length > 0,
    });
  };

  handleAction = (type) => {
    this.setState({
      isConfirm: true,
      confirmType: type,
    });
  }

  render() {
    const { intl } = this.props;
    const { filteredList, dataList, isOpenAdvancedSearch, isConfirm, modems,
      isOpenPopup,
      isSelectedOption,
      isSelectedAll,
      selectedIds,
    } = this.state;
    const proxyStatusOptions = convertDropdownList(getProxyStatusOptions(intl), intl.formatMessage(messages.allLabel), '');
    const modemOptions = convertDropdownList(modems.map((i) => ({ name: i.name, id: i.uuid })), intl.formatMessage(messages.allLabel), '');

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
                  <div className="col-2">
                    <DropdownList
                      label={'Modem'}
                      value={modemOptions.find((option) =>
                        option.value === filteredList.modemId
                      )}
                      options={modemOptions}
                      onChange={(option) => {
                        this.handleSearch('modemId', option.value);
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <DropdownList
                      label={'Connection status'}
                      value={proxyStatusOptions.find((option) =>
                        option.value === filteredList.status
                      )}
                      options={proxyStatusOptions}
                      onChange={(option) => {
                        this.handleSearch('status', option.value);
                      }}
                    />
                  </div>
                  <div className="col-2">
                    <FormInputGroup
                      label={'License'}
                      name="license"
                      onChange={(e) => {
                        this.handleSearch('license', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.license}
                      placeholder={'License'}
                    />
                  </div>
                  <div className="clear-filter-button">
                    <div onClick={this.handleClearAllFilters}>
                      {intl.formatMessage(messages.clearAllFiltersButton)}
                    </div>
                  </div>
                  <div className="advance-search-button">
                    <div onClick={this.handleAdvancedSearch}>
                      {intl.formatMessage(messages.advancedSearchButton)} <i className="fa fa-caret-down" />
                    </div>
                  </div>
                </div>
              </FilterDropdownGroupWrapper>
              <ButtonCreate
                onClick={() => this.togglePopup(true)}
              />
            </div>

            <div className="margin-bottom-13 d-flex justify-content-between">

              <div className="mt-2">
                <Button
                  primary
                  disabled={!isSelectedOption}
                  small
                  onClick={() => this.handleAction('DELETE')}
                  type="button"
                  style={{ fontSize: 10 }}
                ><i className="fa fa-trash" /> Delete</Button>
              </div>

            </div>

            <ProxyList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              forceRefresh={this.forceRefresh}
              handleSelectBox={this.handleSelectBox}
              handleSelectAllRow={this.handleSelectAllRow}
              isSelectedAll={isSelectedAll}
              selectedIds={selectedIds}
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
        <GeneratePopup
          isOpen={isOpenPopup}
          handleOnClose={() => this.togglePopup(false)}
          forceRefresh={this.forceRefresh}
          modems={modems}
        />
      </StyledContainer>
    );
  }
}

export default compose(
  WithHandlePromise,
  WithHandleAlert,
  injectIntl
)(ProxyWanList);
