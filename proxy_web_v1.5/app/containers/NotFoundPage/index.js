/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { injectIntl } from 'react-intl';

import messages from './messages';
import Container from 'reactstrap/es/Container';
import styled from 'styled-components';
import img404 from '../../images/icons/404.svg';
import Button from '../../components/common/Button';
import { forwardTo } from '../../utils/history';
import { backgroundColorButton } from '../../styles/commonCss';
import { routes } from '../Routes/routeHelper';

const Wrapper = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;

  .img404{
    max-width: 30%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .message {
    font-size: ${(props) => props.theme.fontSizes.big20};
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    opacity: 0.6;
    margin: 60px 0 40px;
    white-space: pre-wrap;
    text-align: center;
  }
  
  .btn-group {
    display: flex;
    justify-content: center;
  }
    
  .bp3-button{
    width: 170px;
    background-color: #41b652;
    color: #fff;
  
    &:first-child {
      margin-right: 7px;
    }

    &:hover{
      color: #41B652;
      border-color: #41B652;
    }
  }
`;

class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { intl } = this.props;

    return (
      <Container>
        <Wrapper>
          <img className = "img404" src={img404} alt={''} />

          <div className="message">{intl.formatMessage(messages.message)}</div>

          <div className="btn-group">
            <Button
              text={intl.formatMessage(messages.btnBackToHome)}
              onClick={() => forwardTo('/')}
            />
            <Button
              text={intl.formatMessage(messages.btnContact)}
              onClick={() => forwardTo(routes.CONTACT)}
            />
          </div>
        </Wrapper>
      </Container>
    );
  }
}


export default injectIntl(NotFound);
