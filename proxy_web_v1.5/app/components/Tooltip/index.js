/**
 *
 * Tooltip
 *
 */

import React from 'react';
import ReactTooltip from 'react-tooltip';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledTooltip = styled(ReactTooltip)`
  &.custom-tooltip {
    font-size: ${(props) => props.theme.fontSizes.small10};
    width: ${(props) => props.width}px;
    padding: 10px 10px 10px 15px;
    box-shadow: 3px 3px 5px 1px ${(props) => props.theme.colors.gray500};
    text-transform: none;
  }  
`;


class Tooltip extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { place, id, width } = this.props;

    return (
      <StyledTooltip
        place={place}
        id={id}
        width={width}
        type="light"
        effect="solid"
        className="custom-tooltip"
      />
    );
  }
}

Tooltip.propTypes = {
  place: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.number,
};

export default Tooltip;
