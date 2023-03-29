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
import { compose } from 'redux';
import WithHandleAlert from 'containers/WithHandleAlert';
import { updateAuthenticate } from 'services/user.service';
import { errorCode } from 'constants/responseCode';
import FormInputGroup from 'components/common/FormInputGroup';
import FormRadioGroup from 'components/common/FormRadioGroup';
import { generateAuthProxy } from 'utils/numberHelper';
import isEmpty from 'lodash/isEmpty';

const StyledContainer = styled(ActionDialog)`
  
`;

class AuthenticatePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticateWithUsername: true,
      selectedIds: [],
      initData: {
        authType: 'USERNAME',
        username: generateAuthProxy(),
        whiteListIps: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIds !== undefined) {
      const selectedId = nextProps.selectedId;
      const dataList = nextProps.dataList;

      if (selectedId && dataList) {
        const clientData = dataList.find((el) => get(el, 'uuid') === selectedId);
        const authenticationUsers = get(clientData, 'httpProxy.authenticationUsers');
        const authorizationIps = get(clientData, 'httpProxy.authorizationIps');
        if (!isEmpty(authorizationIps)) {
          this.setState({
            isAuthenticateWithUsername: false,
            initData: {
              authType: 'IP',
              username: generateAuthProxy(),
              whiteListIps: authorizationIps,
            },
          });
        } else if (!isEmpty(authenticationUsers)) {
          this.setState({
            isAuthenticateWithUsername: true,
            initData: {
              authType: 'USERNAME',
              username: authenticationUsers,
              whiteListIps: '',
            },
          });
        }
      } else {
        this.setState({
          selectedIds: nextProps.selectedIds,
          isAuthenticateWithUsername: true,
          initData: {
            authType: 'USERNAME',
            username: generateAuthProxy(),
            whiteListIps: '',
          },
        });
      }
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { forceRefresh, handleOnClose, intl, selectedIds } = this.props;

    const dataSubmit = {
      uuids: selectedIds,
      username: values.username,
      whiteListIps: values.whiteListIps,
    };

    const [err, response] = await TO(updateAuthenticate(dataSubmit));
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
      dataList,
      selectedId,
    } = this.props;

    const {
      initData,
      isAuthenticateWithUsername,
    } = self.state;

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Authenticate'}
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
            validationSchema={getSchema(intl, isAuthenticateWithUsername)}
            render={(props) => (
              <Form>
                <Row>
                  <Col>
                    <FormRadioGroup
                      options={[{
                        value: 'USERNAME',
                        label: 'Username:Password',
                      },
                      {
                        value: 'IP',
                        label: 'IP Whitelist',
                      }]}
                      name={'authType'}
                      label="Proxy authentication by:"
                      selectedValue={get(props.values, 'authType')}
                      {...props}
                      onChange={(value) => {
                        props.setFieldValue('authType', value);
                        props.setFieldValue('username', generateAuthProxy());
                        props.setFieldValue('whiteListIps', '');
                        this.setState({
                          isAuthenticateWithUsername: value === 'USERNAME',
                        });
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={{ size: 12 }}>
                    {isAuthenticateWithUsername ?
                      <FormInputGroup
                        didCheckErrors={false}
                        label={'Username:Password'}
                        name="username"
                        isTips
                        disabled
                        tips="Password will be generated randomly for each port. You can change during use."
                        onChange={(e) => {
                          props.handleChange(e);
                          props.setFieldTouched('username', true, true);
                        }}
                        type={'text'}
                        value={get(props.values, 'username', [])}
                        placeholder={'Password will be generated randomly for each port.'}
                        isRefreshButton
                        handleRefreshFunc={() => {
                          props.setFieldTouched('username', true, true);
                          props.setFieldValue('username', generateAuthProxy());
                        }}
                      />
                      :
                      <FormInputGroup
                        didCheckErrors={false}
                        label={'IP White list'}
                        name="whiteListIps"
                        isAsterisk
                        onChange={(e) => {
                          props.handleChange(e);
                          props.setFieldTouched('whiteListIps', true, true);
                        }}
                        type={'text'}
                        value={get(props.values, 'whiteListIps', [])}
                        isTips
                        tips="IP whitelist: IP1,IP2"
                        placeholder={'IP1,IP2'}
                      />
                    }
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


AuthenticatePopup.propTypes = {};

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
)(AuthenticatePopup);
