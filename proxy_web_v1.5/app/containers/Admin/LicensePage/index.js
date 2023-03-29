import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ModemPage/styles';
import Card from 'components/Card';
import LicenseList from './LicenseList';
import FormInputGroup from 'components/common/FormInputGroup';
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
import { getLicenseStatusOptions } from './utils';
import LicensePopup from './LicensePopup';
import { getPackages } from 'services/admin/package.service';
import { getCustomers } from 'services/admin/customer.service';
import { changeIp } from 'services/user.service';
import { errorCode } from 'constants/responseCode';
import { getModems } from 'services/admin/modem.service';
import { updateLicenseStatus } from 'services/admin/license.service';
import ChangeModemPopup from './ChangeModemPopup';
import Button from 'components/common/Button';
import env from 'env';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getLocations } from 'services/admin/location.service';
import LocationPopup from './LocationPopup';
import ButtonCreate from 'components/common/ButtonCreate';
import ImportPopup from './ImportPopup';

export class LicensePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      selectedObject: null,
      forceRefresh: false,
      filteredList: {
        name: '',
        expiredDate: null,
        status: '',
        modemId: '',
        publicIp: '',
        port: '',
        authUserName: '',
        authIps: '',
        createdDateFrom: null,
        createdDateTo: null,
        expiredDateFrom: null,
        expiredDateTo: null,
        location: '',
        packageId: '',
        customerId: '',
        transactionId: '',
      },
      salePackages: [],
      customers: [],
      isConfirm: false,
      confirmType: '',
      modems: [],
      isSelectedOption: false,
      selectedIds: [],
      selectedId: null,
      isSelectedAll: false,
      locations: [],
      isOpenPopupLocation: false,
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.loadInitData();
  }

  loadInitData = async () => {
    const customers = await getCustomers({
      filtered: [],
      pageSize: 1000,
      page: 0,
    });
    this.setState({
      customers: customers.data.data,
    });

    const packages = await getPackages({
      filtered: [],
      pageSize: 100,
      page: 0,
    });
    this.setState({
      salePackages: packages.data.data,
    });

    const modems = await getModems({
      filtered: [],
      pageSize: 100,
      page: 0,
    });
    this.setState({
      modems: modems.data.data,
    });

    const locations = await getLocations();
    this.setState({
      locations: locations.data.data,
    });
  }

  getKeyFromFilteredList = () => {
    const { filteredList, forceRefresh } = this.state;
    return `${filteredList.expiredDate}
            -${filteredList.name}
            -${filteredList.status}
            -${filteredList.modemId}
            -${filteredList.publicIp}
            -${filteredList.port}
            -${filteredList.authUserName}
            -${filteredList.authIps}
            -${filteredList.createdDateFrom}
            -${filteredList.createdDateTo}
            -${filteredList.expiredDateFrom}
            -${filteredList.expiredDateTo}
            -${filteredList.location}
            -${filteredList.packageId}
            -${filteredList.customerId}
            -${filteredList.transactionId}
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

  handleSelectRow = (id) => {
    const { dataList } = this.state;
    const license = dataList.find((item) => item.uuid === id);

    this.setState({
      selectedId: id,
      selectedObject: license,
      isOpenPopup: true,
    });
  };

  handleChangeIp = (id) => {
    this.setState({
      selectedId: id,
      selectedIds: [id],
      isConfirm: true,
      confirmType: 'CHANGE_IP',
    });
  }

  handleSwitchModem = (id) => {
    const { dataList } = this.state;
    const license = dataList.find((item) => item.uuid === id);

    this.setState({
      selectedId: id,
      selectedObject: license,
    });

    this.toggleChangePopup(true);
  }

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
        expiredDate: null,
        status: '',
        modemId: '',
        publicIp: '',
        port: '',
        authUserName: '',
        authIps: '',
        createdDateFrom: null,
        createdDateTo: null,
        expiredDateFrom: null,
        expiredDateTo: null,
        location: '',
        packageId: '',
        customerId: '',
        transactionId: '',
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
    this.setState({
      isConfirmLoading: true,
    });

    const { confirmType, selectedIds } = this.state;

    const requestBody = {
      uuids: selectedIds,
    };

    let err,
      response;
    if (confirmType === 'CHANGE_IP') {
      [err, response] = await TO(changeIp(requestBody));
    } else if (confirmType === 'ACTIVE_PAUSE') {
      requestBody.licenseStatus = 'PENDING';
      [err, response] = await TO(updateLicenseStatus(requestBody));
    } else {
      requestBody.licenseStatus = 'EXPIRED';
      [err, response] = await TO(updateLicenseStatus(requestBody));
    }

    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgUpdateSuccess));
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }

    this.setState({
      isConfirm: false,
      isConfirmLoading: false,
    });
    this.forceRefresh();
  }

  togglePopup = (isOpen = true, selectedId) => {
    if (isOpen) {
      const { dataList } = this.state;

      const selectedObject = dataList.find((item) => item.uuid === selectedId);

      this.setState({
        selectedId,
        selectedObject,
      });
    }
    this.setState({
      isOpenPopup: isOpen,
    });
  }

  togglePopupLocation = (isOpen = true, selectedId, modemType) => {
    this.setState({
      selectedIds: [selectedId],
      isOpenPopupLocation: isOpen,
      modemType,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
        selectedIds: [],
        modemType: '',
      });
    }
  }

  toggleChangePopup = (isOpen = true) => {
    this.setState({
      isChangeModemPopup: isOpen,
    });
  }

  togglePopupImport = (isOpenImport = true) => {
    this.setState({
      isOpenImport,
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

  handleCopyFormat1 = () => {
    const { selectedIds, dataList } = this.state;
    const arrays = [];

    selectedIds.forEach((selectedId) => {
      const item = dataList.find((el) => el.uuid === selectedId);
      const proxy = item.proxy;
      const authen = get(proxy, 'authenticationUsers', '');
      const portV4Type2 = `${get(proxy, 'publicIp')}:${get(proxy, 'proxyPort')}${isEmpty(authen) ? '' : `:${authen}`}`;
      arrays.push(portV4Type2);
    });

    navigator.clipboard.writeText(arrays.join('\r\n'));
    this.props.handleAlertSuccess('Copy to clipboard successful!');
  }

  handleCopyFormat2 = () => {
    const { selectedIds, dataList } = this.state;
    const arrays = [];

    selectedIds.forEach((selectedId) => {
      const item = dataList.find((el) => el.uuid === selectedId);
      const proxy = item.proxy;
      const authen = get(proxy, 'authenticationUsers', '');
      const portV4 = `${isEmpty(authen) ? '' : `${authen}@`}${get(proxy, 'publicIp')}:${get(proxy, 'proxyPort')}`;
      arrays.push(portV4);
    });

    navigator.clipboard.writeText(arrays.join('\r\n'));
    this.props.handleAlertSuccess('Copy to clipboard successful!');
  }

  handleExportExcel = () => {
    const userInfo = auth.getUserInfo();
    window.open(`${env.API_URL}/client/licenses/excel?customer=${userInfo.uuid}&format=`, '_blank');
  }

  handleAction = (type) => {
    this.setState({
      isConfirm: true,
      confirmType: type,
    });
  }

  handleExportTracking = (license) => {
    window.open(`${env.API_URL}/admin/licenses/tracking?license=${license}`, '_blank');
  }

  render() {
    const { intl } = this.props;
    const { filteredList,
      customers,
      salePackages,
      dataList,
      isOpenAdvancedSearch,
      isConfirm,
      selectedId,
      selectedObject,
      isOpenPopup,
      isChangeModemPopup,
      isConfirmLoading,
      modems,
      isSelectedOption,
      isSelectedAll,
      selectedIds,
      confirmType,
      isOpenPopupLocation,
      locations,
      modemType,
      isOpenImport,
    } = this.state;

    const licenseOptions = convertDropdownList(getLicenseStatusOptions(intl), intl.formatMessage(messages.allLabel), '');
    const modemOptions = convertDropdownList(modems.map((i) => ({ name: i.name, id: i.uuid })), intl.formatMessage(messages.allLabel), '');

    let message;
    if (confirmType === 'CHANGE_IP') {
      message = 'Are you sure you want to perform the new IP operation?';
    } else if (confirmType === 'ACTIVE_PAUSE') {
      message = 'Please confirm you want to change the Active License to Pause and change the Suspended License to Active.';
    } else {
      message = 'Please confirm you want to change Active and Paused License to Expired. Note Expired License will not allow changes.';
    }

    return (
      <StyledContainer>
        <Fragment>
          <Card>
            <div className="margin-bottom-13 d-flex justify-content-between">
              <FilterDropdownGroupWrapper>
                <div className="row no-gutters min-width-100">
                  <div className="col-2">
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'License code'}
                      name="name"
                      onChange={(e) => {
                        this.handleSearch('name', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.name}
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
                      label={'Status'}
                      value={licenseOptions.find((option) =>
                          option.value === filteredList.status
                        )}
                      options={licenseOptions}
                      onChange={(option) => {
                        this.handleSearch('status', option.value);
                      }}
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
                onClick={() => this.togglePopupImport(true, '')}
              />
            </div>

            <div className="margin-bottom-13 d-flex justify-content-between">

              <div className="mt-2">
                <Button
                  primary
                  disabled={!isSelectedOption}
                  small
                  onClick={() => this.handleAction('CHANGE_IP')}
                  type="button"
                  style={{ fontSize: 10 }}
                ><i className="fa fa-wrench" /> Change IP</Button>
                <Button
                  primary
                  disabled={!isSelectedOption}
                  small
                  onClick={() => this.handleAction('ACTIVE_PAUSE')}
                  type="button"
                  style={{ fontSize: 10 }}
                ><i className="fa fa-pause" /> Pause-Active</Button>
                <Button
                  primary
                  disabled={!isSelectedOption}
                  small
                  onClick={() => this.handleAction('EXPIRED')}
                  type="button"
                  style={{ fontSize: 10 }}
                ><i className="fa fa-eclipse" /> Expired</Button>
              </div>

            </div>

            <LicenseList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              handleRemoveRow={this.handleRemoveRow}
              forceRefresh={this.forceRefresh}
              handleChangeIp={this.handleChangeIp}
              handleSwitchModem={this.handleSwitchModem}
              handleSelectBox={this.handleSelectBox}
              handleSelectAllRow={this.handleSelectAllRow}
              isSelectedAll={isSelectedAll}
              selectedIds={selectedIds}
              togglePopupLocation={this.togglePopupLocation}
              handleExportTracking={this.handleExportTracking}
            />
          </Card>
          <AdvancedSearchPopup
            isOpen={isOpenAdvancedSearch}
            handleOnClose={() => this.handleAdvancedSearch(false)}
            filteredList={filteredList}
            handleMultiSearch={this.handleMultiSearch}
            salePackages={salePackages}
            customers={customers}
          />
        </Fragment>
        <LicensePopup
          selectedId={selectedId}
          selectedObject={selectedObject}
          isOpen={isOpenPopup}
          handleOnClose={() => this.togglePopup(false)}
          forceRefresh={this.forceRefresh}
          salePackages={salePackages}
        />
        <ChangeModemPopup
          isOpen={isChangeModemPopup}
          handleOnClose={() => this.toggleChangePopup(false)}
          forceRefresh={this.forceRefresh}
          modems={modems}
          selectedId={selectedId}
          selectedObject={selectedObject}
        />
        <ConfirmDialog
          message={message}
          title={intl.formatMessage(messages.titleConfirm)}
          isOpen={isConfirm}
          confirmButtonText={intl.formatMessage(messages.confirmButton)}
          cancelButtonText={intl.formatMessage(messages.cancelButton)}
          onConfirm={this.handleAcceptConfirmPopup}
          onClose={this.handleCloseConfirmPopup}
          loading={isConfirmLoading}
          focusCloseButton
        />
        <LocationPopup
          isOpen={isOpenPopupLocation}
          selectedIds={selectedIds}
          selectedId={selectedId}
          handleOnClose={() => this.togglePopupLocation(false)}
          forceRefresh={this.forceRefresh}
          locations={locations}
          modemType={modemType}
        />
        <ImportPopup
          isOpen={isOpenImport}
          handleOnClose={() => this.togglePopupImport(false)}
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
)(LicensePage);
