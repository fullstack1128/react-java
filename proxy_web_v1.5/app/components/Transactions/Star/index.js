import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';

import fullStarImg from 'images/icons/star-full.svg';
import halfStarImg from 'images/icons/star-half.svg';
import emptyStarImg from 'images/icons/star-empty.svg';

const maxStarAmount = 5;

const StyledWrapper = styled.div`
  & > img {
    width: 20px;
    height: 20px;
  }
`;

const Star = ({ star }) => (
  <StyledWrapper>
    {
      range(maxStarAmount).map((number) => {
        const value = star - number;
        if (value > 1) return <img key={`full-star-${number}`} src={fullStarImg} alt="full-star" />;
        if (value > 0) return <img key={`half-star-${number}`} src={halfStarImg} alt="half-star" />;
        return <img key={`empty-star-${number}`} src={emptyStarImg} alt="empty-star" />;
      })
    }
  </StyledWrapper>
);

export default Star;
