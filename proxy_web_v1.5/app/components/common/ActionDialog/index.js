import React from 'react';
import styled from 'styled-components';
import { Dialog } from '@blueprintjs/core';

const StyledContainer = styled(Dialog)`
  background-color: white;
  width: ${(props) => props.width ? props.width : 900}px;
  border-radius: 20px;

  .bp3-dialog-header {
    box-shadow: none;
    height: 70px;
    background-color: ${(props) => props.theme.colors.backgroundGray};
    padding-bottom: 0;
    position: relative;
    border-radius: 20px 20px 0 0;
    
    .bp3-dialog-close-button {
      margin-right: 16px;
      position: absolute;
      top: 0;
      right: -60px;
      padding: 0;

      svg {
        transform: scale(1.4);

        path {
          color: #ffffff;
        }
      }

      &:hover {
        background: none;
      }
    }
  }

  .bp3-heading {
    font-size: ${(props) => props.theme.fontSizes.big};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    text-align: center;
    padding: 20px 0;
  }

  .action-popup-content {
    padding: 0px 30px;
    margin-top: 15px;
    margin-bottom: 15px;

    &__note {
      padding: 10px 0 0 0;
      font-style: italic;
    }
    &__assign {
      padding: 15px 0 5px 0;
    }
    &__staff-selected {
      padding: 20px 0 0 0;
      height: 55px;
      
      .dropdown-list {
        position: relative;
        
        & > div {
          //margin-left: 100px;
          margin-bottom: 0;
          .select-dropdown {
             width: 200px;
          }
        }
        .label {
          position: absolute;
          top: 8px;
          left: 0;
        }
        
        .select-dropdown {
          width: 70% !important;
          position: absolute;
          left: 17%;          
          top: -10px;
          height: 45px;
        }
        
      } 
    }
  }

  .action-popup-footer {
     margin: 0 auto 0;
      display: flex;
      flex-direction: column;
      width: 300px;
      position: relative;
  }
  
  .result-container {
    &__header {
      display: flex;
      background-color: ${(props) => props.theme.colors.green200};
      font-size: ${(props) => props.theme.fontSizes.small12};
      padding: 10px 5px 10px 5px;
      
      div {
        width: 20%;        
      }  
      .unit {
        font-size: ${(props) => props.theme.fontSizes.small10};
        font-weight: ${(props) => props.theme.fontWeights.strong300};
      }
    }

    &__list {
      min-height: 300px;

      .ReactVirtualized__Grid {
        &:focus {
          outline-width: 0;
        }
      }
    }
  }
  
  .confirm {
    font-size: ${(props) => props.theme.fontSizes.normal};
    font-weight: ${(props) => props.theme.fontWeights.strong700};
  }
  
  .error-msg {
    color: ${(props) => props.theme.colors.redError};
    padding: 0;
    font-size: ${(props) => props.theme.fontSizes.small12};
    margin-top: 5px
  }
  
  .tabs {
    padding-top: 5px;
  }
`;

export default StyledContainer;
