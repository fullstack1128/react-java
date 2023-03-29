import React from 'react';
import Wrapper from './StyledReviewButton';
import Rating from 'components/common/Rating';
import { injectIntl } from 'react-intl';
import messages from './messages';


const ReviewButton = (props) => {
  const { showPopup, review, intl } = props;

  if (review) {
    return (
      <Wrapper>
        <Rating
          readonly
          initialRating={review.rating}
          heightSymbol={12}
          widthSymbol={12.7}
          space={8.5}
        />

        <div className="review__reviewed">
          <span>{intl.formatMessage(messages.reviewed)}</span>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <a
        className="review__button"
        onClick={showPopup}
        role="button"
        tabIndex={0}
      >
        <span>{intl.formatMessage(messages.btnReview)}</span>
      </a>
    </Wrapper>
  );
};


export default injectIntl(ReviewButton);
