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
import { updateConfiguration } from 'services/admin/configuration.service';
import FormInputGroup from 'components/common/FormInputGroup';
import FormLabel from 'components/common/FormLabel';
import moment from 'moment';
import { errorCode } from 'constants/responseCode';
import { locationList } from 'utils/numberHelper';
import CKEditor from 'ckeditor4-react';


const StyledContainer = styled(ActionDialog)`
  
`;

class ConfigurationPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        value: '',
        description: '',
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedId !== '') {
      this.setState({
        initData: nextProps.selectedObject,
      });
    } else {
      const initData = {
        value: '',
        description: '',
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

    const { selectedId, forceRefresh, handleOnClose, intl } = this.props;
    const [err, response] = await TO(updateConfiguration(selectedId, dataSubmit));
    if (err) {
      this.props.handleAlertError(intl.formatMessage(messages.msgUpdateFailed));
    }
    if (response.code === errorCode.SUCCESS) {
      this.props.handleAlertSuccess(intl.formatMessage(messages.msgUpdateSuccess));
      handleOnClose();
      forceRefresh();
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
    } = this.props;

    const {
      initData,
    } = self.state;


    return (
      <StyledContainer
        portalClassName="custom-portal"
        title={'Update configuration'}
        usePortal
        canOutsideClickClose
        canEscapeKeyClose
        isOpen={isOpen}
        onClose={handleOnClose}
        width={650}
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
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Key'}
                      isAsterisk
                      name="key"
                      type={'text'}
                      value={get(props.values, 'key', '')}
                      disabled
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    {
                      ['EMAIL_TEMPLATE_PURCHASE', 'EMAIL_TEMPLATE_EXPIRING', 'HTML_CUSTOMER_PAGE']
                        .includes(get(props.values, 'key', '')) ?
                          <div className="mb-2">
                            <FormLabel isAsterisk>Value</FormLabel>
                            <CKEditor
                              data={get(props.values, 'value', '')}
                              onChange={(evt) => {
                                props.setFieldValue('value', evt.editor.getData());
                              }}
                              config={{
                                toolbar: [
                                ['Source'],
                                ['Styles', 'Format', 'Font', 'FontSize'],
                                ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'],
                                ['Undo', 'Redo'],
                                ['EasyImageUpload'],
                                ['About'],
                                ],
                                extraPlugins: 'easyimage',
                                removePlugins: 'image',
                                autoParagraph: false,
                              }}
                            />
                          </div>
                        :
                          <FormInputGroup
                            didCheckErrors={false}
                            label={'Value'}
                            isAsterisk
                            name="value"
                            onChange={(e) => {
                              props.handleChange(e);
                              props.setFieldTouched('value', true, true);
                            }}
                            type={'text'}
                            value={get(props.values, 'value', '')}
                          />

                    }
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Description'}
                      isAsterisk
                      name="description"
                      onChange={(e) => {
                        props.handleChange(e);
                        props.setFieldTouched('description', true, true);
                      }}
                      type={'text'}
                      value={get(props.values, 'description', '')}
                    />
                  </Col>
                </Row>
                <div className="d-flex flex-column align-items-center">
                  <Button
                    primary
                    type="submit"
                    className="min-width-300 mt-4"
                    loading={props.isSubmitting}
                  >{intl.formatMessage(messages.update)}</Button>
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


ConfigurationPopup.propTypes = {
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
)(ConfigurationPopup);
