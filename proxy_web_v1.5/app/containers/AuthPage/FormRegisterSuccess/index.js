/**
 *
 * FormRegisterSuccess
 *
 */

import React from 'react';
import * as PropTypes from 'prop-types';

import messages from './messages';
import { eUserType } from '../../../enums/EUserType';
import imgRegisterSuccessClient from '../../../images/formIcon/registerSuccess.svg';
import Button from '../../../components/common/Button';
import { forwardTo } from '../../../utils/history';
import imgCompleted from '../../../images/group.svg';
import styled from 'styled-components';
import Container from 'reactstrap/es/Container';
import Row from 'reactstrap/es/Row';
import Col from 'reactstrap/es/Col';
import { injectIntl } from 'react-intl';
import { routes } from '../../Routes/routeHelper';

const Wrapper = styled.div`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  
  .message {
    font-size: ${(props) => props.theme.fontSizes.big20};
    color: ${(props) => props.theme.colors.black};
    font-weight: ${(props) => props.theme.fontWeights.strong500};
    opacity: 0.6;
    margin: 60px 0 40px;
  }
  
  img {
    height: 250px;
  }
`;


class FormRegisterSuccess extends React.Component { // eslint-disable-line
  // react/prefer-stateless-function
  componentWillMount() {
    const { userType, userStatus } = this.props;

    if (!userType || !userStatus) {
      forwardTo('/login');
      // forwardTo('/dang-nhap');
    }
  }

  render() {
    const { intl, userType } = this.props;

    if (userType === eUserType.INDIVIDUAL) {
      return (
        <Container>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Wrapper>
                <img src={imgRegisterSuccessClient} alt={''} />

                <div className="message text-center">{intl.formatMessage(messages.clientMessage)}</div>

                <div className="text-center">
                  {/* <Button*/}
                  {/*  text={intl.formatMessage(messages.clientBtn)}*/}
                  {/*  onClick={() => forwardTo('/auth/login')}*/}
                  {/*  primary*/}
                  {/* />*/}
                  {/*<Button onClick={() => forwardTo('/dang-nhap')}>*/}
                  <Button onClick={() => forwardTo('/login')}>
                    {intl.formatMessage(messages.clientBtn)}
                  </Button>
                </div>
              </Wrapper>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Wrapper>
              <img src={imgCompleted} alt={''} />

              <div className="message text-center">{intl.formatMessage(messages.completedMessage)}</div>

              <div className="text-center">
                {/* <Button*/}
                {/*  text={intl.formatMessage(messages.completedBtn)}*/}
                {/*  onClick={() => forwardTo('/')}*/}
                {/*  primary*/}
                {/* />*/}
                <Button onClick={() => forwardTo(routes.HOME)}>
                  {intl.formatMessage(messages.completedBtn)}
                </Button>
              </div>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    );
  }
}

FormRegisterSuccess.propTypes = {
  userType: PropTypes.string,
  userStatus: PropTypes.string,
};

export default injectIntl(FormRegisterSuccess);
