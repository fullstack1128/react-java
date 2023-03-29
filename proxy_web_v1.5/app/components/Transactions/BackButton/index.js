import React from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { Button, Icon } from '@blueprintjs/core';
import styled from 'styled-components';


const StyledComponent = styled.div`
  height: 100%;

  .bp3-button {
    background: none !important;
    border: none;
    box-shadow: none !important;
    height: 100%;
    padding: 10px 20px;
    .bp3-button-text {
      display: flex;
      align-items: center;
      color: white;
    }
    .bp3-icon {
      color: white;
    }
  }
`;


const scope = 'app.common';


const messages = defineMessages({
  back: {
    id: `${scope}.linkBack`,
    defaultMessage: 'Trở về',
  },
});

class BackButton extends React.Component {
  onHandleBack = () => {
    this.props.handleBack();
  };

  render() {
    return (
      <StyledComponent>
        <Button onClick={this.onHandleBack}>
          <Icon icon="chevron-left" iconSize={24} />
          <FormattedMessage {...messages.back} />
        </Button>
      </StyledComponent>
    );
  }
}

export default injectIntl(BackButton);
