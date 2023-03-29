import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';

import WithHandlePromise from 'containers/WithHandlePromise';
import ActionDialog from 'components/common/ActionDialog';
import Button from 'components/common/Button';

const AlertPopup = (props) => {
  const {
    isOpen,
    alertTitle,
    alertMessage,
    handleOnClose
  } = props;

  return (
    <ActionDialog
      portalClassName="custom-portal"
      usePortal
      canOutsideClickClose
      canEscapeKeyClose
      onClose={handleOnClose}
      isOpen={isOpen}
      title={alertTitle}
      key="alert-popup"
    >
      <div className="action-popup-content my-4">
        <div className="text-center">
          {alertMessage}
        </div>
      </div>

      <div className="action-popup-footer">
        <Button
          primary
          type="submit"
          className="min-width-300"
          onClick={handleOnClose}
          text="OK"
        />
      </div>
    </ActionDialog>
  );
}

export default compose(
  WithHandlePromise
)(AlertPopup);
