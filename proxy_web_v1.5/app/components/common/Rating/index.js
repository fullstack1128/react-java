/**
 *
 * Rating
 *
 */

import React from 'react';
import fullRating from '../../../images/star.svg';
import emptyRating from '../../../images/star-copy-3.svg';
import ReactRating from 'react-rating';
import PropTypes from 'prop-types';
import Wrapper from './styled/Wrapper';

class Rating extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { heightSymbol, widthSymbol, space } = this.props;

    return (
      <Wrapper space={space}>
        <ReactRating
          fullSymbol={<img
            src={fullRating}
            alt={''}
            height={heightSymbol}
            width={widthSymbol}
          />}
          emptySymbol={<img
            src={emptyRating}
            alt={''}
            height={heightSymbol}
            width={widthSymbol}
          />}
          quiet
          {...this.props}
        />
      </Wrapper>
    );
  }
}

Rating.propTypes = {
  heightSymbol: PropTypes.number,
  widthSymbol: PropTypes.number,
  space: PropTypes.number,
};

Rating.defaultProps = {
  heightSymbol: 16.9,
  widthSymbol: 18,
  space: 12,
};

export default Rating;
