import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ModemPage/styles';
import Card from 'components/Card';
import PackageList from './PackageList';
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
import { permission } from 'constants/permission';
import PackagePopup from './PackagePopup';
import { packageLocationList } from 'utils/numberHelper';
import { deletePackage } from 'services/admin/package.service';
import { errorCode } from 'constants/responseCode';
import { getIspList } from 'services/admin/isp.service';

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
      },
      isConfirm: false,
      ispList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    this.loadInitData();
  }

  loadInitData = async () => {
    const resp = await getIspList();
    this.setState({
      ispList: resp.data,
    });
  }

  getKeyFromFilteredList = () => {
    const { filteredList, forceRefresh } = this.state;
    return `${filteredList.name}
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
      btnLoading: true,
    });

    const [err, response] = await TO(deletePackage(selectedId));
    if (err) {
      console.log(err);
    }

    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgDeleteSuccess));
      this.forceRefresh();
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgDeleteFailed));
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
    const { intl } = this.props;
    const { filteredList, dataList, isOpenAdvancedSearch, selectedObject, isOpenPopup, selectedId, isConfirm, ispList } = this.state;

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
                </div>
              </FilterDropdownGroupWrapper>
              <ButtonCreate
                onClick={() => this.togglePopup(true, '')}
              />
            </div>

            <PackageList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              handleRemoveRow={this.handleRemoveRow}
              forceRefresh={this.forceRefresh}
            />
          </Card>
        </Fragment>
        <PackagePopup
          selectedObject={selectedObject}
          isOpen={isOpenPopup}
          selectedId={selectedId}
          handleOnClose={() => this.togglePopup(false)}
          forceRefresh={this.forceRefresh}
          ispList={ispList}
        />
        <ConfirmDialog
          message={'Are you sure you want to delete this package?'}
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
