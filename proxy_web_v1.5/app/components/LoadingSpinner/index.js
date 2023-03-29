import React, { Component } from 'react';
import styled from 'styled-components';
import { Spinner } from '@blueprintjs/core';
import * as PropTypes from 'prop-types';

const StyledContainer = styled(Spinner)`
  height: ${(props) => props.height ? props.height : 'calc(100vh - 50px - 242px)'};
`;

// eslint-disable-next-line react/prefer-stateless-function
class LoadingSpinner extends Component {
  render() {
    return <StyledContainer height={this.props.height} size={Spinner.SIZE_STANDARD} />;
  }
}

LoadingSpinner.propTypes = {
  height: PropTypes.string,
};

export default LoadingSpinner;
