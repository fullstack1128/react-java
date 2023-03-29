import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ModemPage/styles';
import Card from 'components/Card';
import ModemList from './ModemList';
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
import { eModemStatus } from 'enums/EModemStatus';
import { eModemType } from 'enums/EModemType';
import ConfirmDialog from 'components/common/ConfirmDialog';
import WithHandlePromise from 'containers/WithHandlePromise';
import WithHandleAlert from 'containers/WithHandleAlert';
import auth from 'utils/auth';
import { permission } from 'constants/permission';
import ModemPopup from './ModemPopup';
import { syncModem, resumeModem, pauseModem, deleteModem } from 'services/admin/modem.service';
import { errorCode } from 'constants/responseCode';

export class ModemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      isOpenPopup: false,
      selectedId: props.match.params.id,
      forceRefresh: false,
      selectedObject: null,
      filteredList: {
        name: '',
        location: '',
        domain: '',
        isp: '',
        type: '',
        status: '',
      },
      isConfirm: false,
      btnLoading: false,
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
            -${filteredList.location}
            -${filteredList.domain}
            -${filteredList.isp}
            -${filteredList.status}
            -${filteredList.type}
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

  handleSelectRow = (id) => {
    this.togglePopup(true, id);
  };

  handlePause = (id) => {
    this.setState({
      selectedId: id,
      confirmType: 'PAUSE',
      isConfirm: true,
    });
  };

  handleDelete = (id) => {
    this.setState({
      selectedId: id,
      confirmType: 'DELETE',
      isConfirm: true,
    });
  };

  handleResume = (id) => {
    this.setState({
      selectedId: id,
      confirmType: 'RESUME',
      isConfirm: true,
    });
  };

  handleSync = (id) => {
    this.setState({
      selectedId: id,
      confirmType: 'SYNC',
      isConfirm: true,
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
        location: '',
        domain: '',
        isp: '',
        type: '',
        status: '',
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
    const { selectedId, confirmType } = this.state;
    this.setState({
      btnLoading: true,
    });

    let err,
      response;
    if (confirmType === 'SYNC') {
      [err, response] = await TO(syncModem(selectedId));
    } else if (confirmType === 'RESUME') {
      [err, response] = await TO(resumeModem(selectedId));
    } else if (confirmType === 'PAUSE') {
      [err, response] = await TO(pauseModem(selectedId));
    } else if (confirmType === 'DELETE') {
      [err, response] = await TO(deleteModem(selectedId));
    }

    if (err) {
      console.log(err);
    }

    if (confirmType === 'DELETE') {
      if (response.code === errorCode.SUCCESS) {
        this.props.handleAlertSuccess(intl.formatMessage(messages.msgDeleteSuccess));
        this.forceRefresh();
      } else {
        this.props.handleAlertError(`${intl.formatMessage(messages.msgDeleteFailed)} [${response.message}]`);
      }
    } else if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgUpdateSuccess));
      this.forceRefresh();
    } else {
      this.props.handleAlertError(`${intl.formatMessage(messages.msgUpdateFailed)} [${response.message}]`);
    }
    this.setState({
      isConfirm: false,
      btnLoading: false,
    });
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

  render() {
    const alertModemSyncMsg = 'Note! <br/>' +
      'The system will sync the License being used on this modem to XProxy. <br/>' +
      'Please do not configure Authentication user, XProxy`s own IP whitelist will conflict with the sales system.';

    const alertPauseModemMsg = 'Note! Modem maintenance status:<br/>\n' +
      '\n' +
      '1. The system will automatically transfer all existing licenses on this modem to the same modem. <br/>\n' +
      '2. You should double-check the licenses that cannot be transferred to another modem.<br/>\n' +
      '3. In a maintenance state, this modem will not issue a proxy to the license.';

    const alertResumeModemMsg = 'Note! Modem Ready:<br/>\n' +
      '1. The system will use the modem`s proxy to enter the sales system.<br/>\n' +
      '2. Don`t configure Authentication user, XProxy`s own ip whitelist will conflict with the sales system.';

    const alertDeleteModem = 'Confirm modem deletion?';

    const { intl } = this.props;
    const { filteredList, dataList, isOpenAdvancedSearch, selectedObject, isOpenPopup, selectedId, isConfirm, confirmType, btnLoading } = this.state;

    let confirmMessage = '';
    if (confirmType === 'SYNC') {
      confirmMessage = alertModemSyncMsg;
    } else if (confirmType === 'PAUSE') {
      confirmMessage = alertPauseModemMsg;
    } else if (confirmType === 'RESUME') {
      confirmMessage = alertResumeModemMsg;
    } else if (confirmType === 'DELETE') {
      confirmMessage = alertDeleteModem;
    }

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
                    <FormInputGroup
                      didCheckErrors={false}
                      label="Location"
                      name="location"
                      onChange={(e) => {
                        this.handleSearch('location', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.location}
                      placeholder={'Location'}
                    />
                  </div>
                  <div className="col-2">
                    <FormInputGroup
                      didCheckErrors={false}
                      label="Domain"
                      name="domain"
                      onChange={(e) => {
                        this.handleSearch('domain', e.target.value);
                      }}
                      type={'text'}
                      value={filteredList.domain}
                      placeholder={'Domain'}
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
                onClick={() => this.togglePopup(true, '')}
              />
            </div>

            <ModemList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              forceRefresh={this.forceRefresh}
              handlePause={this.handlePause}
              handleResume={this.handleResume}
              handleSync={this.handleSync}
              handleDelete={this.handleDelete}
            />
          </Card>
          <AdvancedSearchPopup
            isOpen={isOpenAdvancedSearch}
            handleOnClose={() => this.handleAdvancedSearch(false)}
            filteredList={filteredList}
            handleMultiSearch={this.handleMultiSearch}
          />
        </Fragment>

        <ModemPopup
          selectedId={selectedId}
          selectedObject={selectedObject}
          isOpen={isOpenPopup}
          handleOnClose={() => this.togglePopup(false)}
          forceRefresh={this.forceRefresh}
        />
        <ConfirmDialog
          message={confirmMessage}
          title={intl.formatMessage(messages.titleConfirm)}
          isOpen={isConfirm}
          confirmButtonText={intl.formatMessage(messages.confirmButton)}
          cancelButtonText={intl.formatMessage(messages.cancelButton)}
          onConfirm={this.handleAcceptConfirmPopup}
          onClose={this.handleCloseConfirmPopup}
          loading={btnLoading}
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
