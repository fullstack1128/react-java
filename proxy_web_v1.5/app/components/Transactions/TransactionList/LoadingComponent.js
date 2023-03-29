import React from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';

const StyledComponent = styled.div`
`;


const LoadingComponent = (props) => (
  <StyledComponent>
    <LoadingSpinner height={props.height} />
  </StyledComponent>
);

LoadingComponent.propTypes = {
  height: PropTypes.string,
};

LoadingComponent.defaultProps = {
  height: '100%',
};

export default injectIntl(LoadingComponent);
