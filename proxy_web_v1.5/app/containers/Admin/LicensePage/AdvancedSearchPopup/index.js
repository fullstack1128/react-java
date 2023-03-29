import React from 'react';
import { injectIntl } from 'react-intl';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import isEqual from 'lodash/isEqual';
import ActionDialog from 'components/common/ActionDialog';
import messages from '../messages';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import DropdownList from 'components/common/DropdownList';
import { Row, Col } from 'reactstrap';
import { TO, convertDropdownList } from 'utils/utilHelper';
import FormInputGroup from 'components/common/FormInputGroup';
import FormInputDatePicker from 'components/common/FormInputDatePicker';
import { packageLocationList } from 'utils/numberHelper';
import get from 'lodash/get';

class AdvancedSearchPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: {
        createdDateFrom: null,
        createdDateTo: null,
        expiredDateFrom: null,
        expiredDateTo: null,
        location: '',
        packageId: '',
        customerId: '',
        transactionId: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredList: nextProps.filteredList,
    });
  }

  handleSubmit = () => {
    const {
      handleMultiSearch,
      handleOnClose,
    } = this.props;

    handleMultiSearch(this.state.filteredList);
    handleOnClose();
  }

  handleSearch = (name, value) => {
    this.setState((prevState) => ({
      filteredList: {
        ...prevState.filteredList,
        [name]: value,
      },
    }));
  }

  render() {
    const {
      intl,
      isOpen,
      handleOnClose,
      salePackages,
      customers,
    } = this.props;

    const {
      filteredList,
    } = this.state;

    const salePackageOptions = convertDropdownList(salePackages.map((i) => ({ id: `${i.uuid}`, name: i.name })), intl.formatMessage(messages.allLabel), '');
    const customersOptions = convertDropdownList(customers.map((i) => ({ id: `${i.uuid}`, name: i.name })), intl.formatMessage(messages.allLabel), '');

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={intl.formatMessage(messages.advancedSearchButton)}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width="600"
      >
        <div className="m-4">
          <Form>
            <Row>
              <Col md={{ size: 6 }}>
                <FormInputDatePicker
                  name="createdDateFrom"
                  value={filteredList.createdDateFrom}
                  label={'Created date - Date from'}
                  handleSearch={(name, value) => {
                    this.handleSearch(name, value);
                  }}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <FormInputDatePicker
                  name="createdDateTo"
                  value={filteredList.createdDateTo}
                  label={'Created date - Date to'}
                  handleSearch={(name, value) => {
                    this.handleSearch(name, value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 6 }}>
                <FormInputDatePicker
                  name="expiredDateFrom"
                  value={filteredList.expiredDateFrom}
                  label={'Expired date - Date from'}
                  handleSearch={(name, value) => {
                    this.handleSearch(name, value);
                  }}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <FormInputDatePicker
                  name="expiredDateTo"
                  value={filteredList.expiredDateTo}
                  label={'Expired date - Date to'}
                  handleSearch={(name, value) => {
                    this.handleSearch(name, value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 6 }}>
                <DropdownList
                  label={'Package'}
                  value={salePackageOptions.find((option) =>
                    option.value === filteredList.packageId
                  )}
                  options={salePackageOptions}
                  onChange={(option) => {
                    this.handleSearch('packageId', option.value);
                  }}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <DropdownList
                  label={'Customer'}
                  value={customersOptions.find((option) =>
                    option.value === filteredList.customerId
                  )}
                  options={customersOptions}
                  onChange={(option) => {
                    this.handleSearch('customerId', option.value);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 6 }}>
                <FormInputGroup
                  label="Transaction"
                  name="transactionId"
                  onChange={(e) => {
                    this.handleSearch('transactionId', e.target.value);
                  }}
                  type={'text'}
                  value={filteredList.transactionId}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <FormInputGroup
                  label="Port http/socks5"
                  name="port"
                  onChange={(e) => {
                    this.handleSearch('port', e.target.value);
                  }}
                  type={'text'}
                  value={filteredList.port}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 6 }}>
                <FormInputGroup
                  label="Authentication User/Pass"
                  name="authUserName"
                  onChange={(e) => {
                    this.handleSearch('authUserName', e.target.value);
                  }}
                  type={'text'}
                  value={filteredList.authUserName}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <FormInputGroup
                  label="Authentication IPS"
                  name="authIps"
                  onChange={(e) => {
                    this.handleSearch('authIps', e.target.value);
                  }}
                  type={'text'}
                  value={filteredList.authIps}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 6 }}>
              </Col>
            </Row>


            <div className="d-flex flex-column align-items-center">
              <Button
                primary
                type="button"
                className="min-width-300 mt-4"
                onClick={this.handleSubmit}
                loading={false}
              >{intl.formatMessage(messages.search)} </Button>
              <ButtonLink
                onClick={handleOnClose}
                type={'button'}
              >{intl.formatMessage(messages.close)}</ButtonLink>
            </div>
          </Form>
        </div>
      </StyledContainer>
    );
  }
}


const StyledContainer = styled(ActionDialog)`
  
`;

export default compose(
  WithHandleAlert,
  injectIntl
)(AdvancedSearchPopup);
