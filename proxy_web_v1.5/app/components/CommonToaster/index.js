import { Position, Toaster } from '@blueprintjs/core';
import { Intent } from '@blueprintjs/core/lib/esm/index';

export const CommonToaster = Toaster.create({
  className: 'common-toaster',
  position: Position.TOP,
});

export const toastSuccess = (intl, mess) => {
  CommonToaster.show({ message: intl.formatMessage(mess), intent: Intent.SUCCESS });
};

export const toastError = (intl, mess) => {
  CommonToaster.show({ message: intl.formatMessage(mess), intent: Intent.DANGER });
};
