import React from 'react';
import ManagerPromiseLoader from './HandlePromiseLoader';
import hoistNonReactStatics from 'hoist-non-react-statics';

const WithHandlePromise = (WrappedComponent) => {
  const r = (props) => (
    <ManagerPromiseLoader>
      <WrappedComponent {...props} />
    </ManagerPromiseLoader>
  );

  return hoistNonReactStatics(r, WrappedComponent);
};

export default WithHandlePromise;
