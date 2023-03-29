import React from 'react';
import HandleAlertLoader from './HandleAlertLoader';
import hoistNonReactStatics from 'hoist-non-react-statics';

const WithHandleError = (WrappedComponent) => {
  const r = (props) => (
    <HandleAlertLoader>
      <WrappedComponent {...props} />
    </HandleAlertLoader>
  );

  return hoistNonReactStatics(r, WrappedComponent);
};

export default WithHandleError;
