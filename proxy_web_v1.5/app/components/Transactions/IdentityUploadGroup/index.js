import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import get from 'lodash/get';
import UploadImage from 'components/CommonFormControls/UploadImage';
import { CommonToaster } from '../../CommonToaster';
import { Intent } from '@blueprintjs/core/lib/esm/index';
import { getErrorMessageFromError } from 'constants/responseCode/utils';
import { uploadPhotoCardFileReq } from 'services/user.service';

const StyledContainer = styled(Row)`
  .label {
    font-size: ${(props) => props.theme.fontSizes.small};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    color: ${(props) => props.theme.colors.black900};
    margin-bottom: 5px;
    opacity: 0.8;

    &:first-letter {
      text-transform: uppercase;
    }
  }
`;

const handleRemoveFile = (name, props) => {
  props.setFieldValue(name, '');
};

const handleUploadSingleFile = async (file, name, props) => {
  try {
    if (file && file.length > 0) {
      const rs = await uploadPhotoCardFileReq(file[0]);
      props.setFieldValue(name, get(rs, 'data.url') || null);
    }
  } catch (e) {
    CommonToaster.show({
      message: props.intl.formatMessage(getErrorMessageFromError(e)),
      intent: Intent.DANGER,
    });
  }
};

const IdentityUploadGroup = (props) => {
  const { label, frontPayload, backPayload } = props;
  return (
    <StyledContainer>
      <Col sm="6">
        <UploadImage
          key="font"
          name={frontPayload.name}
          value={frontPayload.value}
          onDrop={(data) => handleUploadSingleFile(data, frontPayload.name, props)}
          handleRemove={() => handleRemoveFile(frontPayload.name, props)}
          desc={frontPayload.hint}
          {...props}
          label={label}
        />
      </Col>

      <Col sm="6">
        <UploadImage
          key="back"
          name={backPayload.name}
          value={backPayload.value}
          onDrop={(data) => handleUploadSingleFile(data, backPayload.name, props)}
          handleRemove={() => handleRemoveFile(backPayload.name, props)}
          desc={backPayload.hint}
          {...props}
          label={<Fragment>&nbsp;</Fragment>}
        />
      </Col>
    </StyledContainer>
  );
};

export default IdentityUploadGroup;
