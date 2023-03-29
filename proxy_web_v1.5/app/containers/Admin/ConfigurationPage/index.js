import React, { Fragment } from 'react';
import StyledContainer from 'containers/Admin/ConfigurationPage/styles';
import Card from 'components/Card';
import ConfigurationList from './ConfigurationList';
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
import ConfigurationPopup from './ConfigurationPopup';

export class ConfigurationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      isOpenAdvancedSearch: false,
      selectedId: props.match.params.id,
      forceRefresh: false,
      filteredList: {
        name: '',
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
            -${forceRefresh}`;
  }

  handleUpdateModemList = (data) => {
    this.setState({
      dataList: data,
    });
  }

  handleSelectRow = (id) => {
    this.togglePopup(true, id);
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
    const { filteredList, dataList, selectedId, selectedObject, isOpenPopup, isConfirm } = this.state;

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
                    />
                  </div>
                </div>
              </FilterDropdownGroupWrapper>
            </div>

            <ConfigurationList
              dataList={dataList}
              filteredList={filteredList}
              handleUpdateModemList={this.handleUpdateModemList}
              getKeyFromFilteredList={this.getKeyFromFilteredList}
              handleSelectRow={this.handleSelectRow}
              forceRefresh={this.forceRefresh}
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
        <ConfigurationPopup
          selectedId={selectedId}
          selectedObject={selectedObject}
          isOpen={isOpenPopup}
          handleOnClose={() => this.togglePopup(false)}
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
)(ConfigurationPage);
