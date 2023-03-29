import React from 'react';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Classes, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import addIcon from '../../../images/packages/clear@3x.png';
import * as PropTypes from 'prop-types';
import { forwardTo } from '../../../utils/history';


const StyledComponent = styled.div`
  .btn-export {
    background-color: #41B652;
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.15s;
    position: relative;
    padding: 9px 14px;
    color: #ffffff;
    margin-right: 5px;
    font-size: 16px;
  }
`;

const DropdownButtons = styled.ul`
  list-style-type: none;
  margin-bottom: 0;
  padding: 0;
  text-align: left;

  li {
    padding: 0 10px;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      background-color: ${(props) => props.theme.colors.gray60} !important;
    }

    a {
      text-decoration: none;
      color: ${(props) => props.theme.colors.black};
      font-weight: ${(props) => props.theme.fontWeights.strong300};
      font-size: ${(props) => props.theme.fontSizes.small};
      line-height: 50px;
      width: 100%;
    }

    .image {
      margin-right: 10px;
    }
    
    &:nth-child(odd) {
      background-color: ${(props) => props.theme.colors.gray10};
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class ButtonExport extends React.Component {
  render() {
    const { onClick, options } = this.props;

    const buttonCreate = (
      <a
        tabIndex={0}
        role={'button'}
        className="btn-export"
        onClick={onClick || ((e) => e.preventDefault())}
      ><i className="fas fa-file"></i></a>
    );

    if (isEmpty(options)) {
      return (
        <StyledComponent>
          {buttonCreate}
        </StyledComponent>
      );
    }

    const content = (
      <DropdownButtons>
        {options.map((option, idx) => (
          <li
            key={`btnCreate-${idx}`}
          >
            <a
              className="link"
              onClick={option.onClick || (() => forwardTo(option.to))}
              role={'button'}
              tabIndex={-1}
            >
              <img
                className="image"
                src={addIcon}
                width="14"
                height="14"
                alt="add"
              />
              {option.text}
            </a>
          </li>
        ))}
      </DropdownButtons>
    );

    return (
      <StyledComponent>
        <Popover
          minimal
          content={content}
          interactionKind={PopoverInteractionKind.HOVER}
          position={Position.BOTTOM_RIGHT}
          popoverClassName={Classes.POPOVER_DISMISS}
        >
          {buttonCreate}
        </Popover>
      </StyledComponent>
    );
  }
}


ButtonExport.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      text: PropTypes.string,
      to: PropTypes.string,
    })
  ),
};

export default ButtonExport;

