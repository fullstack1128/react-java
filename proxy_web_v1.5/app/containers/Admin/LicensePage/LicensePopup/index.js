import React from 'react';
import { injectIntl } from 'react-intl';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import ActionDialog from 'components/common/ActionDialog';
import { TO, convertDropdownList } from 'utils/utilHelper';
import messages from '../messages';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import getSchema from './validateSchema';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import DropdownList from 'components/common/DropdownList';
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import { updateLicense } from 'services/admin/license.service';
import FormCheckBox from 'components/common/FormCheckBox';
import FormInputGroup from 'components/common/FormInputGroup';
import auth from 'utils/auth';
import FormInputDatePicker from 'components/common/FormInputDatePicker';
import moment from 'moment';
import { errorCode } from 'constants/responseCode';
import { permission } from 'constants/permission';
import isEmpty from 'lodash/isEmpty';
import FormLabel from 'components/common/FormLabel';
import { getLicenseStatusOptions } from '../utils';
import ButtonCopy from 'components/common/ButtonCopy';

const StyledContainer = styled(ActionDialog)`
  
`;

class LicensePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        name: '',
      },
      salePackages: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedObject) {
      this.setState({
        initData: {
          ...nextProps.selectedObject,
          startDate: this.convertToDate(nextProps.selectedObject.startDate),
          expiredDate: this.convertToDate(nextProps.selectedObject.expiredDate),
        },
        salePackages: nextProps.salePackages,
      });
    } else {
      const initData = {
        name: '',
      };
      this.setState({
        initData,
      });
    }
  }

  convertToDate = (dateString) => {
    let convertDate = null;
    if (!isEmpty(dateString)) {
      convertDate = moment(dateString).utc();
      convertDate = convertDate.isValid() ? convertDate.toDate() : new Date(1970, 0, 1);
    }
    return convertDate;
  };

  convertToIso = (dateInput) => {
    const date = moment(dateInput).format('YYYY-MM-DD');
    const time = moment(dateInput).format('HH:mm:ss');
    return `${date}T${time}.000Z`;
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const dataSubmit = {
      salePackageId: values.salePackage.uuid,
      status: values.status,
      authUser: values.authUser,
      ipWhitelist: values.ipWhitelist,
      expiredDate: this.convertToIso(values.expiredDate),
    };


    this.handleSubmitUpdate(dataSubmit, setSubmitting);
  }

  handleSubmitUpdate = async (dataSubmit, setSubmitting) => {
    const { selectedId, forceRefresh, handleOnClose, intl } = this.props;

    const [err, response] = await TO(updateLicense(selectedId, dataSubmit));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.updatedError));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.updatedSuccess));
      handleOnClose();
      forceRefresh();
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.updatedError));
    }
    setSubmitting(false);
  }


  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
      selectedId,
    } = this.props;

    const {
      initData,
      salePackages,
    } = self.state;

    const statusList = getLicenseStatusOptions(intl);
    const salePackagesList = salePackages.map((pkg) => ({
      id: pkg.uuid,
      name: pkg.name,
    }));

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'License details'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
      >
        <Wrapper className="m-4">
          <Formik
            onSubmit={this.handleSubmit}
            initialValues={initData}
            enableReinitialize
            validationSchema={getSchema(intl)}
            render={(props) => (
              <Form>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      disabled={selectedId !== ''}
                      label={'Client'}
                      isAsterisk
                      name="customer.name"
                      type={'text'}
                      value={get(props.values, 'customer.name', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      disabled={selectedId !== ''}
                      label={'Transaction'}
                      isAsterisk
                      name="transaction.uuid"
                      type={'text'}
                      value={get(props.values, 'transaction.uuid', [])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      disabled={selectedId !== ''}
                      label={'License'}
                      isAsterisk
                      name="uuid"
                      type={'text'}
                      value={get(props.values, 'uuid', [])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputDatePicker
                      name="startDate"
                      disabled
                      value={get(props.values, 'startDate', null)}
                      label={'Start day'}
                      onChange={props.handleChange}
                      type="text"
                      {...props}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputDatePicker
                      name="expiredDate"
                      value={get(props.values, 'expiredDate', null)}
                      label={'Expiration date'}
                      onChange={props.handleChange}
                      type="text"
                      {...props}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'Package'}
                      value={convertDropdownList(salePackagesList).find((option) =>
                        option.value === get(props.values, 'salePackage.uuid')
                      )}
                      isAsterisk
                      name="salePackage.uuid"
                      options={convertDropdownList(salePackagesList)}
                      {...props}
                    />

                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      disabled={selectedId !== ''}
                      label={'Location'}
                      isAsterisk
                      name="location"
                      type={'text'}
                      value={get(props.values, 'location', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      disabled={selectedId !== ''}
                      label={'ISP'}
                      isAsterisk
                      name="isp"
                      type={'text'}
                      value={get(props.values, 'isp', [])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'Status'}
                      value={convertDropdownList(statusList).find((option) =>
                        option.value === get(props.values, 'status')
                      )}
                      isAsterisk
                      name="status"
                      options={convertDropdownList(statusList)}
                      {...props}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Authentication User'}
                      isAsterisk
                      name="authUser"
                      type={'text'}
                      onChange={props.handleChange}
                      value={get(props.values, 'authUser', '')}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Authentacation IPs'}
                      isAsterisk
                      name="ipWhitelist"
                      type={'text'}
                      onChange={props.handleChange}
                      value={get(props.values, 'ipWhitelist', '')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      disabled={selectedId !== ''}
                      label={'Last time change IP'}
                      isAsterisk
                      name="lastChangeIp"
                      type={'text'}
                      value={get(props.values, 'lastChangeIp', '')}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      disabled={selectedId !== ''}
                      label={'Last time changed location'}
                      isAsterisk
                      name="lastChangeLocation"
                      type={'text'}
                      value={get(props.values, 'lastChangeLocation', [])}
                    />
                  </Col>
                </Row>
                <div className="d-flex flex-column align-items-center">
                  <Button
                    primary
                    type="submit"
                    className="min-width-300 mt-4"
                    loading={props.isSubmitting}
                  >{selectedId === '' ? intl.formatMessage(messages.create) : intl.formatMessage(messages.update)}</Button>
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


LicensePopup.propTypes = {
};

const Wrapper = styled.div`
  margin-bottom: 10px;

  .content {
    border: 1px solid ${(props) => props.theme.colors.gray300};
    display: flex;
    flex-wrap: wrap;

    .label {
      color: ${(props) => props.theme.colors.black};
      font-size: ${(props) => props.theme.fontSizes.small12};
      opacity: 0.5;
    }

    .bold-text {
      color: ${(props) => props.theme.colors.black};
      font-size: ${(props) => props.theme.fontSizes.normal};
      font-weight: ${(props) => props.theme.fontWeights.strong};
      opacity: 0.8;
    }

    .group {
      padding: 10px 18px;
      background-color: ${(props) => props.theme.colors.white};
      width: 50%;

      &.gray {
        background-color: ${(props) => props.theme.colors.gray};
      }
    }
  }
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(LicensePopup);
