import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import theme from '../../../styles/themeStyle';
import StyledComponent from './styled';
import { messages } from '../NavigationStep/index';
import { injectIntl } from 'react-intl';


// eslint-disable-next-line react/prefer-stateless-function
class NavigationStepMobile extends Component {
  render() {
    const { intl, step } = this.props;

    return (
      <StyledComponent>
        <div className="title title--active">
          <span className="step">{intl.formatMessage(messages.textStep)} {step.number}: </span>
          <span>{step.title}</span>
        </div>
        {/* <Icon icon="full-circle" iconSize="28" color={theme.colors.green700} />*/}
      </StyledComponent>
    );
  }
}

export default injectIntl(NavigationStepMobile);
