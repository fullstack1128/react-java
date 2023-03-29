/**
 *
 * TransactionTabs
 *
 */

import React from 'react';
import { Tab, Tabs } from '@blueprintjs/core';
import * as PropTypes from 'prop-types';
import StyledComponent from './styled';

class TransactionTabs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { tabs } = this.props;

    if (!tabs) {
      return null;
    }

    return (
      <StyledComponent>
        <Tabs>
          {tabs.map((item) => (
            <Tab
              className="tab"
              id={item.tabId}
              title={item.title}
              panel={
                <div className={'tab-content'}>
                  {item.content}
                </div>
              }
            />
          ))}
        </Tabs>
      </StyledComponent>
    );
  }
}

TransactionTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabId: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.object,
    })
  ),
};

export default TransactionTabs;
