import styled from 'styled-components';


export default styled.div`
  background: ${(props) => props.theme.colors.gray60};
  font-size: ${(props) => props.theme.fontSizes.small};
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;

  .container {
    height: 100%;
  }

  .chat-container {
    display: flex;
    height: 100%;
    box-shadow: 2px 2px 5px 0 ${(props) => props.theme.colors.black10};

    .search > div {
      margin-bottom: 0!important;
    }
    
    .type {
      padding-top: 0!important;
      & > div {
        margin-bottom: 0!important;
      }
    }

    .list {
      display: flex;
      flex-direction: column;

      >div {
        flex-grow: 1;
      }
    }
  }
  
  .page-chat {
    position: relative;
    background: ${(props) => props.theme.colors.gray10} !important;
    
    .page-typing {
      margin-left: 10px;
      position: absolute;
      bottom: 45px;
      font-style: italic;
      font-size: ${(props) => props.theme.fontSizes.small12};
    }
    
    .list-chat {            
      .page-messages {
        padding: 10px;
        list-style: none;
        overflow-x: hidden;
        flex-grow: 1;
        border-radius: 4px;
        background: ${(props) => props.theme.colors.gray10};
        margin-bottom: 0;
        
        
        li {
          position: relative;
          clear: both;
          display: inherit;
          padding: 7px 0 7px 0;
          line-height: 10px;
          margin: 0 0 20px 0;
          border-radius: 0 10px 10px 10px;
          background-color: white;
          word-wrap: break-word;
          max-width: 81%;    
          border: solid 0.5px rgba(216, 216, 216, 0.5);
          
          .time {
            font-size: ${(props) => props.theme.fontSizes.small12};
          }      
          
          .container {
            display: flex;
            flex-direction: column;
            line-height: 15px;
            font-weight: 500;
            opacity: 0.5;
          }
          
          .container .time {
            font-weight: 300;
            padding-top: 15px;
          }
          
          &:before {
            position: absolute;
            top: 0;
            width: 30px;
            height: 30px;
            border-radius: 25px;
            content: '';
            background-size: cover;
          }         
        }
        
        li.self {
          animation: show-chat-odd 0.15s 1 ease-in;
          -moz-animation: show-chat-odd 0.15s 1 ease-in;
          -webkit-animation: show-chat-odd 0.15s 1 ease-in;
          float: right;
          margin-right: 50px;
          background-color: #eefade;
          border-radius: 10px 0 10px 10px;
          &:before {
            right: -45px;
            background-image: url(images/default-avatar.png);
          }
          &:after {
            border-right: 10px solid transparent;
            right: -10px;
          }
        }              
       
        li.other {
          animation: show-chat-even 0.15s 1 ease-in;
          -moz-animation: show-chat-even 0.15s 1 ease-in;
          -webkit-animation: show-chat-even 0.15s 1 ease-in;
          float: left;
          margin-left: 50px;
        }
        
        li.other:before {
          left: -45px;
          background-image: url(images/default-avatar.png);
        }
        
        li.other:after {
          border-left: 10px solid transparent;
          left: -10px;
        }

        li.date-separator {
          background-color: transparent;
          max-width: 100%;
          text-align: center;
          border: none;
          display: flex;
        }

        li.date-separator:before,
        li.date-separator:after {
          content: '';
          flex-grow: 1;
          position: unset;
          height: unset;
          display: block;
          border-top: solid 1px rgba(216, 216, 216, 0.5);
          transform: translateY(50%);
        }
      }
    }
    
    .footer-chat {
      width: 100%;
      position: absolute;
      display: inline-flex;
      bottom: 0;
      align-items: center;
      min-height: 60px;
      background-color: #f2f2f2;
      
      .page-text-box {     
        width: 100%;  
        border-radius: 3px;
        background: #f2f2f2;
        min-height: 60px;
        margin-right: 5px;
        color: black;
        overflow-y: auto;
        padding: 20px 20px;
        &:focus {
          outline: 0;
          box-shadow: 0 0 2pt 2pt transparent;
        }
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track{
          border-radius: 5px;
          background-color: rgba(25, 147, 147, 0.1);
        }
        &::-webkit-scrollbar-thumb{
          border-radius: 5px;
          background-color: rgba(25, 147, 147, 0.2);
        }
      }
      
      .page-text-box[placeholder]:empty:before {
        content: attr(placeholder);
        color: #555; 
      }
      
      .page-text-box[placeholder]:empty:focus:before {
        content: "";
      }
      
      .button {
        //width: 10%;
        display: flex;
        padding-right: 5px;
        align-items: center;
        button {
          background: transparent;
          border: none;
        }
        
        .write-link:before {
          -webkit-transform: rotate(90deg);
          -moz-transform: rotate(90deg);
          -o-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
        }
  
        .write-link.attach:before {
          display: inline-block;
          float: left;
          width: 20px;
          height: 20px;
          content: "";
          background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/382994/attachment.png);
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .write-link.file {
          opacity: 0;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 20px;
          height: 20px;
        }
      }    
    }
  }
  
`;
