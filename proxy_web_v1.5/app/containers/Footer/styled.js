import styled from 'styled-components';
import breakpoint from '../../styles/breakpoint';


export const HEIGHT_MINI_FOOTER = 50;
export const HEIGHT_FOOTER = 210;

export default styled.footer`
   //height: ${HEIGHT_FOOTER}px;
   overflow: hidden;

  .footer-divider {
    height: 10px;
    background-image: linear-gradient(to left, #11998e, #c4682e 49%, #df5151);
  }

  .footer-content {
    background-image: linear-gradient(99deg, #11988d, #173c44);
    padding-top: 20px;
    padding-bottom: 15px;
    height: 100%;

    ul {
      list-style: none;
      line-height: 30px;
      padding: 10px 0;
      margin-bottom: 0;

      a {
        font-weight: 300;
      }

      @media (max-width:${breakpoint.md}){
        padding:0;

        li{
          margin-bottom:20px;

          &:last-child{
            margin-bottom:0;
          }
        }
      }
    }


    .share {
      display: flex;
      margin-top: 20px;

      .SocialMediaShareButton {
        border-radius: 50%;

        &:not(:last-child) {
          margin-right: 25px;
        }

        &:focus {
          outline: none;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

    .app {
      padding: 10px 0 0 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      &>div{
        height:50px!important;
        width:160px!important;
      }
    }

    .bp3-heading {
      text-transform: uppercase;
    }

    .line {
      margin: 12px 0 12px 0;
      background-color: white;
    }

    .support-group {
      padding: 0;

      .divider {
        background-color: ${(props) => props.theme.colors.white};
        margin: 2px 10px;
      }
    }
  }

  @media (max-width:${breakpoint.md}){
    padding-bottom: 0 !important;
    height: unset;

    .footer-content {
      height: auto;

      ul {
        padding:0;

        li{
          margin-bottom:10px;

          &:last-child{
            margin-bottom:0;
          }
        }

      }
    }

    .app{
      padding:0;
      margin-bottom:50px;

      &>div{
        width:175px!important;
        height:50px!important;

        &:first-child{
          margin-bottom:20px;
        }
      }
    }

    .share{
      max-width: unset;
    }
  }

  @media (max-width:${breakpoint.xxs}){
    .app{
      &>div{
        width:50%!important;
        height:initial!important;
      }
    }
  }

  @media (max-width: ${breakpoint.lg}){
    height: unset;

    .footer-content{
      .laDjQS{
        text-align:center !important;
      }
      .bp3-button-group{
        padding-top: 20px;
        display: grid;
        .bp3-divider{
          display: none;
        }
        .FooterLink__FooterLink-kecDsT:not(:first-child){
          margin-top:15px;
        }
      }
      .share {
        margin-top: 20px;
        .SocialMediaShareButton {
          border-radius: 50%;
        }
      }
    }
  }
 }
`;

export const MiniFooter = styled.div`
  height: ${HEIGHT_MINI_FOOTER}px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  .copyright {
    font-size: 12px;
    font-weight: 300;
    color: #313131;
    padding: 10px 30px;
  }

  .version {
    font-size: 12px;
    font-weight: 300;
    color: #313131;
    padding: 10px 20px;
  }

  .bp3-divider {
    opacity: 0.3;
    background-color: #000000;
    height: 30px;
  }

  .footer-links {
    padding: 10px 20px;
  }


  &.responsive {
    @media (max-width:${breakpoint.md}) {
      height: auto;
      display: block;

      .copyright {
        padding: 10px 20px;

      }

      .footer-links {
        display: flex;

        >a {
          &:not(:last-child) {
            display: block;
            flex: 1;
          }
        }
      }
    }
  }
`;
