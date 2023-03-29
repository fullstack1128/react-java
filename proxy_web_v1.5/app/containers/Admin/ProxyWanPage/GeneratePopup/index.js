import React, { Fragment } from 'react';
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
import { generatePort, getModem } from 'services/admin/modem.service';
import FormInputGroup from 'components/common/FormInputGroup';
import { errorCode } from 'constants/responseCode';
import { generateAuthProxy } from 'utils/numberHelper';
import FormTextArea from 'components/common/FormTextArea';
import OptionQuota from './OptionQuota';
import BandwidthLimit from './BandwidthLimit';

const StyledContainer = styled(ActionDialog)`
  
`;

class GeneratePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        modemId: null,
        positionFrom: '',
        positionTo: '',
        numberOfPorts: 1,
        ipAuthenticationEntry: '',
        userAuthenticationEntry: generateAuthProxy(),
        httpPortStart: 20000,
        sockPortStart: 25000,
        whitelistLimitAccessEntry: '',
        blacklistLimitAccessEntry: '',
        counterUploadLimit: '0',
        counterUploadLimitBy: 1,
        counterUploadQuotaInMB: 100,
        counterDownloadLimit: '0',
        counterDownloadLimitBy: 1,
        counterDownloadQuotaInMB: 100,
        counterAllLimit: '0',
        counterAllLimitBy: 1,
        counterAllQuotaInMB: 100,
        bwLimitEnabled: '0',
        bwLimitRate: 1,
        maxConnection: 1000,
      },
      positions: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const initData = {
      modemId: null,
      positionFrom: '',
      positionTo: '',
      numberOfPorts: 1,
      ipAuthenticationEntry: '',
      userAuthenticationEntry: generateAuthProxy(),
      httpPortStart: 20000,
      sockPortStart: 25000,
      counterUploadLimit: '0',
      counterUploadLimitBy: 1,
      counterUploadQuotaInMB: 100,
      counterDownloadLimit: '0',
      counterDownloadLimitBy: 1,
      counterDownloadQuotaInMB: 100,
      counterAllLimit: '0',
      counterAllLimitBy: 1,
      counterAllQuotaInMB: 100,
      bwLimitEnabled: '0',
      bwLimitRate: 1,
      maxConnection: 1000,
    };
    this.setState({
      initData,
    });
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const dataSubmit = {
      ...values,
    };

    this.handleSubmitCreate(dataSubmit, setSubmitting);
  }

  handleSubmitCreate = async (dataSubmit, setSubmitting) => {
    const createData = {
      modemId: dataSubmit.modemId,
      positionFrom: dataSubmit.positionFrom,
      positionTo: dataSubmit.positionTo,
      numberOfPorts: dataSubmit.numberOfPorts,
      ipAuthenticationEntry: dataSubmit.ipAuthenticationEntry,
      userAuthenticationEntry: dataSubmit.userAuthenticationEntry,
      httpPortStart: dataSubmit.httpPortStart,
      sockPortStart: dataSubmit.sockPortStart,
      counterUploadLimit: dataSubmit.counterUploadLimit,
      counterUploadLimitBy: dataSubmit.counterUploadLimitBy,
      counterUploadQuotaInMB: dataSubmit.counterUploadQuotaInMB,
      counterDownloadLimit: dataSubmit.counterDownloadLimit,
      counterDownloadLimitBy: dataSubmit.counterDownloadLimitBy,
      counterDownloadQuotaInMB: dataSubmit.counterDownloadQuotaInMB,
      counterAllLimit: dataSubmit.counterAllLimit,
      counterAllLimitBy: dataSubmit.counterAllLimitBy,
      counterAllQuotaInMB: dataSubmit.counterAllQuotaInMB,
      bwLimitEnabled: dataSubmit.bwLimitEnabled,
      bwLimitRate: dataSubmit.bwLimitRate,
      maxConnection: dataSubmit.maxConnection,
    };

    const { forceRefresh, handleOnClose, intl } = this.props;
    const [err, response] = await TO(generatePort(createData));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgCreateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgCreateSuccess));
      handleOnClose();
      forceRefresh();
    } else if (response.message) {
      this.props.handleAlertError(response.message);
    } else {
      this.props.handleAlertError(intl.formatMessage(messages.msgCreateFailed));
    }
    setSubmitting(false);
  }

  handleLoadPosition = async (modemId) => {
    const modem = await getModem(modemId);
    const positions = get(modem, 'data.positions');
    this.setState({
      positions,
    });
  }

  render() {
    const self = this;
    const {
      intl,
      isOpen,
      handleOnClose,
      modems,
    } = this.props;

    const {
      initData,
      positions,
    } = self.state;

    const modemOptions = convertDropdownList(modems.map((i) => ({ name: i.name, id: i.uuid })));
    const positionOptions = convertDropdownList(positions.map((i) => ({ name: i, id: i })));

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Generate Ports'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={700}
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
                  <Col md={{ size: 12 }}>
                    <DropdownList
                      label={'Modem'}
                      isAsterisk
                      name="modemId"
                      value={modemOptions.find((option) =>
                        option.value === get(props.values, 'modemId', 0)
                      )}
                      options={modemOptions}
                      onChange={(option) => {
                        props.setFieldTouched('modemId', true);
                        props.setFieldValue('modemId', option.value);
                        this.handleLoadPosition(option.value);
                      }}
                      {...props}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'Position From'}
                      value={positionOptions.find((option) =>
                        option.value === get(props.values, 'positionFrom', 0)
                      )}
                      isAsterisk
                      name="positionFrom"
                      options={positionOptions}
                      {...props}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'Position To'}
                      value={positionOptions.find((option) =>
                        option.value === get(props.values, 'positionTo', 0)
                      )}
                      isAsterisk
                      name="positionTo"
                      options={positionOptions}
                      {...props}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      label={'Number of Ports'}
                      isAsterisk
                      name="numberOfPorts"
                      type={'number'}
                      value={get(props.values, 'numberOfPorts', 0)}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('numberOfPorts', true, true);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      label={'User Authentication'}
                      isAsterisk
                      name="userAuthenticationEntry"
                      type={'text'}
                      isRefreshButton
                      value={get(props.values, 'userAuthenticationEntry', '')}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('userAuthenticationEntry', true, true);
                      }}
                      handleRefreshFunc={() => {
                        props.setFieldTouched('userAuthenticationEntry', true, true);
                        props.setFieldValue('userAuthenticationEntry', generateAuthProxy());
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      label={'IP Authentication'}
                      name="ipAuthenticationEntry"
                      type={'text'}
                      value={get(props.values, 'ipAuthenticationEntry', '')}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('ipAuthenticationEntry', true, true);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      label={'Http port start'}
                      isAsterisk
                      name="httpPortStart"
                      type={'number'}
                      value={get(props.values, 'httpPortStart', '')}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('httpPortStart', true, true);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      label={'Sock port start'}
                      isAsterisk
                      name="sockPortStart"
                      type={'number'}
                      value={get(props.values, 'sockPortStart', '')}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('sockPortStart', true, true);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      label={'Max connection'}
                      name="maxConnection"
                      type={'number'}
                      value={get(props.values, 'maxConnection', '')}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('maxConnection', true, true);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormTextArea
                      label={'Restriction Whitelist'}
                      rows={2}
                      name="whitelistLimitAccessEntry"
                      value={get(props.values, 'whitelistLimitAccessEntry', '')}
                      placeholder="Please fill website list separate by comma (empty for ignore). Ex: *facebook.com,*.youtube.com"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('whitelistLimitAccessEntry', true, true);
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormTextArea
                      label={'Restriction Blacklist'}
                      rows={2}
                      name="blacklistLimitAccessEntry"
                      value={get(props.values, 'blacklistLimitAccessEntry', '')}
                      placeholder={'Please fill website list separate by comma (empty for ignore). Ex: *facebook.com,*.youtube.com'}
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('blacklistLimitAccessEntry', true, true);
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <OptionQuota
                    formikProps={props}
                    label={'Upload quota'}
                    data1Name={'counterUploadLimit'}
                    data2Name={'counterUploadLimitBy'}
                    data3Name={'counterUploadQuotaInMB'}
                  />
                </Row>
                <Row>
                  <OptionQuota
                    formikProps={props}
                    label={'Download quota'}
                    data1Name={'counterDownloadLimit'}
                    data2Name={'counterDownloadLimitBy'}
                    data3Name={'counterDownloadQuotaInMB'}
                  />
                </Row>
                <Row>
                  <OptionQuota
                    formikProps={props}
                    label={'Up/Down quota'}
                    data1Name={'counterAllLimit'}
                    data2Name={'counterAllLimitBy'}
                    data3Name={'counterAllQuotaInMB'}
                  />
                </Row>
                <Row>
                  <BandwidthLimit
                    formikProps={props}
                    label={'Bandwidth limit'}
                    bwLimitEnabled={'bwLimitEnabled'}
                    bwLimitRate={'bwLimitRate'}
                  />
                </Row>

                <div className="d-flex flex-column align-items-center">
                  <Button
                    primary
                    type="submit"
                    className="min-width-300 mt-4"
                    loading={props.isSubmitting}
                  >{intl.formatMessage(messages.create)}</Button>
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


GeneratePopup.propTypes = {
};

const Wrapper = styled.div`
  margin-bottom: 10px;
`;


export default compose(
  WithHandleAlert,
  injectIntl
)(GeneratePopup);
