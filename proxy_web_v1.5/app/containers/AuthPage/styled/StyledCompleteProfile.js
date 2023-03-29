import styled from 'styled-components';

export default styled.div`
  .upload-image {
    display: flex;
    
    & > div:first-child {
      margin-right: 2em;
    }
  }
  
  .note {
    font-weight: ${(props) => props.theme.fontWeights.strong};
    font-size: ${(props) => props.theme.fontSizes.normal};
    margin-bottom: 2em;
    margin-top: 1em;
  }
  
  .skip-btn {
    font-weight: ${(props) => props.theme.fontWeights.strong};
    font-size: ${(props) => props.theme.fontSizes.normal};
    text-align: center;
    
    a {
      color: ${(props) => props.theme.colors.activeBorder};
    }
  }
`;
