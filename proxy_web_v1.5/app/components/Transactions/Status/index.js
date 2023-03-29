import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import styled from 'styled-components';

import statuses from 'enums/ETransactionStatus';

const scope = 'app.common.Transaction';
const messages = defineMessages({
  Status: {
    id: `${scope}.Status`,
    defaultMessage: 'Status',
  },
  StatusNew: {
    id: `${scope}.StatusNew`,
    defaultMessage: 'Vừa nộp',
  },
  StatusWaitingForConnection: {
    id: `${scope}.StatusWaitingForConnection`,
    defaultMessage: 'Chờ kết nối',
  },
  StatusConnected: {
    id: `${scope}.StatusConnected`,
    defaultMessage: 'Đã kết nối',
  },
  StatusDone: {
    id: `${scope}.StatusDone`,
    defaultMessage: 'Hoàn thành',
  },
  StatusDeclined: {
    id: `${scope}.StatusDeclined`,
    defaultMessage: 'Đã từ chối',
  },
  StatusProcessing: {
    id: `${scope}.StatusProcessing`,
    defaultMessage: 'Đang xử lý',
  },
  StatusCancelled: {
    id: `${scope}.StatusCancelled`,
    defaultMessage: 'Đã hủy',
  },
  StatusWaitingForCancelled: {
    id: `${scope}.StatusWaitingForCancelled`,
    defaultMessage: 'Chờ hủy',
  },
  StatusUnmatched: {
    id: `${scope}.StatusUnmatched`,
    defaultMessage: 'Unmatched',
  },
});

export const matchStatusName = (status) => {
  switch (status) {
    case statuses.NEW:
      return messages.StatusNew;
    case statuses.WAITING_FOR_CONNECTION:
      return messages.StatusWaitingForConnection;
    case statuses.CONNECTED:
      return messages.StatusConnected;
    case statuses.DONE:
      return messages.StatusDone;
    case statuses.DECLINED:
      return messages.StatusDeclined;
    case statuses.PROCESSING:
      return messages.StatusProcessing;
    case statuses.CANCELLED:
      return messages.StatusCancelled;
    case statuses.WAITING_FOR_CANCELLED:
      return messages.StatusWaitingForCancelled;
    default:
      return messages.StatusUnmatched;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case statuses.NEW:
      return '#76b1f5';
    case statuses.WAITING_FOR_CONNECTION:
      return '#2c91b8';
    case statuses.CONNECTED:
      return '#a8dc73';
    case statuses.PROCESSING:
      return '#f7c471';
    case statuses.DONE:
      return '#78ae3d';
    case statuses.DECLINED:
    case statuses.CANCELLED:
      return '#c12c3e';
    case statuses.WAITING_FOR_CANCELLED:
      return '#e1774d';
    default:
      return '#000000';
  }
};

const StyledContainer = styled.span`
  color: ${(props) => props.statusColor || props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-weight: ${(props) => props.theme.fontWeights.strong500};

  &.tag {
    height: 26px;
    line-height: 26px;
    padding-left: 14px;
    padding-right: 14px;
    border-radius: 13px;
    border: solid 1px ${(props) => props.statusColor || props.theme.colors.black};
  }
`;

const Status = (props) => {
  const { status, type } = props;
  const statusMessage = matchStatusName(status);
  return (
    <StyledContainer statusColor={getStatusColor(status)} className={type}>
      <FormattedMessage {...statusMessage} />
    </StyledContainer>
  );
};

export default Status;
