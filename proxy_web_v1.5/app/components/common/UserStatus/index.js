import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import styled from 'styled-components';

import { eUserStatus, userStatusMessages } from 'enums/EUserStatus';

export const matchStatusName = (status) => {
  switch (status) {
    case eUserStatus.ACTIVE:
      return userStatusMessages.Active;
    case eUserStatus.PAUSE:
      return userStatusMessages.Pause;
    case eUserStatus.PENDING:
      return userStatusMessages.Pending;
    case eUserStatus.INACTIVE:
      return userStatusMessages.Inactive;
    case eUserStatus.LOCKED:
      return userStatusMessages.Locked;
    default:
      console.log('Unmatched transaction status', status);
      return userStatusMessages.Inactive;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case eUserStatus.ACTIVE:
      return '#f7c471';
    case eUserStatus.PENDING:
      return '#76b1f5';
    case eUserStatus.INACTIVE:
      return '#c12c3e';
    case eUserStatus.PAUSE:
    case eUserStatus.LOCKED:
      return '#e1774d';
    default:
      return '#000000';
  }
};

const StyledContainer = styled.span`
  height: 26px;
  line-height: 26px;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 13px;
  border: solid 1px ${(props) => props.statusColor || props.theme.colors.black};
  color: ${(props) => props.statusColor || props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.strong700};
`;

const UserStatus = (props) => {
  const { status } = props;
  const statusMessage = matchStatusName(status);
  return (
    <StyledContainer statusColor={getStatusColor(status)}>
      <FormattedMessage {...statusMessage} />
    </StyledContainer>
  );
};

export default UserStatus;
