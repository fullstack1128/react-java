import React from 'react';
import styled from 'styled-components';
import Row from 'reactstrap/es/Row';
import breakpoint from 'styles/breakpoint';
import * as PropTypes from 'prop-types';

const StyledComponent = styled.div`
  border-top: 1px solid #d8d8d8;
  border-bottom: ${(props) => props.endline ? '1px solid #d8d8d8' : ''};
  padding-bottom: 25px;
  margin-bottom: 25px;

  div[class*=col-] {
    &:not(:last-child) {
      border-bottom: 1px solid #d8d8d8;
    }
  }  
  
  @media (min-width: ${breakpoint.md}) {
    div[class*=col-] {
      &:not(:last-child) {
        border-bottom: none;
        border-right: 1px solid #d8d8d8;
      }
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class Summary extends React.Component {
  render() {
    const { children, isShowEndLine = true } = this.props;

    return (
      <StyledComponent className="summary" endline={isShowEndLine}>
        <Row>
          {children}
        </Row>
      </StyledComponent>
    );
  }
}

Summary.propTypes = {
  isShowEndLine: PropTypes.bool,
};

export default Summary;
