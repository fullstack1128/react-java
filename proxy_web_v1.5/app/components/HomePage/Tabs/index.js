import React from 'react';
import { Tab, Tabs as BP3Tabs } from '@blueprintjs/core';
import * as PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

const StyledComponent = styled.div`
  .bp3-tab-list {
    display: inline-flex;
    border-radius: 20px;
    overflow: hidden;
    background-image: linear-gradient(103deg, #11988d, #173c44);
    height: 40px;
    padding: 4px;

    .bp3-tab.tab {
      margin-right: 0;
      font-size: 14px;
      font-weight: 500;
      box-shadow: none;
      padding: 9px 30px;
      line-height: 1;
      height: 100%;
      transition: 0.15s;
      text-transform: uppercase;
      color: #ffffff;
      opacity: 0.5;
      background: transparent;
      
      &[aria-selected="true"] {
        color: #1b8881;
        opacity: 1;
      }
      
      &:focus {
        outline: none;
      }
    }
    
    .bp3-tab-indicator-wrapper {
      .bp3-tab-indicator {
        background: white;
        border-radius: 20px;
        height: 100%;
      }
    }
  }
    
  .bp3-tab-panel {
    margin-top: 10px;
    
    .row {
      margin-right: -5px;
      margin-left: -5px;
      
      div[class*=col-] {
        padding-left: 5px;
        padding-right: 5px;
      }
    }

    .deposit-tab {
      .row {
        margin-right: -12px;
        margin-left: -12px;
        
        div[class*=col-] {
          padding-left: 12px;
          padding-right: 12px;
        }
      }
    }
  }
`;


class Tabs extends React.Component {
  render() {
    const { tabs } = this.props;

    if (isEmpty(tabs)) {
      return '';
    }

    return (
      <StyledComponent>
        <BP3Tabs
          renderActiveTabPanelOnly
        >
          {tabs.map((item) => (
            <Tab
              className="tab"
              id={item.id}
              title={item.title}
              panel={item.panel}
            />
        ))}
        </BP3Tabs>
      </StyledComponent>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      panel: PropTypes.object,
    })
  ),
};


export default Tabs;
