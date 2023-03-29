/**
*
* ConfirmDialog
*
*/

import React from 'react';
import StyledDialog from './StyledDialog';
import { Classes } from '@blueprintjs/core';
import Button from 'components/common/Button';
import ButtonLink from 'components/ButtonLink';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class ConfirmDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { message, cancelButtonText, onClose, confirmButtonText, onConfirm, loading } = this.props;

    return (
      <StyledDialog
        {...this.props}
        onOpened={() => {
          if (this.props.focusCloseButton) {
            // eslint-disable-next-line react/no-find-dom-node
            ReactDOM.findDOMNode(this.closeButton).focus();
          } else {
            // eslint-disable-next-line react/no-find-dom-node
            ReactDOM.findDOMNode(this.confirmButton).focus();
          }
        }}
        width="450"
      >
        <div className={Classes.DIALOG_BODY}>
          <b style={{ fontSize: 18, fontWeight: 'bold' }}>
            <div dangerouslySetInnerHTML={{ __html: message }} /></b>
        </div>

        <div className={`action-popup-footer ${Classes.DIALOG_FOOTER}`}>
          <Button
            primary
            className="min-width-300"
            type="button"
            text={confirmButtonText}
            onClick={() => {
              onConfirm();
            }}
            ref={(ref) => { this.confirmButton = ref; }}
            loading={loading}
          />
          <ButtonLink
            onClick={onClose}
            type={'button'}
            ref={(ref) => { this.closeButton = ref; }}
          >
            {cancelButtonText}
          </ButtonLink>
        </div>
      </StyledDialog>
    );
  }
}

ConfirmDialog.propTypes = {
  focusCloseButton: PropTypes.bool,
  message: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onClose: PropTypes.func,
  confirmButtonText: PropTypes.string,
};

export default ConfirmDialog;
