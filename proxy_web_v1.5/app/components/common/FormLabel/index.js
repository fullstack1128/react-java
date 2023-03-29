import styled from 'styled-components';
import React from 'react';
import * as PropTypes from 'prop-types';
import messages from '../messages';
import { injectIntl } from 'react-intl';
import breakpoint from '../../../styles/breakpoint';


const StyledComponent = styled.div`
  display: flex;
  align-items: center;

  .label-text {
    letter-spacing: -0.5px;
    font-size: ${(props) => props.theme.fontSizes.small};
    margin-bottom: 0;
    min-height: 24px;
    position: relative;
    opacity: 0.9;
    font-weight: 500;
    color: #000000;
  
    &:first-letter {
      text-transform: uppercase;
    }
  }
    
  .fa-asterisk {
    color: red;
    font-size: 7px;
    padding-left: 4px;
    padding-bottom: 4px;
  }

  
`;

class FormLabel extends React.Component {
  render() {
    const { children, isRequired, isAsterisk, intl } = this.props;

    return (
      <StyledComponent>
        <div className="label-text">{children} {!isRequired && `(${intl.formatMessage(messages.optional)})`}</div>
        {isAsterisk && <i className="fas fa-asterisk" />}
      </StyledComponent>
    );
  }
}

FormLabel.propTypes = {
  isRequired: PropTypes.bool,
  isAsterisk: PropTypes.bool,
};

FormLabel.defaultProps = {
  isRequired: true,
};

export default injectIntl(FormLabel);
