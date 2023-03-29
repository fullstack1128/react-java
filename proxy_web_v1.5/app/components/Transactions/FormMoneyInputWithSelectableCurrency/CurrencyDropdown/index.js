import React from 'react';
import { Button, Icon, Popover, Position } from '@blueprintjs/core';
import styled from 'styled-components';
import get from 'lodash/get';

const StyledPopover = styled(Popover)`
  .currency-btn {
    font-size: ${(props) => props.theme.fontSizes.small};

    .bp3-icon {
      opacity: 0.4;
    }

    &:hover {
      background: transparent;

      .bp3-icon {
        opacity: 0.7;
      }
    }

    &.bp3-active {
      background: transparent;

      .bp3-icon {
        opacity: 1;
      }
    }
  }

  .bp3-fill {
    flex-grow: inherit !important;
  }
`;

const StyledDropdownIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${(props) => props.theme.colors.gray300};
  margin-right: 10px;
  width: 10px;
  height: 5px;
`;

const StyledCurrencyList = styled.div`
  width: 69px;
  ul {
    list-style-type: none;
    margin-bottom: 0;
    padding: 10px 0;
    text-align: left;

    li {
      padding: 0 10px;
      height: 27px;
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.blue200};
      }
    }
  }
`;

const CurrencyList = ({ onClick, currencies }) => (
  <StyledCurrencyList>
    <ul>
      {currencies.map((currency) => (
        <li key={currency.id} onClick={() => onClick(currency.id)}>{currency.value}</li>
      ))}
    </ul>
  </StyledCurrencyList>
);

class CurrencyDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  onClick = (id) => {
    const { name, setFieldValue } = this.props;
    setFieldValue(name, id);
    this.setState({
      isOpen: false,
    });
  };

  handleInteraction = (nextOpenState) => {
    this.setState({ isOpen: nextOpenState });
  };

  render() {
    const { value, currencies } = this.props;
    const selectedCurrency = currencies.find((currency) => currency.id === value);

    return (
      <StyledPopover
        minimal
        isOpen={this.state.isOpen}
        // popoverClassName={'customZIndex'}
        portalClassName={'customZIndex'}
        usePortal
        content={
          <CurrencyList onClick={this.onClick} currencies={currencies} />
        }
        onInteraction={(state) => this.handleInteraction(state)}
        position={Position.BOTTOM}
      >
        <Button
          text={get(selectedCurrency, 'value', '')}
          className="currency-btn"
          minimal
          rightIcon={
            <Icon icon="chevron-down" />
          }
        />
      </StyledPopover>
    );
  }
}

export default CurrencyDropdown;
