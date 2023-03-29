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
import { updateRotationTime } from 'services/user.service';
import { errorCode } from 'constants/responseCode';
import * as Yup from 'yup';
import FormInputGroup from 'components/common/FormInputGroup';

const StyledContainer = styled(ActionDialog)`
  
`;

class AutoRotationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        autoRotationTime: '',
        minPkgTime: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIds !== undefined) {
      this.setState({
        initData: {
          autoRotationTime: nextProps.autoRotationTime,
          minPkgTime: nextProps.minPkgTime,
        },
      });
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const { forceRefresh, handleOnClose, intl, selectedIds } = this.props;

    const dataSubmit = {
      autoRotationTime: values.autoRotationTime,
      uuids: selectedIds,
    };

    const [err, response] = await TO(updateRotationTime(dataSubmit));
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
      minPkgTime,
    } = this.props;

    const {
      initData,
    } = self.state;

    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Update auto rotation time'}
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
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Auto rotation time (minutes)'}
                      name="autoRotationTime"
                      isAsterisk
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('autoRotationTime', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'autoRotationTime', [])}
                      isTips
                      tips={`Please enter 0 to turn off rotation. Min auto rotation time is ${minPkgTime} seconds.`}
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


AutoRotationPopup.propTypes = {};

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
)(AutoRotationPopup);
