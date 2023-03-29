import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import messages from '../messages';


const Wrapper = styled.a`
  color: ${(props) => props.theme.colors.activeBorder};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.strong500};
`;


const FormUpdateLabel = ({ intl, actionUpdate }) => (
  <Wrapper
    role={'button'}
    tabIndex={-1}
    onClick={actionUpdate()}
  >
    <span>{intl.formatMessage(messages.update)}</span>
  </Wrapper>
);

export default injectIntl(FormUpdateLabel);
