import styled from 'styled-components';

export default styled.div`
  .bp3-card {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 25px 40px 0 40px;
    cursor: auto;
    
    &.balance {
      padding: 15px 15px 0 15px;
    }
    
     table {
        .title {
            width: 35%;
            font-size: 12px;
            font-weight: bold;
            text-align: right;
        }
        .content {
            font-weight: 400;
            padding-top: 5px;
            font-size: 14px;
            text-align: left;
            padding-left: 30px;
         }
     }
   
     .title2 {
        color: #1f419b;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
     }
   
     .title1 {
        color:red; 
        border-style: none; 
        font-weight: bold; 
        font-size: 16px;
        text-align: center;
     }
   
     p {
        margin-bottom: 0.4rem;
     }
     
     .ReactTable {
      width: 100%;
     } 
  }
`;
