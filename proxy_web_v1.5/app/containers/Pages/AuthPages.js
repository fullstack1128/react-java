import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from 'containers/Footer';
import authRoutes from '../Routes/authRoutes';
import auth from '../../utils/auth';
import ConnectedHeader from '../ConnectedHeader';
import StyledAuthPages from './styled/StyledAuthPages';
import { compose, bindActionCreators } from 'redux';
import { getMasterData, getSocialMedia } from './actions';
import { connect } from 'react-redux';
import { KEY_APP } from './constants';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import { createStructuredSelector } from 'reselect';
import LocaleToggle from '../Header/LocaleToggle';


class AuthPages extends React.Component {

  componentWillMount() {
    this.props.getMasterData();
    this.props.getSocialMedia();



    // setTimeout(() => {
    //   alert('START');
    //   auth.set('en', 'RB_LOCALE', true);
    // }, 3000);
  }

  handleLogout = () => {
    const { history } = this.props;
    auth.clearToken();
    auth.clearUserInfo();
    history.push('/');
  };

  render() {
    return (
      <StyledAuthPages>
        {/* <ConnectedHeader onLogoutCalled={this.handleLogout} />*/}
        <LocaleToggle />


        <Switch>
          {authRoutes.map((prop, key) => (
            <Route
              path={prop.path}
              key={key}
              render={(routeProps) => <prop.component {...routeProps} />}
            />
          ))}
        </Switch>

        {/* <Footer />*/}
      </StyledAuthPages>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getMasterData,
    getSocialMedia,
  }, dispatch);
}

const mapStateToProps = createStructuredSelector({
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: KEY_APP, reducer });
const withSaga = injectSaga({ key: KEY_APP, saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPages);
