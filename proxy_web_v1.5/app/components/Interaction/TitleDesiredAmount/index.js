import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import types from 'enums/ETransactionType';

const scope = 'app.components.Interaction.TitleDesiredAmount';
const commonScope = 'app.common';

const messages = defineMessages({
  typeSavingDeposit: {
    id: `${scope}.typeSavingDeposit`,
    defaultMessage: 'Khoản gửi',
  },
  typeBorrowingP2P: {
    id: `${scope}.typeBorrowingP2P`,
    defaultMessage: 'Khoản vay',
  },
  typeLendingP2P: {
    id: `${scope}.typeLendingP2P`,
    defaultMessage: 'Khoản cho vay',
  },
  unmatched: {
    id: `${commonScope}.unmatched`,
    defaultMessage: 'Unmatched',
  },
});

const matchMessage = (type) => {
  switch (type) {
    case types.LOAN:
    case types.BORROWING_P2P:
      return messages.typeBorrowingP2P;
    case types.SAVING_DEPOSIT:
      return messages.typeSavingDeposit;
    case types.LENDING_P2P:
      return messages.typeLendingP2P;
    default:
      return messages.unmatched;
  }
};

const TitleDesiredAmount = (props) => {
  const { type } = props;
  const message = matchMessage(type);
  return (
    <span>
      <FormattedMessage {...message} />
    </span>
  );
};

export default TitleDesiredAmount;
