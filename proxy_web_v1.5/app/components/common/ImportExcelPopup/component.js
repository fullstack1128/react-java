import React from 'react';
import ActionDialog from '../ActionDialog';
import * as PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import Button from '../Button';
import ButtonLink from '../../ButtonLink';
import UploadTextFile from '../UploadTextFile';
import get from 'lodash/get';
import { injectIntl } from 'react-intl';
import messages from './messages';
import * as XLSX from 'xlsx';
import { CommonToaster } from '../../CommonToaster';
import { Intent } from '@blueprintjs/core';
import getSchema from './validateSchema';
import { ACCEPT_EXCEL_TYPES } from '../../../utils/transactions/constants';
import styled from 'styled-components';
import { darken } from 'polished';

const StyledComponent = styled.div`
  .download-template-link {
    color: ${(props) => props.theme.colors.activeBorder};
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: 300;
    
    &:hover {
      color: ${(props) => darken(0.05, props.theme.colors.activeBorder)};
      text-decoration: underline ${(props) => darken(0.05, props.theme.colors.activeBorder)};
    }
    
    &:active {
      color: ${(props) => darken(0.1, props.theme.colors.activeBorder)};
      text-decoration: underline ${(props) => darken(0.1, props.theme.colors.activeBorder)};
    }    
  }
  
  small {
    white-space: pre-wrap;
  }
`;

class ImportExcelPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialValues: {
        files: null,
      },
      errorMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isOpen && nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        errorMessage: '',
      });
    }
  }

  onDrop = (data, formikProps) => {
    formikProps.setFieldValue('files', data);
  };

  onSubmit = (values, { setSubmitting }) => {
    if (!get(values, 'files')) return;

    const { handleSubmit, handleDataNotFound, intl, onClose } = this.props;

    const reader = new FileReader();

    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, {
        type: 'binary',
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const roa = XLSX.utils.sheet_to_json(ws, { header: 1 });

      /* Update state */
      if (roa.length === 0) {
        if (handleDataNotFound) {
          handleDataNotFound();
        } else {
          CommonToaster.show({
            message: intl.formatMessage(messages.dataMotFoundMessage),
            intent: Intent.DANGER,
          });
        }
      } else if (handleSubmit) {
        handleSubmit(roa.filter((o) => o.length > 0), ({ errorMessage } = {}) => {
          setSubmitting(false);

          if (errorMessage) {
            this.setState({
              errorMessage,
            });
          } else {
            onClose();
          }
        });
      }
    };

    reader.readAsBinaryString(get(values, 'files'));
  };

  handleRemove = (formikProps) => {
    formikProps.setFieldValue('files', null);
  };

  render() {
    const { intl, isOpen, title, onClose, uploadLabel, downloadTemplateLink, downloadTemplateText, btnCancelText, btnConfirmText, messageErrors } = this.props;
    const { initialValues } = this.state;

    return (
      <ActionDialog
        isOpen={isOpen}
        onClose={onClose}
        title={title || intl.formatMessage(messages.title)}
      >
        <StyledComponent>
          <Formik
            onSubmit={this.onSubmit}
            initialValues={initialValues}
            validationSchema={getSchema(intl, messageErrors)}
            render={(props) => (
              <Form>
                <div className="action-popup-footer mt-5">
                  <UploadTextFile
                    label={uploadLabel}
                    onDrop={(data) => this.onDrop(data, props)}
                    name={'files'}
                    value={get(props.values, 'files.name')}
                    handleRemove={() => this.handleRemove(props)}
                    setFieldError={props.setFieldError}
                    setFieldTouched={props.setFieldTouched}
                    accept={ACCEPT_EXCEL_TYPES}
                    fileFormat={'XLS, XLSX, XLSM'}
                  />

                  <a
                    href={downloadTemplateLink || '#'}
                    className="text-right mb-3 download-template-link"
                  >{downloadTemplateText || intl.formatMessage(messages.downloadTemplateText)}</a>

                  {this.state.errorMessage && <small className="text-danger">{this.state.errorMessage}</small>}

                  <Button
                    type={'submit'}
                    className="min-width-300 mt-4"
                    primary
                    text={btnConfirmText || intl.formatMessage(messages.btnConfirmText)}
                    loading={props.isSubmitting}
                  />
                  <ButtonLink
                    onClick={onClose}
                    type={'button'}
                  >
                    {btnCancelText || intl.formatMessage(messages.btnCancelText)}
                  </ButtonLink>
                </div>
              </Form>
            )}
          />
        </StyledComponent>
      </ActionDialog>
    );
  }
}

ImportExcelPopup.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  btnConfirmText: PropTypes.string,
  btnCancelText: PropTypes.string,
  downloadTemplateLink: PropTypes.string,
  downloadTemplateText: PropTypes.string,
  uploadLabel: PropTypes.string,
  handleDataNotFound: PropTypes.func,
  handleSubmit: PropTypes.func,
  messageErrors: PropTypes.shape({
    filesRequiredMessage: PropTypes.string,
  }),
};
ImportExcelPopup.defaultProps = {
  messageErrors: {},
};


export default injectIntl(ImportExcelPopup);
