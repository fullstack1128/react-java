import React from 'react';
import { Icon } from '@blueprintjs/core';
import theme from '../../../../styles/themeStyle';
import { messages } from '../index';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

export const STATUSES = {
  DONE: 'done',
  ACTIVE: 'active',
  COMING: 'coming',
};

const StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .icon {    
    width: 20px;
    height: 20px;    
    border: solid 1px #16998f;
    background-color: #ffffff;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .title {    
    opacity: 0.8;
    font-size: 14px;
    font-weight: 300;
    color: #000000;
  }
  
  &.step-done {
    &:before {
      content: '';
      border: solid 1px #16998f;
      background-color: #16998f;
      width: 16px;
      height: 16px;
      position: absolute;
      border-radius: 50%;
      top: 2px;
    }
  }
  
  &.step-active {
  }
  
  &.step-coming {    
  }
`;

class StepItem extends React.Component {
  render() {
    const { intl, number, status } = this.props;

    return (
      <StyledComponent className={`step step-${status}`}>
        <div className={'icon'} />
        {/* {status === STATUSES.ACTIVE && <div className={'title'}>*/}
        {/*  <span>{intl.formatMessage(messages.textStep)} {number}</span>*/}
        {/* </div>}*/}
      </StyledComponent>
    );
  }
}

StepItem.propTypes = {
  number: PropTypes.number,
  status: PropTypes.oneOf(Object.values(STATUSES)),
};

export default injectIntl(StepItem);
