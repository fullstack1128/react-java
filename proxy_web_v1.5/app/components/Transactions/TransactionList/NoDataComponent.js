import React from 'react';
import styled from 'styled-components';
import nodataImage from '../../../images/icons/nodataImage.svg';
import { injectIntl } from 'react-intl';
import * as PropTypes from 'prop-types';
import messages from './messages';

const StyledComponent = styled.div`
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .nodata-image {
    img {
      height: 100px;
    }
  }

  .nodata-message {
    opacity: 0.5;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    margin-top: 30px;
  }
`;


const NoDataComponent = (props) => (
  <StyledComponent height={props.height}>
    <div className="nodata-image">
      <img src={props.image} alt={props.message} />
    </div>

    <div className="nodata-message">
      <span>{props.message || props.intl.formatMessage(messages.noDataFound)}</span>
    </div>
  </StyledComponent>
);

NoDataComponent.propTypes = {
  message: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.string,
};

NoDataComponent.defaultProps = {
  image: nodataImage,
  height: '100%',
};

export default injectIntl(NoDataComponent);
