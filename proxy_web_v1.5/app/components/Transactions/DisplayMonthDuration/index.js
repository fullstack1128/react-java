import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import styled from 'styled-components';
import { isNumeric } from 'utils/stringHelper';

export const scope = 'app.common';

const messages = defineMessages({
  month: {
    id: `${scope}.month`,
    defaultMessage: 'tháng',
  },
  shortTerm: {
    id: `${scope}.shortTerm`,
    defaultMessage: 'Ngắn hạn',
  },
});

const StyledContainer = styled.div`
  &:first-letter {
    text-transform: uppercase;
  }
`;

const DisplayMonthDuration = ({ intl, duration, isShortTermDeposit = false }) => (
  <StyledContainer>
    {isShortTermDeposit ? intl.formatMessage(messages.shortTerm) : `${duration} ${isNumeric(duration) ? intl.formatMessage(messages.month) : ''}`}
  </StyledContainer>
);

export default injectIntl(DisplayMonthDuration);
