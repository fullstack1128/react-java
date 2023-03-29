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
import { getModemStatusOptions, getModemTypeOptions } from '../utils';
import { eModemType } from 'enums/EModemType';
import FormInputGroup from 'components/common/FormInputGroup';

class AdvancedSearchPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: {
        location: '',
        type: eModemType.ALL,
        status: '',
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
      nations,
    } = this.props;

    const {
      filteredList,
    } = this.state;

    const statusOptions = convertDropdownList(getModemStatusOptions(intl), intl.formatMessage(messages.allLabel), '');
    const typeOptions = convertDropdownList(getModemTypeOptions(intl), intl.formatMessage(messages.allLabel), eModemType.All);

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
                  didCheckErrors={false}
                  label="Nhà mạng"
                  name="location"
                  onChange={(e) => {
                    this.handleSearch('isp', e.target.value);
                  }}
                  type={'text'}
                  value={filteredList.isp}
                  placeholder={'Nhà mạng'}
                />
              </Col>
              <Col md={{ size: 6 }}>
                <DropdownList
                  label={'Loại modem'}
                  value={typeOptions.find((option) =>
                    option.value === filteredList.nationId
                  )}
                  options={typeOptions}
                  onChange={(option) => {
                    this.handleSearch('type', option.value);
                  }}
                />
              </Col>
              {/*<Col md={{ size: 6 }}>*/}
                {/*<DropdownList*/}
                  {/*label={'Status'}*/}
                  {/*value={statusOptions.find((option) =>*/}
                    {/*option.value === filteredList.status*/}
                  {/*)}*/}
                  {/*options={statusOptions}*/}
                  {/*onChange={(option) => {*/}
                    {/*this.handleSearch('status', option.value);*/}
                  {/*}}*/}
                {/*/>*/}
              {/*</Col>*/}
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
