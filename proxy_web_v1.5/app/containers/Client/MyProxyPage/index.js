import React, { Fragment } from 'react';
import StyledContainer from 'containers/Client/MyProxyPage/styles';
import Card from 'components/Card';
import ProxyList from './ProxyList';
import { routes } from 'containers/Routes/routeHelper';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import FilterDropdownGroupWrapper from 'components/FilterDropdownWrapper';
import { TO, convertDropdownList, copyToClipboard } from 'utils/utilHelper';
import DropdownList from 'components/DropdownList';
import ConfirmDialog from 'components/common/ConfirmDialog';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import FormInputDatePicker from 'components/common/FormInputDatePicker';
import { getLicenseStatusOptions } from './utils';
import Button from 'components/common/Button';
import AuthenticatePopup from './AuthenticatePopup';
import AutoRotationPopup from './AutoRotationPopup';
import { changeIp, extendLicense, rebootDevice } from 'services/user.service';
import { getLocations } from 'services/admin/location.service';
import { errorCode } from 'constants/responseCode';
import get from 'lodash/get';
import env from 'env';
import auth from 'utils/auth';
import isEmpty from 'lodash/isEmpty';
import ButtonDrop from 'components/common/ButtonDrop';

export class ProxyWanList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      forceRefresh: false,
      filteredList: {
        expiredDate: null,
        status: 'ACTIVE',
      },
      isOpenPopup: false,
      isOpenPopupRotation: false,
      isConfirm: false,
      isConfirmLoading: false,
      confirmType: '',
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
  }

  getKeyFromFilteredList = () => {
    const { filteredList, forceRefresh } = this.state;
    return `${filteredList.expiredDate}
            -${filteredList.status}
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

  handleSelectAllRow = (isSelected) => {
    const { dataList } = this.state;
    if (isSelected) {
      this.setState({
        selectedIds: dataList.map((i) => (i.proxy === null ? get(i, 'uuid') : get(i, 'uuid'))),
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

  handleSelectRow = (id, isSelected) => {
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

  handleSelectOneRow = (id) => {
    const { dataList } = this.state;
    const item = dataList.find((el) => el.uuid === id);
    const proxy = item.proxy;
    const modemType = get(proxy, 'modemType');

    this.setState({
      selectedId: id,
      selectedIds: [id],
      modemType,
    });
  }

  handleAction = (type) => {
    this.setState({
      isConfirm: true,
      confirmType: type,
    });
  }

  handleExportExcel = (format) => {
    const userInfo = auth.getUserInfo();
    window.open(`${env.API_URL}/client/licenses/excel?customer=${userInfo.uuid}&format=${format}`, '_blank');
  }

  handleCopyFormat1 = () => {
    const { selectedIds, dataList } = this.state;
    const arrays = [];

    selectedIds.forEach((selectedId) => {
      const item = dataList.find((el) => el.uuid === selectedId);
      const proxy = item.proxy;
      const authen = get(proxy, 'authenticationUsers', '');
      const modemType = get(proxy, 'modemType');
      const publicIp = modemType === 'WAN' ? get(proxy, 'publicIp') : get(proxy, 'host');
      const portV4Type2 = `${publicIp}:${get(proxy, 'proxyPort')}${isEmpty(authen) ? '' : `:${authen}`}`;
      arrays.push(portV4Type2);
    });

    navigator.clipboard.writeText(arrays.join('\r\n'));
    this.props.handleAlertSuccess('Copy to clipboard successful');
  }

  handleCopyFormat2 = () => {
    const { selectedIds, dataList } = this.state;
    const arrays = [];

    selectedIds.forEach((selectedId) => {
      const item = dataList.find((el) => el.uuid === selectedId);
      const proxy = item.proxy;
      const authen = get(proxy, 'authenticationUsers', '');
      const modemType = get(proxy, 'modemType');
      const publicIp = modemType === 'WAN' ? get(proxy, 'publicIp') : get(proxy, 'host');
      const portV4 = `${isEmpty(authen) ? '' : `${authen}@`}${publicIp}:${get(proxy, 'proxyPort')}`;
      arrays.push(portV4);
    });

    navigator.clipboard.writeText(arrays.join('\r\n'));
    this.props.handleAlertSuccess('Copy to clipboard successful');
  }

  handleCloseConfirmPopup = () => {
    this.setState({
      isConfirm: false,
      selectedId: null,
      isConfirmLoading: false,
    });
  }

  togglePopup = (isOpen = true) => {
    this.setState({
      isOpenPopup: isOpen,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
        selectedIds: [],
      });
    }
  }

  togglePopupAutoRotation = (isOpen = true, autoRotationTime, minPkgTime) => {
    this.setState({
      isOpenPopupRotation: isOpen,
      autoRotationTime,
      minPkgTime,
    });
    if (!isOpen) {
      this.setState({
        selectedId: null,
        selectedIds: [],
      });
    }
  }

  handleAcceptConfirmPopup = async () => {
    this.setState({ isConfirmLoading: true });
    const { intl } = this.props;
    const { confirmType, selectedIds } = this.state;

    const requestBody = {
      uuids: selectedIds,
    };

    let err,
      response;
    if (confirmType === 'CHANGE_IP') {
      [err, response] = await TO(changeIp(requestBody));
    } else if (confirmType === 'EXTEND_LICENSE') {
      [err, response] = await TO(extendLicense(requestBody));
    } else {
      [err, response] = await TO(rebootDevice(requestBody));
    }

    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgUpdateSuccess));
    } else {
      const msg = confirmType === 'EXTEND_LICENSE' ? ' Please check your account balance.' : 'Getting IP too fast.';
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed) + msg);
    }

    this.setState({
      isConfirm: false,
      isConfirmLoading: false,
    });
    this.forceRefresh();
  }

  handleGetLinkChangeIp = async (license) => {
    const link = `${env.APP_URL}/v1/api/proxy/change-ip?license=${license}`;
    copyToClipboard(link)
      .then(() => this.props.handleAlertSuccess('Copy to clipboard successful!'))
      .catch(() => console.log('error'));
  }

  handleStatusApi = async (license) => {
    const link = `${env.APP_URL}/v1/api/proxy/status?license=${license}`;
    window.open(link, '_blank');
  }

  render() {
    const { intl } = this.props;
    const { filteredList, dataList,
      isSelectedOption, selectedIds, selectedId,
      isConfirm, confirmType,
      isOpenPopup,
      isOpenPopupRotation,
      isSelectedAll, isConfirmLoading,
      autoRotationTime,
      minPkgTime,
    } = this.state;
    const licenseOptions = convertDropdownList(getLicenseStatusOptions(intl), intl.formatMessage(messages.allLabel), '');
    const exportOptions = [
      { text: 'Format HTTP 1', onClick: () => this.handleExportExcel('format-http-1') },
      { text: 'Format SOCKS5 1', onClick: () => this.handleExportExcel('format-socks5-1') },
      { text: 'Format HTTP 2', onClick: () => this.handleExportExcel('format-http-2') },
      { text: 'Format SOCKS5 2', onClick: () => this.handleExportExcel('format-socks5-2') },
      { text: 'Format HTTP 3', onClick: () => this.handleExportExcel('format-http-3') },
      { text: 'Format SOCKS5 3', onClick: () => this.handleExportExcel('format-socks5-3') },
      { text: 'Change IP links', onClick: () => this.handleExportExcel('change-ip-links') },
      { text: 'Status Links', onClick: () => this.handleExportExcel('status-links') },
      { text: 'All', onClick: () => this.handleExportExcel() },
    ];
    let message;
    if (confirmType === 'CHANGE_IP') {
      message = 'Are you sure you want to perform the new IP operation?';
    } else if (confirmType === 'EXTEND_LICENSE') {
      message = 'Are you sure you want to perform the renewal operation?';
    } else {
      message = 'Are you sure you want to perform reboot device?';
    }

    return (
      <StyledContainer>
        <Fragment>
          <Card>
            <div className="margin-bottom-13 d-flex justify-content-between">
              <FilterDropdownGroupWrapper>
                <div className="row no-gutters min-width-100">
                  <div className={'col-md-2'}>
                    <FormInputDatePicker
                      name="expiredDate"
                      value={filteredList.expiredDate}
                      label={'Expired Date'}
                      handleSearch={(name, value) => {
                        this.handleSearch(name, value);
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
                </div>
              </FilterDropdownGroupWrapper>
            </div>
            <div className="margin-bottom-13 d-flex">
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
                onClick={() => this.togglePopup(true)}
                type="button"
                style={{ fontSize: 10, marginLeft: 5 }}
              ><i className="fa fa-user-lock" /> Authentication</Button>
              <Button
                primary
                disabled={!isSelectedOption}
                small
                onClick={() => this.handleAction('EXTEND_LICENSE')}
                type="button"
                style={{ fontSize: 10, marginLeft: 5 }}
              ><i className="fa fa-redo" /> Extend</Button>
              <Button
                primary
                disabled={!isSelectedOption}
                small
                onClick={() => this.togglePopupAutoRotation(true)}
                type="button"
                style={{ fontSize: 10, marginLeft: 5 }}
              ><i className="fa fa-sync" /> Auto rotation</Button>
              <div className="ml-2">
                <ButtonDrop
                  primary
                  small
                  text="Export TXT"
                  actions={exportOptions}
                >
                </ButtonDrop>
              </div>

            </div>
            <ProxyList
              dataList={dataList}
              selectedIds={selectedIds}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              handleSelectOneRow={this.handleSelectOneRow}
              handleSelectAllRow={this.handleSelectAllRow}
              isSelectedAll={isSelectedAll}
              forceRefresh={this.forceRefresh}
              handleAction={this.handleAction}
              togglePopup={this.togglePopup}
              togglePopupAutoRotation={this.togglePopupAutoRotation}
              handleGetLinkChangeIp={this.handleGetLinkChangeIp}
              handleStatusApi={this.handleStatusApi}
            />
          </Card>
        </Fragment>
        <ConfirmDialog
          message={message}
          title={intl.formatMessage(messages.titleConfirm)}
          isOpen={isConfirm}
          confirmButtonText={intl.formatMessage(messages.confirmButton)}
          cancelButtonText={intl.formatMessage(messages.cancelButton)}
          onConfirm={this.handleAcceptConfirmPopup}
          onClose={this.handleCloseConfirmPopup}
          focusCloseButton
          loading={isConfirmLoading}
        />
        <AuthenticatePopup
          isOpen={isOpenPopup}
          selectedIds={selectedIds}
          selectedId={selectedId}
          handleOnClose={() => this.togglePopup(false)}
          forceRefresh={this.forceRefresh}
          dataList={dataList}
        />
        <AutoRotationPopup
          isOpen={isOpenPopupRotation}
          selectedIds={selectedIds}
          selectedId={selectedId}
          autoRotationTime={autoRotationTime}
          minPkgTime={minPkgTime}
          handleOnClose={() => this.togglePopupAutoRotation(false)}
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
)(ProxyWanList);
