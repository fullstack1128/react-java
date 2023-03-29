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
import { updateModem, createModem } from 'services/admin/modem.service';
import FormCheckBox from 'components/common/FormCheckBox';
import FormInputGroup from 'components/common/FormInputGroup';
import auth from 'utils/auth';
import FormInputDatePicker from 'components/common/FormInputDatePicker';
import moment from 'moment';
import { errorCode } from 'constants/responseCode';
import { permission } from 'constants/permission';
import { locationList } from 'utils/numberHelper';

const StyledContainer = styled(ActionDialog)`
  
`;

class ModemPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        name: '',
        userName: '',
        password: '',
        domain: '',
        location: '',
        type: '',
        isp: '',
        status: '',
      },
      dataList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedId !== '') {
      this.setState({
        initData: nextProps.selectedObject,
      });
    } else {
      const initData = {
        name: '',
        userName: '',
        password: '',
        domain: '',
        location: '',
        type: '',
        isp: '',
        status: '',
      };
      this.setState({
        initData,
      });
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const dataSubmit = {
      ...values,
    };

    if (this.props.selectedId !== '') {
      this.handleSubmitUpdate(dataSubmit, setSubmitting);
    } else {
      this.handleSubmitCreate(dataSubmit, setSubmitting);
    }
  }

  handleSubmitUpdate = async (dataSubmit, setSubmitting) => {
    const updateData = {
      name: dataSubmit.name,
      userName: dataSubmit.userName,
      password: dataSubmit.password,
      location: dataSubmit.location,
      type: dataSubmit.type,
      isp: dataSubmit.isp,
    };

    const { selectedId, forceRefresh, handleOnClose, intl } = this.props;
    const [err, response] = await TO(updateModem(selectedId, updateData));
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

  handleSubmitCreate = async (dataSubmit, setSubmitting) => {
    const createData = {
      name: dataSubmit.name,
      userName: dataSubmit.userName,
      password: dataSubmit.password,
      location: dataSubmit.location,
      type: dataSubmit.type,
      isp: dataSubmit.isp,
      domain: dataSubmit.domain,
    };

    const { forceRefresh, handleOnClose, intl } = this.props;
    const [err, response] = await TO(createModem(createData));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.createdError));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.createdSuccess));
      handleOnClose();
      forceRefresh();
    } else if (response.message) {
      this.props.handleAlertError(response.message);
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.createdError));
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
    } = self.state;


    const modemTypeList = [{ id: 'MOBILE', name: 'Mobile' }];
    const modemStatusList = [{ id: 'READY', name: 'Active' }, { id: 'STOP', name: 'Stop' }, { id: 'PAUSE', name: 'Pause' }];

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={selectedId !== '' ? intl.formatMessage(messages.editLabel) : intl.formatMessage(messages.addLabel)}
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
                      didCheckErrors={false}
                      label={'Modem Name'}
                      isAsterisk
                      name="name"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('name', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'name', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Domain'}
                      isAsterisk
                      disabled={selectedId !== ''}
                      name="domain"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('domain', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'domain', [])}
                      placeholder={'Format: domain:port. Ex: http://domain:port/'}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Location'}
                      isAsterisk
                      name="location"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('location', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'location', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'ISP'}
                      isAsterisk
                      name="isp"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('isp', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'isp', [])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Username'}
                      isAsterisk
                      name="userName"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('userName', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'userName', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Password'}
                      isAsterisk
                      name="password"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('password', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'password', [])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'Modem Type'}
                      value={convertDropdownList(modemTypeList).find((option) =>
                        option.value === get(props.values, 'type')
                      )}
                      isAsterisk
                      name="type"
                      options={convertDropdownList(modemTypeList)}
                      {...props}
                    />
                  </Col>
                </Row>
                {selectedId !== '' ?
                  <Row>
                    <Col md={{ size: 6 }}>
                      <DropdownList
                        label={'Status'}
                        value={convertDropdownList(modemStatusList).find((option) =>
                        option.value === get(props.values, 'status')
                      )}
                        isAsterisk
                        disabled={selectedId !== ''}
                        name="status"
                        options={convertDropdownList(modemStatusList)}
                        {...props}
                      />
                    </Col>
                    <Col>
                      <FormInputGroup
                        didCheckErrors={false}
                        disabled
                        label={'Created Date'}
                        isAsterisk
                        name="createdAt"
                        type={'text'}
                        value={moment.utc(get(props.values, 'createdAt', [])).format('DD/MM/YYYY')}
                      />
                    </Col>
                  </Row> : '' }
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


ModemPopup.propTypes = {
};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(ModemPopup);
