import styled from 'styled-components';

export default styled.div`
  .bp3-card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 25px 10px 15px 10px;
    
    h7 {
      padding: 7px 1px 7px 1px;
      font-size: 14px;
    }
    .title {
        padding-bottom: 5px;
        font-size: 22px;
        font-weight: 600;
    }
    .amount {
        padding-top: 5px;
        font-size: 20px;
        font-weight: 600;
     }
  }
  
  .card-info {
    padding: 20px 0 10px 0;
  }
  
  .bp3-tab-indicator {
    height: 4px;
    background-image: linear-gradient(92deg, #11988d, #173c44);
  }
  
  .bp3-tab-list {
    .bp3-tab.tab {
      box-shadow: none !important;
      outline: none !important;
      text-transform: uppercase;      
      font-size: 14px;
      font-weight: 300;
      color: #000000;
      opacity: 0.5;
    
      &[aria-selected="true"] {
        opacity: 1;
      }
    }
  }
`;
