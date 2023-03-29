import styled from 'styled-components';


const StyledComponent = styled.div`
  .bp3-tab-list {
    box-shadow: 0 1px 2px 0 ${(props) => props.theme.colors.black20};
    background-color: ${(props) => props.theme.colors.gray20};
  }

  .bp3-tab-indicator {
    background: transparent;
    height: 0;
  }

  .bp3-tab {
    padding: 3px 25px;
  }

  .bp3-tab-panel {
    margin-top: 0;

    & > div:first-child {
      margin-top: 0;
    }
  }

  .tab {
    color: ${(props) => props.theme.colors.black800} !important;
    font-size: ${(props) => props.theme.fontSizes.small12};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    outline: none;

    &[aria-selected="true"] {
      border: solid 1px ${(props) => props.theme.colors.gray30};
      background-color: ${(props) => props.theme.colors.gray200} !important;
    }
  }
  
  .tab-content {        
    border: 1px solid ${(props) => props.theme.colors.gray300};
    min-height: 300px;
  }
`;

export default StyledComponent;
