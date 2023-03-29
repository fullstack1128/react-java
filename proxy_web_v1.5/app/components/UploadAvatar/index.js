/**
 *
 * UploadAvatar
 *
 */

import React from 'react';
// import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import defaultImage from 'images/default-avatar.png';
import { defineMessages, injectIntl } from 'react-intl';
import Wrapper from './styled/Wrapper';
import UploadImage from '../CommonFormControls/UploadImage';

const messages = defineMessages({
  optional: {
    id: 'app.components.UploadAvatar.optional',
    defaultMessage: 'tùy chọn',
  },
});

class UploadAvatar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value,
      }, () => {
        const { setFieldValue, name, value } = nextProps;

        if (setFieldValue) {
          setFieldValue(name, value);
        }
      });
    }
  }

  onDrop(acceptedFiles) {
    if (acceptedFiles.length > 0) {
      this.props.onDrop(acceptedFiles[0]);
    }
  }

  render() {
    const { name, className, isRequired, label, icon, intl, width, height, disabled, ...rest } = this.props;
    const imageUrl = this.state.value || defaultImage;

    return (
      <Wrapper className={className} width={width} height={height}>
        <UploadImage
          {...rest}
          // label={label + (!isRequired ? ` (${intl.formatMessage(messages.optional)})` : '')}
          name={name}
          onDrop={this.onDrop}
          value={imageUrl}
          desc={''}
          accept="image/png, image/jpeg"
          dropzoneRef={(ref) => {
            this.dropzoneRef = ref;
          }}
          disabled={disabled}
        />

        {!disabled && <a
          onClick={() => this.dropzoneRef.open()}
          role="button"
          tabIndex={-1}
        >
          <div className="upload-avatar__overlay" />
        </a>}
      </Wrapper>
    );
  }
}

UploadAvatar.propTypes = {
  onDrop: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  setFieldValue: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  disabled: PropTypes.bool,
};

UploadAvatar.defaultProps = {
  isRequired: true,
  height: 64,
  width: 64,
};

export default injectIntl(UploadAvatar);
