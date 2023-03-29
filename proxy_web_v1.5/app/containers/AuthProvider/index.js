import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { logout as authLogout } from 'services/auth.service';
import auth from 'utils/auth';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserInfo } from '../Pages/selectors';
import { setUserInfo } from '../Pages/actions';
// import { socket } from 'utils/socket';

const WrapperAuth = (WrappedComponent) => class extends Component {
  logout = () => {
    this.props.setUserInfo(null);
    authLogout();
    // socket.close();
    localStorage.clear();
    document.getElementById('zd-show').click();
  };

  componentDidMount() {
    const userInfo = auth.getUserInfo();
    const token = auth.getToken();

    if (token && userInfo) {
      this.props.setUserInfo(userInfo);
    }
  }

  render() {
    const { userInfo } = this.props;

    return (
      <WrappedComponent
        {...this.props}
        userInfo={userInfo}
        name={name}
        logout={this.logout}
      />
    );
  }
};

// const mapStateToProps = makeSelectUserProfileAndAuth();
const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // clearUserProfile,
      setUserInfo,
    },
    dispatch
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const AuthProvider = compose(
  withConnect,
  WrapperAuth
);

export default AuthProvider;
