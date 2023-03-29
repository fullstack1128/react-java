import React from 'react';
import { injectIntl } from 'react-intl';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import ActionDialog from 'components/common/ActionDialog';
import { TO, convertDropdownList } from 'utils/utilHelper';
import messages from '../messages';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import DropdownList from 'components/common/DropdownList';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import { changeLocation } from 'services/user.service';
import { errorCode } from 'constants/responseCode';
import * as Yup from 'yup';

const StyledContainer = styled(ActionDialog)`
  
`;

class LocationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        location: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIds !== undefined) {
      this.setState({
      });
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { forceRefresh, handleOnClose, intl, selectedIds } = this.props;

    const dataSubmit = {
      location: values.location,
      uuids: selectedIds,
    };

    const [err, response] = await TO(changeLocation(dataSubmit));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgUpdateSuccess));
      handleOnClose();
      forceRefresh();
    } else if (response.message) {
      this.props.handleAlertError(response.message);
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    setSubmitting(false);
  }


  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
      locations,
      modemType,
    } = this.props;

    const {
      initData,
    } = self.state;

    let newlocations = locations;
    if (modemType !== undefined && modemType.length > 0) {
      newlocations = locations.filter((i) => i.modemType === modemType);
    }
    const locationOptions = convertDropdownList(newlocations, intl.formatMessage(messages.allLabel), '');

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Change location'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={450}
      >
        <Wrapper className="m-4">
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={initData}
            enableReinitialize
            validationSchema={Yup.object().shape({})}
            render={(props) => (
              <Form>
                <Row>
                  <Col md={{ size: 12 }}>
                    <DropdownList
                      label={'Location'}
                      value={locationOptions.find((option) =>
                        option.value === get(props.values, 'location')
                      )}
                      isAsterisk
                      name="location"
                      options={locationOptions}
                      onChange={(option) => {
                        props.setFieldValue('location', option.value);
                      }}
                    />
                  </Col>
                </Row>
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex">
                    <Button
                      primary
                      type="submit"
                      className="min-width-100 mt-4 mr-1"
                      loading={props.isSubmitting}
                    >{intl.formatMessage(messages.update)}</Button>
                  </div>
                  <ButtonLink
                    onClick={handleOnClose}
                    type={'button'}
                  >{intl.formatMessage(messages.close)}</ButtonLink>
                </div>
              </Form>
            )}
          />
        </Wrapper>
      </StyledContainer>
    );
  }
}


LocationPopup.propTypes = {};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(LocationPopup);
