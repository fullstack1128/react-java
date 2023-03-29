import { injectGlobal } from 'styled-components';
import theme from './themeStyle';

/* eslint no-unused-expressions: 0 */
injectGlobal`
// under-line of tab bar (detail page)
.detail .bp3-tab-list{
  border-bottom: 1px solid #E6ECEF;
}

.body{
  height: 100%;
}

.color-print{
  color: #04B4F2!important;
}

.color-edit{
  color: #F9A825!important;
}

.color-delete{
  color: #dc3545!important;
}

.color-add{
  color: #41B652!important;
}

// set padding of detail page
.details-body{
  padding: 0px 2%!important;
}

// start set width of pop-up
.popup-width-90{
  width: 90%!important;
}

.popup-width-80{
  width: 80%!important;
}

.popup-width-70{
  width: 70%!important;
}

.popup-width-60{
  width: 60%!important;
}
// end set width of pop-up

h6 {
  font-size: 1rem!important;
  font-weight: 600;
}

html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'SF Pro Text', sans-serif;
    // font-family: Roboto;
    font-size: 14px;
    color: black;
  }

  body.fontLoaded {
    font-family: 'SF Pro Text', sans-serif;
  }

  #app {
    background-color: #f4f4f4;
    min-height: 100%;
    min-width: 100%;
  }

  // Global remove outline
  a:active, a:focus, button:active, button:focus {
    outline: none;
    border: none;
  }

  a:hover {
    text-decoration: none
  }
  a{
    transition:0.15s;
  }
  /* Tách Đăng xuất ra làm 1 section */
  .bp3-menu{

  }

  // Remove focus react-virtualized
  .ReactVirtualized__Grid.ReactVirtualized__List {
    &:focus {
      outline: none;
    }
  }

  //
  .bp3-popover .bp3-popover-content {
    border-radius: 4px;
    overflow: hidden;
  }

  .margin-bottom-13 {
    margin-bottom: 9px !important;
  }
  

  .min-width-100{
    min-width: 100%
  }

  div.min-width-100 > div:first-child{
    margin-right: 15px;
  }

  div.min-width-100 > div:not(:first-child){
    margin-right: 15px;
    margin-left: 15px;
  }



  // popup
  .customZIndex {
    .bp3-transition-container {
      z-index: 999999;
    }
  }
  .bp3-overlay {
    // z-index: 9999
  }
  .common-toaster {
    z-index: 99999
  }

  .bp3-datepicker {
    .bp3-datepicker-month-select {
      select {
        width: 110px;
      }
    }
    .bp3-datepicker-year-select {
      select {
        width: 80px;
      }
    }
  }
  .call-module-portal {
    .bp3-popover { border: none; box-shadow: none; }
     .bp3-popover-arrow {
       display: none;
     }
     .bp3-popover-content {
      margin-right: 20px;
      background: transparent;
      .tooltip-box {
        position: relative;
      .tooltip-context {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #fff;
        border: none;
        span {
          white-space: nowrap;
          padding-right: 6px;
        }
      }
  }
     }
  }
`;
