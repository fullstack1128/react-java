import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import styled, { css } from 'styled-components';
import ErrorMessage from 'components/common/ErrorMessage';
import { injectIntl } from 'react-intl';
import messages from '../messages';
import { focusControl } from '../../../styles/commonCss';
import FormLabel from '../FormLabel';
import FormGroup from '../FormGroup';
import isEmpty from 'lodash/isEmpty';
import FormUpdateLabel from 'components/common/FormUpdateLabel';
import ButtonLink from '../../ButtonLink';

const StyledContainer = styled(FormGroup)`  
  .bp3-input {
    min-height: 40px;
    // padding: 0 20px;
    font-size: ${(props) => props.theme.fontSizes.small} !important;

    &:disabled {
      color: #000000;
      background-color: ${(props) => props.theme.colors.grayDisabled};
      border: solid 1px ${(props) => props.theme.colors.gray300};
    }

    &:focus {
      ${focusControl}
    }
  }
  
  .label-group {
    position: relative;
    
    .label {
      width: max-content;          
    }
  }   
`;

const FormInputGroup = ({ label, name, type = 'text', hasSendOTP, onSendOTP, sentOTP, isRequired, isAsterisk, intl, placeholder, actionUpdate, isTips, tips,
                          isRefreshButton,
                          handleRefreshFunc,
                          ...rest }) => (
  <StyledContainer hasSendOTP={hasSendOTP}>
    {label && <div className={`label-group d-flex ${actionUpdate ? 'justify-content-between' : ''}`}>
      <FormLabel
        className="label"
        isAsterisk={isAsterisk}
      >{label} {!isRequired && `(${intl.formatMessage(messages.optional)})`}
      </FormLabel>
      {actionUpdate && <FormUpdateLabel actionUpdate={actionUpdate} />}
    </div> }
    <div className="d-flex align-items-center">
      <InputGroup
        large
        type={type}
        name={name}
        className="flex-grow-1"
        placeholder={isEmpty(placeholder) ? `${intl.formatMessage(messages.inputMessage)} ${(label || '').toLowerCase()}` : placeholder}
        {...rest}
      />
      {isRefreshButton && <ButtonLink
        onClick={() => {
          handleRefreshFunc();
        }}
        style={{ width: 5, fontSize: 19 }}
      ><i className="fa fa-sync" title="Đổi mật khẩu" /></ButtonLink>
      }
    </div>
    { isTips && <span>
      <i className="far fa-exclamation-circle" />
      <span> {tips}</span>
    </span> }
    <ErrorMessage name={name} />
  </StyledContainer>
);

FormInputGroup.defaultProps = {
  isRequired: true,
  isAsterisk: false,
};

export default injectIntl(FormInputGroup);
