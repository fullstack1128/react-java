
import posed from 'react-pose';
import { Radio } from '@blueprintjs/core';
import styled from 'styled-components';
import { focusControl } from 'styles/commonCss';
import ActionDialog from 'components/common/ActionDialog';

export const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' },
});

export const StyledContainer = styled.div`
`;

const eclipse = () => `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray70};
  font-size: ${(props) => props.theme.fontSizes.small12};
  padding: 5px 5px 5px 20px;

  p {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.green200} !important;
  }
  
  .text {
    padding-right: 10px;
    
    > div {
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
  }
`;

export const StyledDialog = styled(ActionDialog)`
  background-color: white;
  width: 640px;
  .action-popup-footer{
    margin: 50px auto 0;
      display: flex;
      flex-direction: column;
      width: 300px;
      position: relative;
  }
  &.width-750{
    width: 750px;
  }

  .bp3-dialog-header {
    box-shadow: none;
    height: 70px;
    background-color: ${(props) => props.theme.colors.backgroundGray};
    padding-bottom: 0;

    .bp3-dialog-close-button {
      margin-right: 16px;
    }
  }

  .bp3-heading {
    font-size: ${(props) => props.theme.fontSizes.big};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    text-align: center;
    padding: 20px 0;
  }

  .body-container {
    padding: 0 30px;
    margin-top: 30px;
    margin-bottom: 30px;

    .label-container{
      font-size: ${(props) => props.theme.fontSizes.small};
      margin-bottom: 8px;
    }

    .width-70 {
      width: 70px;
      ${eclipse};
    }

    .width-80 {
      width: 80px;
      ${eclipse};
    }

    .width-100 {
      width: 100px;
      ${eclipse};
    }

    .width-120 {
      width: 120px;
      ${eclipse};
    }

    .width-150 {
      width: 150px;
      ${eclipse};
    }
    
    .width-10 {
      width: 10%;
      ${eclipse};
    }

    .width-20 {
      width: 20%;
      ${eclipse};
    }

    .width-30 {
      width: 30%;
      ${eclipse};
    }

    .width-25 {
      width: 25%;
      ${eclipse};
    }

    .width-35 {
      width: 35%;
      ${eclipse};
    }

    .width-40 {
      width: 40%;
      ${eclipse};
    }
    
    .cancel-button {
      width: 100%;
    }
  }

  .find-container {
    display: flex;
    justify-content: space-between;

    .find-input {
      height: 40px;
      font-size: ${(props) => props.theme.fontSizes.small};
      border: none;
      box-shadow: 0 0 0 0 rgba(19, 124, 189, 0), 0 0 0 0 rgba(19, 124, 189, 0), inset 0 0 0 1px rgba(16, 22, 26, 0.15), inset 0 1px 1px rgba(16, 22, 26, 0.2);

      &:focus {
        ${focusControl}
      }
    }

    button {
      padding: 5px 15px;
      min-width: 130px;
    }
  }

  .result-container {
    margin-top: 20px;

    &__header {
      display: flex;
      height: 40px;
      background-color: #e1f1c0;
      font-size: ${(props) => props.theme.fontSizes.small12};
      font-weight:  ${(props) => props.theme.fontWeights.strong300};
      padding: 5px 5px 5px 20px;
      line-height: 1.2;

      > div {
        display: flex;
        align-self: center;
      }
      
      .unit {
        opacity: 0.8;
        font-size: 10px;
        font-weight: 300;
      }
      
      .radio-header {
        width: 40px;
      }
    }

    &__list {
      max-height: 200px;
      min-height: 200px;

      &.no-result {
        max-height: 10px;
        min-height: 10px;

        .notify{
          font-size: ${(props) => props.theme.fontSizes.small12};
          font-style: italic;
        }
      }

      .ReactVirtualized__Grid {
        &:focus {
          outline-width: 0;
        }

        .ReactVirtualized__Grid__innerScrollContainer {
          > div {
            background-color: #fcfff4;
            font-size: ${(props) => props.theme.fontSizes.small12};
            font-weight:  ${(props) => props.theme.fontWeights.strong300};
            opacity: 0.9;

            &:nth-child(even) {
              background-color: #f4f7ec;
            }
          }
        }
      }
      
      .radio-column {
        width: 40px;
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const StyledRadio = styled(Radio)`
  margin-bottom: 0;
  padding-left: 0 !important;
  line-height: 16px;
  
  span.bp3-control-indicator {
    margin: 0 !important;
  }

  input:focus ~ span.bp3-control-indicator {
    outline: none;
  }

  input:checked {
    & ~ .bp3-control-indicator {
      background-color: ${(props) => props.theme.colors.green1000} !important;
    }
  }
`;
