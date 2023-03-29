import messages from './messages';
import get from 'lodash/get';
import ETransactionType from '../../../enums/ETransactionType';

export const getLabelByType = (intl, type, key) => {
  const labels = {
    [ETransactionType.LOAN]: {
      desiredAmount: intl.formatMessage(messages.desiredAmount),
    },
    [ETransactionType.SAVING_DEPOSIT]: {
      desiredAmount: intl.formatMessage(messages.savingDepositAmount),
    },
    [ETransactionType.BORROWING_P2P]: {
      desiredAmount: intl.formatMessage(messages.desiredAmount),
    },
    [ETransactionType.LENDING_P2P]: {
      desiredAmount: intl.formatMessage(messages.desiredAmountLending),
    },
  };

  return get(labels[type], key) || '';
};
