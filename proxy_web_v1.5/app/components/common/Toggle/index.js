import React from 'react';
import { Tab, Tabs as BP3Tabs } from '@blueprintjs/core';
import FormLabel from '../FormLabel';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import messages from '../messages';

const StyledComponent = styled.div`
  display: flex;
  .label {    
    width: 22%;
  }

  .bp3-tab-list {
    display: inline-flex;
    border-radius: 20px;
    overflow: hidden;
    background-image: linear-gradient(103deg, #11988d, #173c44);
    height: 30px;
    width: 87px;
    padding: 3px;

    .bp3-tab.tab {
      margin-right: 0;
      font-size: 11px;
      font-weight: 500;
      box-shadow: none;
      padding: 7px 10px;
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


class Toggle extends React.Component {
  handleOnChange = (newTabId) => {
    const { name, setFieldValue } = this.props;
    setFieldValue(name, newTabId);
  };

  render() {
    const { intl, label, value } = this.props;

    const tabs = [
      {
        id: '1',
        title: intl.formatMessage(messages.toggleOn),
        panel: <span />,
      },
      {
        id: '0',
        title: intl.formatMessage(messages.toggleOff),
        panel: <span />,
      },
    ];

    return (
      <StyledComponent>
        <div className="label">
          <FormLabel>{label}</FormLabel>
        </div>
        <div className="input-content-group">
          <BP3Tabs
            onChange={this.handleOnChange}
            selectedTabId={(value || '0').toString()}
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
        </div>
      </StyledComponent>
    );
  }
}

export default injectIntl(Toggle);
