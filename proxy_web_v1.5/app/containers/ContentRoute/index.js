/**
 *
 * Auth
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import ShareButton from 'components/ShareButton';
import styled from 'styled-components';


const StyledComponent = styled.div`
  margin: 50px 0;
`;


const ContentRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <StyledComponent>
        <Container>
          <Row>
            <Col lg={{ size: 1, offset: 1 }} md={{ size: 1 }}>
              <ShareButton />
            </Col>

            <Col lg={8} md={10}>
              <Component {...props} />
            </Col>
          </Row>
        </Container>
      </StyledComponent>
    )}
  />
);

export default ContentRoute;
