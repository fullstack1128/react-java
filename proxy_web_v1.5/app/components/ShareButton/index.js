/**
 *
 * ShareButton
 *
 */

import React from 'react';
import FacebookIco from '../../images/icons/facebook.svg';
import TwitterIco from '../../images/icons/twitter.svg';
import LinkedIco from '../../images/icons/linked-in.svg';
import InvisionIco from '../../images/icons/invision.svg';
import MessengerIco from '../../images/icons/messenger.svg';
import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';
// import styled from 'styled-components';
import { FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share';


const Wrapper = styled.div`
  position: sticky;
  padding-top: 5px;
  top: 80px;

  ul {
    list-style: none;
    padding: 0;
    text-align: right;

    li {
      &:not(:last-child) {
        margin-bottom: 40px;
      }
    }
  }

  @media (max-width:${breakpoint.md}){
    ul {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (min-width: ${breakpoint.md}){
    padding-right: 50px;

    ul {
      flex-direction: column;
    }
  }
`;


class ShareButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const shareLink = location.href;

    return (
      <Wrapper {...this.props}>
        <ul>
          <li>
            <a target="blank">
              <FacebookShareButton url={shareLink}>
                <img src={FacebookIco} alt={'facebook'} />
              </FacebookShareButton>
            </a>
          </li>
          <li>
            <a target="blank">
              <TwitterShareButton url={shareLink}>
                <img src={TwitterIco} alt={'twitter'} />
              </TwitterShareButton>
            </a>
          </li>
          <li>
            <a target="blank">
              <LinkedinShareButton url={shareLink}>
                <img src={LinkedIco} alt={'linked'} />
              </LinkedinShareButton>
            </a>
          </li>
          {/*<li>*/}
          {/*  <a target="blank">*/}
          {/*    <img src={InvisionIco} alt={'invision'} />*/}
          {/*  </a>*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  <a target="blank">*/}
          {/*    <img src={MessengerIco} alt={'messenger'} />*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
      </Wrapper>
    );
  }
}

ShareButton.propTypes = {};

export default ShareButton;
