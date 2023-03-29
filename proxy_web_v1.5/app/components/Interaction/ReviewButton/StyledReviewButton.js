import styled from 'styled-components';


export default styled.div`
  //min-width: 150px;
  //text-align: center;

  .review__button {
    border-radius: 2px;
    background-color: #d7d4ae;
    padding: 8px 16px;
    
    span {
      font-size: ${(props) => props.theme.fontSizes.small12};
      font-weight: ${(props) => props.theme.fontWeights.strong500};
      opacity: 0.5;
      color: black;
    }
  }
  
  .review__reviewed {
    font-size: ${(props) => props.theme.fontSizes.small12};
    font-weight: ${(props) => props.theme.fontWeights.strong300};
    opacity: 0.5;
  }
`;
