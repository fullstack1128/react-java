/**
 *
 * Auth
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import get from 'lodash/get';
import auth from 'utils/auth';
import NotFound from '../../NotFoundPage';
import isEmpty from 'lodash/isEmpty';
import { mapPermissionUrl } from '../mapPermissionUrl';
import { routes as route } from '../../Routes/routeHelper';
import { managementLinks } from '../../Routes/userRoutes';
import { eUserType } from '../../../enums/EUserType';

const ProtectedRoute = ({ component: Component, userTypes, noLoginRequired, className, path, children, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const loggedIn = auth.isAuthenticated();
      const userInfo = auth.getUserInfo();
      if (!loggedIn) {
        if (noLoginRequired) {
          return <Component {...props} loggedIn={loggedIn} />;
        }

        if (!noLoginRequired) {
          return (<Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname },
            }}
          />);
        }
      }

      const permissionPaths = getPermissionPath(userInfo.permissions);

      if ((
          isEmpty(userTypes)
          || (Array.isArray(userTypes) && userTypes.includes(userInfo.role))
          || (!Array.isArray(userTypes) && userTypes === userInfo.role))
        && (path === route.USER || checkPermissionPath(userInfo.role, permissionPaths, path))
      ) {
        return (
          <Component {...props} loggedIn={loggedIn} />
        );
      }

      return (<NotFound />);
    }}
  />
);

const getPermissionPath = (userFeatures) => {
  let permissionPaths = [];
  if (!isEmpty(userFeatures)) {
    userFeatures.forEach((code) => {
      permissionPaths.push(mapPermissionUrl[code]);

      const subPaths = get(managementLinks.find((el) => el.path === mapPermissionUrl[code]), 'children');
      if (subPaths && subPaths.length > 0) {
        permissionPaths = permissionPaths.concat(subPaths);
      }
    });
  }
  return permissionPaths;
};

const checkPermissionPath = (userType, permissionPaths, path) => {
  if ([eUserType.ADMIN].includes(userType)) {
    if (isEmpty(permissionPaths)) {
      return false;
    }

    let isPermission = false;
    permissionPaths.forEach((p) => {
      if (path.includes(p)) {
        isPermission = true;
      }
    });
    return isPermission;
  }
  return true;
};

export default ProtectedRoute;
