import styled, { css } from 'styled-components';
import breakpoint from '../../styles/breakpoint';

export const HEIGHT_HEADER = 55;

export default styled.header`
  z-index: 19;
  
  .icon-bell{
    color: #4967b6;
  }

  .margin-right{
    margin-right: 12px!important;
  }

  .navbar-minimize {
    padding-left: 10px;
    .sidebar-mini {
      background-color: #4459b6!important;
      border-color: #4a61b6!important;
      border-width: 1px;
      border-radius: 30px!important;
      width: 35px;
      height: 35px;
      color: white;
    }
  }

  .bp3-navbar {
    height: ${HEIGHT_HEADER}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    transition: 0.15s;

    ${(props) => props.fixedToTop ? css`
      background-image: none;
      background-color: white;
    ` : ''}
  }

  .padding-top {
    padding-top: 0.4rem;
    font-size: 1.2rem;
  }


  @media (max-width: ${breakpoint.md}){
    padding:25px!important;
    margin-bottom: 0!important;

    .bp3-navbar{
      .container{
        height:100%;
      }

      & > div {
        &:nth-child(2), &:nth-child(3) {
          flex: 50 0 0;
        }
      }
    }

    & .row{
      height:100%;
    }

    /* xử lý mobile bỏ text và thu nhỏ button khi ở mobile */
    .user-dropdown{
      padding:5px;

      &:hover {
        background-color: transparent !important;
      }

      & > .bp3-icon-user{
        margin-right: 0;
      }
    }

    .login-text{
      display:none;
    }
  }
  @media (min-width: ${breakpoint.lg}){
    .bp3-navbar {
      padding: 0 15px;
    }
  }
  
  .notification {    
    .btn {
      border: 0;
      padding: 0;
    }
    
    .btn-secondary {
      background-color: inherit;
      border-color: inherit;
    }
    
    .counter {
      position: absolute;
      background-color: #FB404B;
      text-align: center;
      border-radius: 10px;
      min-width: 16px;
      padding: 0 5px;
      height: 18px;
      font-size: 12px;
      color: #FFFFFF;
      font-weight: bold;
      line-height: 18px;
      top: 0px;
      left: 16px;
    }
    
    .dropdown-toggle{
      h6 {
        margin-bottom: 12px;
      }
      
      &::after {
        color: #767676;
        display: none;
      }
    }
    
    .dropdown-menu {
      padding: 0;
      transform: translate3d(-257px, 28px, 0px)!important;
      width: 300px;

    }
    
   
    
    .header {
       font-size: 15px;
       font-weight: 700;
       padding: 15px 0px 5px 20px;
    }
    
    .item {
        color: inherit;
        max-width: 300px !important;
            
        .notify-body {
          white-space: normal;
          width: 250px;
        }
    
        .title {
          font-size: 15px;
          font-weight: 700;
          color: #010080;
          padding-bottom: 5px;
        }
        .content {
          font-size: 14px;
          font-weight: 300;
          color: black;
          padding-bottom: 4px;
        }
        .date {
          font-size: 12px;
          font-weight: 300;
          font-style: italic;
          color: gray;
          float: right;
        }
      }

    .notify-footer {
      padding-top: 10px;
      height: 40px;
      text-align: center;
      background-color: #000380;
      li {
        a {
          color: white;
        }
      }
    }
  }
`;
