import posed from 'react-pose';
import styled from 'styled-components';

export const Content = posed.div({
  closed: { height: 0 },
  open: { height: 'auto' },
});

const eclipse = () => `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledContainer = styled.div`
  .body-container {
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

    .width-40 {
      width: 40%;
      ${eclipse};
    }        
  }  
  
  .result-container {
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
    }

    &__list {
      min-height: 120px !important;

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
    }
  }
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
    cursor: ${(props) => props.onDoubleClick ? 'pointer' : 'default'};
    background-color: ${(props) => props.theme.colors.green200} !important;
  }
  
  div {
    padding-right: 2px;
    
    > div {
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
  }
`;
