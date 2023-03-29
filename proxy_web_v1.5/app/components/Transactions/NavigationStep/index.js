import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import StepItem, { STATUSES } from './StepItem';

export const scope = 'app.common';

export const messages = defineMessages({
  textStep: {
    id: `${scope}.textStep`,
    defaultMessage: 'Bước',
  },
});

const NavigationStep = ({ number, currentStep, lastSearchStepNumber, completed }) => {
  if (completed) {
    return (<StepItem
      key={number}
      number={number}
      status={STATUSES.DONE}
    />);
  }

  if (number < currentStep) {
    return (<StepItem
      key={number}
      number={number}
      status={STATUSES.DONE}
    />);
  }

  if (number === currentStep) {
    return (<StepItem
      key={number}
      number={number}
      status={STATUSES.ACTIVE}
    />);
  }

  if (number > currentStep) {
    return (<StepItem
      key={number}
      number={number}
      status={STATUSES.COMING}
    />);
  }
  return null;
};

export default injectIntl(NavigationStep);
