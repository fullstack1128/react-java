import React, { Fragment } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import ErrorMessage from 'components/common/ErrorMessage';
import UploadFilePreview from 'components/common/UploadFilePreview';

import { getBase64Async } from 'utils/fileHelper';
import messagesCommon from '../messages';
import messagesUploadFile from '../UploadTextFile/messages';
import RemoveFileButton from '../../RemoveFileButton';
import * as PropTypes from 'prop-types';

const StyledContainer = styled.div`
  display: inline-block;
  text-align: left;
  vertical-align: middle;
  position: relative;
  width: 100%;

  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 0px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .upload-button {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.blue700};
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
  }

  input[type="file"] {
    display: none;
  }
  
  .file-name {
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: ${(props) => props.theme.fontWeights.strong};
    opacity: 0.3;
    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
    display: block;
    margin-right: 20px;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
  }
`;

class FormUploadFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
    };
  }

  handleChooseFile = async (event) => {
    const { name, setFieldValue, setFieldTouched, group } = this.props;

    const files = event.currentTarget.files;
    if (files.length > 0) {
      if (group) {
        for (let i = 0; i < group.length && i < files.length; i++) {
          const file = files[i];
          const base64 = await getBase64Async(file);
          setFieldValue(group[i], base64);
        }
      } else {
        const file = files[0];
        const base64 = await getBase64Async(file);
        setFieldValue(name, base64);
      }
    }

    setFieldTouched(name);
    const file = files[0];

    // if (file) {
    //   const base64 = await getBase64Async(file);
    //   setFieldValue(name, base64);
    //   setFieldTouched(name);
    // } else {
    //   setFieldValue(name, '');
    //   setFieldTouched(name);
    // }

    this.setState({
      fileName: file ? file.name : '',
    });
  }

  handleRemove = () => {
    const { name, setFieldValue, setFieldTouched } = this.props;
    setFieldValue(name, '');
    setFieldTouched(name);

    this.setState({
      fileName: '',
    });
  }

  render() {
    const { value, label, name, hint, accept, isRequired, intl } = this.props;
    const { fileName } = this.state;

    let ChildrenComponent;

    if (hint) {
      ChildrenComponent = (
        <Fragment>
          <a
            className="button-upload-image"
            onClick={() => this.input.click()}
            role={'button'}
            tabIndex={-1}
          >
            {(<UploadFilePreview file={value} hint={hint} />)}
          </a>

          {value && <RemoveFileButton
            top={8}
            right={10}
            isImage
            iconSize={20}
            handleRemove={this.handleRemove}
          />}
        </Fragment>
      );
    } else {
      const fileNameShow = fileName || (value ? value.split('/').pop() : '');

      let fileNameHtml = <div className="file-name">{fileNameShow}</div>;
      if (!fileName) {
        fileNameHtml = <a href={value} className="file-name">{fileNameShow}</a>;
      }

      ChildrenComponent = (
        <Fragment>
          {fileNameShow && (<Fragment>
            {fileNameHtml}

            <RemoveFileButton
              top={22}
              right={0}
              handleRemove={this.handleRemove}
            />
          </Fragment>)}

          <a
            onClick={() => this.input.click()}
            className="upload-button"
            role={'button'}
            tabIndex={-1}
          >
            {intl.formatMessage(messagesUploadFile.upload)}
          </a>
        </Fragment>
      );
    }

    return (
      <StyledContainer>
        <div className="label">{label} {!isRequired && `(${intl.formatMessage(messagesCommon.optional)})`}</div>
        {ChildrenComponent}

        <input
          type="file"
          name={name}
          accept={accept || '.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf'}
          onChange={this.handleChooseFile}
          multiple
          ref={(ref) => {
            this.input = ref;
          }}
        />

        <ErrorMessage name={name} />
      </StyledContainer>
    );
  }
}

FormUploadFile.defaultProps = {
  isRequired: true,
};

export default injectIntl(FormUploadFile);
