/**
 *
 * UploadAvatar
 *
 */

import React from 'react';
// import styled from 'styled-components';
import StyledDropzone from './styled/DropzoneWrapper';
import Wrapper from './styled/Wrapper';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import messages from './messages';
import ErrorMessage from '../ErrorMessage';
import messagesCommon from '../messages';
import { ACCEPT_ALL_TYPES, MAX_UPLOAD_FILE_SIZE, MAX_UPLOAD_FILE_SIZE_TEXT } from 'utils/transactions/constants';
import isEmpty from 'lodash/isEmpty';
import FileName from './FileName';
import FormLabel from '../FormLabel';
import uploadIcon from 'images/sidebarIcon/ic-unarchive-copy.svg';

class UploadTextFile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      const { setFieldValue, name, value } = nextProps;

      if (setFieldValue) {
        setFieldValue(name, value);
      }
    }
  }

  onDrop = (acceptedFiles) => {
    const { multiple, value, maxFiles } = this.props;

    if (acceptedFiles.length > 0) {
      if (multiple) {
        if (!value) {
          this.props.onDrop(acceptedFiles.slice(0, maxFiles));
        } else if (value.length < maxFiles) {
          this.props.onDrop(acceptedFiles.slice(0, maxFiles - value.length));
        }
      } else {
        this.props.onDrop(acceptedFiles[0]);
      }
    }
  };

  onDropRejected = (file) => {
    const { setFieldError, setFieldTouched, name, intl, fileFormat } = this.props;

    // eslint-disable-next-line no-restricted-syntax
    for (const item of file) {
      if (item.size > MAX_UPLOAD_FILE_SIZE) {
        setFieldError(name, intl.formatMessage(messages.formFileSizeError, { maxSize: MAX_UPLOAD_FILE_SIZE_TEXT }));
      } else {
        setFieldError(name, intl.formatMessage(messages.formFileFormatError, { format: fileFormat || 'PNG, JPEG, JPG, DOC, DOCX, PDF, XLS, XLSX' }));
      }

      setFieldTouched(name, true, false);
      return;
    }
  };

  handleRemove = (index) => {
    this.props.handleRemove(index);
  };

  getRealFileName = (fileName) => {
    let result = fileName;

    const fragment = fileName.split('.');
    if (fragment.length > 2) {
      fragment.splice(0, 1);
      result = fragment.join('.');
    }

    return result;
  };

  renderFileName = () => {
    const { multiple, value, readonly, rowsNotAllowRemove = [] } = this.props;

    if (isEmpty(value)) {
      return null;
    }

    if (multiple && Array.isArray(value)) {
      return value.map((item, index) => {
        const fileName = item ? item.split('/').pop() : '';
        return (
          <FileName
            readonly={readonly}
            allowRemove={!rowsNotAllowRemove.includes(index.toString())}
            key={index}
            href={item}
            fileName={this.getRealFileName(fileName)}
            handleRemove={() => this.handleRemove(index)}
            isFirst={index === 0}
            isLast={index === (value.length - 1)}
          />
        );
      });
    }

    const fileName = value ? value.split('/').pop() : '';

    return (
      <FileName
        readonly={readonly}
        href={value}
        fileName={this.getRealFileName(fileName)}
        handleRemove={this.handleRemove}
        allowRemove
        isFirst
        isLast
      />
    );
  };

  render() {
    const { label, intl, name, isRequired, multiple, disabled, value, maxFiles, tooltip, readonly, accept } = this.props;

    return (
      <Wrapper>
        {label &&
        <FormLabel>{label} {!isRequired && `(${intl.formatMessage(messagesCommon.optional)})`} {tooltip || ''}</FormLabel>}

        <div className={`list-file ${!value ? 'no-data' : ''}`}>
          {this.renderFileName()}

          {!readonly && <StyledDropzone
            onDrop={this.onDrop}
            disabled={disabled}
            multiple={multiple}
            accept={accept || ACCEPT_ALL_TYPES}
            name={name}
            maxSize={MAX_UPLOAD_FILE_SIZE}
            onDropRejected={this.onDropRejected}
          >
            {!disabled && (!multiple || !value || value.length < maxFiles) &&
            <div className={`d-flex align-items-center justify-content-center btn-upload ${!value ? 'no-data' : ''}`}>
              <img src={uploadIcon} className="mr-2" />
              {intl.formatMessage(messages.upload)}
            </div>}
          </StyledDropzone>}
        </div>

        <ErrorMessage name={name} />
      </Wrapper>
    );
  }
}

UploadTextFile.propTypes = {
  onDrop: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  setFieldValue: PropTypes.func,
  handleRemove: PropTypes.func,
  multiple: PropTypes.bool,
  readonly: PropTypes.bool,

  // multiple
  maxFiles: PropTypes.number,
};

UploadTextFile.defaultProps = {
  isRequired: true,
  multiple: false,
  maxFiles: 6,
};

export default injectIntl(UploadTextFile);
