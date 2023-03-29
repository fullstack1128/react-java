import React, { Fragment } from 'react';
import { matchPath } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import isNil from 'lodash/isNil';
import isEqual from 'lodash/isEqual';
import ProtectedRoute from '../Routes/ProtectedRoute';
import Footer from 'containers/Footer';
import NavLinkWithIcon from 'components/NavLinkWithIcon';
import ConnectedHeader from 'containers/ConnectedHeader';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { getMessageByPathSegment } from 'containers/Routes/messages';
import StyledUserPages from './styled/StyledUserPages';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserInfo } from './selectors';
import injectReducer from '../../utils/injectReducer';
import { KEY_APP } from './constants';
import reducer from './reducer';
import {
  getMasterData,
} from './actions';
import { logout as authLogout } from 'services/auth.service';
import * as PropTypes from 'prop-types';
import messages from './messages';
import { DAEMON } from 'utils/constants';
import userRoutes, { managementLinks } from 'containers/Routes/userRoutes';
import { CommonToaster } from '../../components/CommonToaster';
import { Intent } from '@blueprintjs/core';
import styled from 'styled-components';
import responseCodeMessages from '../../constants/responseCode/messages';
import isEmpty from 'lodash/isEmpty';
import { mapPermissionUrl } from '../Routes/mapPermissionUrl';
import auth from 'utils/auth';
import Header from 'containers/Header';
import routeMessages from 'containers/Routes/messages';

class UserPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapse: false,
      isMobile: window.innerWidth <= 768,
      activePath: '',
      headerName: '',
      currentLocation: location.pathname,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.state.isMobile) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ isCollapse: true });
    }

    this.handleUpdateHeaderName();
  }

  handleCollapseWhenChangeRoute = (location) => {
    if (!this.state.isCollapse) {
      for (const link of this.getManagementLinks()) {
        if (location.pathname.includes(link.path)) {
          this.setState({ isCollapse: true });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Handle collapse when go to menu management
    if (!isEqual(prevProps, this.props)) {
      // this.handleCollapseWhenChangeRoute(this.props.location);
    }

    if (prevState.currentLocation !== location.pathname) {
      this.handleUpdateHeaderName();
    }
  }

  handleUpdateHeaderName() {
    const { intl } = this.props;
    this.setState({ currentLocation: location.pathname });
    this.getManagementLinks().forEach((link) => {
      if (location.pathname.includes(link.path)) {
        const name = intl.formatMessage(getMessageByPathSegment(link.name));
        this.setState({ headerName: name });
      }
    });
  }

  updateHeaderName = () => {
    const { intl } = this.props;
    this.setState({ currentLocation: location.pathname });
    this.getManagementLinks().forEach((link) => {
      if (location.pathname.includes(link.path)) {
        const name = intl.formatMessage(getMessageByPathSegment(link.name));
        this.setState({ headerName: name });
      }
    });
  };

  handleCollapse = () => {
    this.setState({
      isCollapse: !this.state.isCollapse,
    });
  }

  getManagementLinks = () => {
    let permissionFeature = [];
    const userInfo = auth.getUserInfo();
    const { isMobile } = this.state;

    if (isNil(userInfo)) {
      return [];
    }

    if (!isEmpty(userInfo.permissions)) {
      permissionFeature = userInfo.permissions.map((code) => mapPermissionUrl[code]);
    }

    return managementLinks.filter((el) => (!isMobile || !el.hideOnMobile)
      && el.roles.includes(userInfo.role)
      && (isEmpty(permissionFeature) || permissionFeature.includes(el.path)));
  }

  cbError = (error) => {
    CommonToaster.show({
      message: this.props.intl.formatMessage(responseCodeMessages[error]),
      intent: Intent.DANGER,
    });
  }

  isActiveLink(link) {
    return (match, location) => (
      !!match ||
      (
        link.children &&
        link.children.reduce((isActived, child) => (
            isActived ||
            matchPath(location.pathname, {
              path: child,
              exact: false,
              strict: false,
            }
            )
          ),
          false
        )
      )
    );
  }

  logout = () => {
    authLogout();
    localStorage.clear();
    window.location.reload();
  }

  render() {
    // CHECK LOGIN
    const loggedIn = auth.isAuthenticated();
    if (!loggedIn) {
      return (<Redirect
        to={{
          pathname: '/login',
        }}
      />);
    }

    const { intl } = this.props;
    const userInfo = auth.getUserInfo();
    const { isCollapse, isMobile, headerName } = this.state;

    return (
      <Fragment>
        <StyledUserPages>
          <div className="page-content">
            <div className={`sidebar ${isCollapse ? 'is-collapse' : ''}`}>
              <div className="user-info">
                <div className="avatar">
                </div>
                <div className="detail">
                  <div className="name">
                    {userInfo ? userInfo.fullName : ''}
                  </div>
                  <div className="type">
                  </div>
                  <div className="email">
                    <a className="font-weight-lighter" onClick={this.logout}>Log out</a>
                  </div>
                </div>
              </div>


              <div className="menu">
                <div className="menu-group">
                  {this.getManagementLinks().map((link) => (
                    <NavLinkWithIcon
                      key={link.path}
                      icon={link.icon}
                      to={link.path}
                      width={20}
                      height={20}
                      isCollapse={isCollapse}
                      isActive={this.isActiveLink(link)}
                      onClick={isMobile ? this.handleCollapse : null}
                    >
                      <FormattedMessage
                        {...getMessageByPathSegment(link.name)}
                      />
                    </NavLinkWithIcon>
                  ))}
                </div>
              </div>
            </div>


            <div className="content">
              <Header
                handleCollapse={this.handleCollapse}
                headerName={headerName}
                updateHeaderName={this.updateHeaderName}
              />
              <div className="body">
                <div className="body-content">
                  <Switch>
                    {userRoutes.map((route) => (
                      <ProtectedRoute
                        path={route.path}
                        component={route.component}
                        userTypes={route.roles}
                        className={route.className}
                        key={route.name}
                      />
                    ))}
                    <Route component={NotFoundPage} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </StyledUserPages>
      </Fragment>
    );
  }
}


UserPages.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMasterData,
  }, dispatch);
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withSaga = injectSaga({ key: KEY_APP, saga, mode: DAEMON });
const withReducer = injectReducer({ key: KEY_APP, reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  injectIntl
)(UserPages);
