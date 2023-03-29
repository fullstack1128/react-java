import React from 'react';
import styled from 'styled-components';
import { injectIntl, defineMessages } from 'react-intl';

const scope = "app.common";

const messages = defineMessages({
  requireLogin: {
    id: `${scope}.textRequireLogin`,
    defaultMessage: 'Please login to use this function.',
  },
});

const StyledBankName = styled.div`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.big24};
  font-weight: bold;
  margin-top: 50px;
`;

export const RequireLoginWarning = ({ intl }) => (
  <StyledBankName>
    {intl.formatMessage(messages.requireLogin)}
  </StyledBankName>
);

export default injectIntl(RequireLoginWarning);

