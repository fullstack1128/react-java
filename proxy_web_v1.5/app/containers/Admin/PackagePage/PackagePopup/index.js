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
import { createPackage, updatePackage } from 'services/admin/package.service';
import FormCheckBox from 'components/common/FormCheckBox';
import FormInputGroup from 'components/common/FormInputGroup';
import auth from 'utils/auth';
import moment from 'moment';
import { permission } from 'constants/permission';
import { errorCode } from 'constants/responseCode';
import FormMoneyInputGroup from 'components/common/FormMoneyInputGroup';
import FormLabel from 'components/common/FormLabel';
import CKEditor from 'ckeditor4-react';

const StyledContainer = styled(ActionDialog)`
  
`;

class PackagePopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initData: {
        name: '',
        packageUnit: '',
        duration: null,
        price: null,
        status: '',
        type: 'MOBILE',
        allowChangeIp: 1,
        allowChangeLocation: 1,
        allowChangeISP: 1,
        minTimeChangeIp: '',
        location: '',
        isp: '',
        seq: '',
        content: '',
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
        name: '',
        packageUnit: '',
        duration: null,
        price: null,
        status: '',
        type: 'MOBILE',
        allowChangeIp: 1,
        allowChangeLocation: 1,
        allowChangeISP: 1,
        minTimeChangeIp: '',
        location: '',
        isp: '',
        seq: '',
      };
      this.setState({
        initData,
      });
    }
  }

  handleSubmit = async (values, { setSubmitting }) => {
    const dataSubmit = {
      ...values,
      type: 'MOBILE',
    };

    if (this.props.selectedId !== '') {
      this.handleSubmitUpdate(dataSubmit, setSubmitting);
    } else {
      this.handleSubmitCreate(dataSubmit, setSubmitting);
    }
  }

  handleSubmitUpdate = async (dataSubmit, setSubmitting) => {
    const { selectedId, forceRefresh, handleOnClose, intl } = this.props;
    const [err, response] = await TO(updatePackage(selectedId, dataSubmit));
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
    const { forceRefresh, handleOnClose, intl } = this.props;
    const [err, response] = await TO(createPackage(dataSubmit));
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
      ispList,
    } = this.props;

    const {
      initData,
    } = self.state;

    const packageTimeList = [{ id: 'DAY', name: 'Day' }, { id: 'WEEK', name: 'Week' }, { id: 'MONTH', name: 'Month' }];
    const statusList = [{ id: 'ACTIVE', name: 'Active' }, { id: 'DISABLE', name: 'Off' }];
    const ispOptions = convertDropdownList(ispList.map((i) => ({ name: i, id: i })), 'Unlimited', '');

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
                      label={'Package name'}
                      isAsterisk
                      name="name"
                      onChange={props.handleChange}
                      type={'text'}
                      value={get(props.values, 'name', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'Time unit'}
                      value={convertDropdownList(packageTimeList).find((option) =>
                        option.value === get(props.values, 'packageUnit')
                      )}
                      isAsterisk
                      name="packageUnit"
                      options={convertDropdownList(packageTimeList)}
                      {...props}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Time (date)'}
                      isAsterisk
                      name="duration"
                      onChange={props.handleChange}
                      type={'number'}
                      value={get(props.values, 'duration', [])}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormMoneyInputGroup
                      label={'Price (USD)'}
                      name="price"
                      decimalScale={2}
                      onChange={(e) => {
                        props.setFieldTouched('price', true);
                        props.setFieldValue('price', e.target.value);
                      }}
                      value={get(props.values, 'price')}
                      {...props}
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
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'IP change time(second)'}
                      isAsterisk
                      name="minTimeChangeIp"
                      onChange={props.handleChange}
                      type={'number'}
                      value={get(props.values, 'minTimeChangeIp', [])}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 6 }}>
                    <DropdownList
                      label={'ISP'}
                      value={ispOptions.find((option) =>
                        option.value === get(props.values, 'isp')
                      )}
                      isAsterisk
                      name="isp"
                      options={ispOptions}
                      {...props}
                    />
                  </Col>
                  <Col md={{ size: 6 }}>
                    <FormInputGroup
                      didCheckErrors={false}
                      label={'Order'}
                      isAsterisk
                      name="seq"
                      onChange={props.handleChange}
                      type={'number'}
                      value={get(props.values, 'seq', '')}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 12 }}>
                    <div className="mb-2">
                      <FormLabel isAsterisk>Content</FormLabel>
                      <CKEditor
                        data={get(props.values, 'content', '')}
                        onChange={(evt) => {
                          props.setFieldValue('content', evt.editor.getData());
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
                  </Col>
                </Row>
                <div className="d-flex flex-column align-items-center">
                  {selectedId === '' ?
                    <Button
                      primary
                      type="submit"
                      className="min-width-300 mt-4"
                      loading={props.isSubmitting}
                    >{intl.formatMessage(messages.add)}</Button>
                    :
                    <Button
                      primary
                      type="submit"
                      className="min-width-300 mt-4"
                      loading={props.isSubmitting}
                    >{intl.formatMessage(messages.update)}</Button>
                  }
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


PackagePopup.propTypes = {
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
)(PackagePopup);
