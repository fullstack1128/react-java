import React from 'react';
import { Classes, Icon } from '@blueprintjs/core';
import StyledPopup from './StyledPopup';
import * as PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

// eslint-disable-next-line react/prefer-stateless-function
class Popup extends React.Component {
  render() {
    const { title, body, children, small, large, isOpen, onClose, noPadding } = this.props;

    return (
      <StyledPopup
        title={title}
        small={small}
        large={large}
        isOpen={isOpen}
        onClose={onClose}
        noPadding={noPadding}
        isCloseButtonShown={false}
      >
        <div className={Classes.DIALOG_BODY}>
          <a
            onClick={onClose}
            className="close-btn"
            role={'button'}
            tabIndex={-1}
          >
            <Icon icon={'cross'} iconSize={24} />
          </a>

          {children || body}
        </div>
      </StyledPopup>
    );
  }
}

Popup.propTypes = {
  title: PropTypes.any,
  body: PropTypes.any,
  isOpen: PropTypes.any,
  onClose: PropTypes.func,
  small: PropTypes.bool,
  large: PropTypes.bool,
};

Popup.defaultProps = {
  isCloseButtonShown: true,
};


export default injectIntl(Popup);
