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
import { getProxySaleStatusOptions } from '../utils';

class AdvancedSearchPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: {
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
    } = this.props;

    const {
      filteredList,
    } = this.state;

    const proxySaleStatusOptions = convertDropdownList(getProxySaleStatusOptions(intl), intl.formatMessage(messages.allLabel), '');

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
                <FormInputGroup
                  label="Host"
                  name="host"
                  onChange={(e) => {
                    this.handleSearch('host', e.target.value);
                  }}
                  type={'text'}
                  value={filteredList.host}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <FormInputGroup
                  label="Port"
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
                  name="location"
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
                  name="location"
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
                <DropdownList
                  label={'Usage Status'}
                  value={proxySaleStatusOptions.find((option) =>
                    option.value === filteredList.saleStatus
                  )}
                  options={proxySaleStatusOptions}
                  onChange={(option) => {
                    this.handleSearch('saleStatus', option.value);
                  }}
                />
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
