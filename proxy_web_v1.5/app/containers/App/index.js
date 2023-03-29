/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import ReactGA from 'react-ga';
import { Route, Switch } from 'react-router-dom';
import indexRoutes from '../Routes';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ProtectedRoute from 'containers/Routes/ProtectedRoute';
import history from 'utils/history';
import UserPages from 'containers/Pages/UserPages';
import { routes } from 'containers/Routes/routeHelper';
import ErrorBoundary from '../ErrorBoundary';
import env from 'env';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let gaInitialized = false;
    addEventListener('storage', () => {});

    // if (env.GA_TRACKING_ID) {
    //   ReactGA.initialize([{
    //     trackingId: env.GA_TRACKING_ID,
    //   }]);
    //
    //   gaInitialized = true;
    // } else {
    //   console.warn('Cannot find Google Analytics Tracking Id.');
    // }

    this.state = {
      gaInitialized,
    };
  }

  trackPage(page) {
    if (this.state.gaInitialized) {
      ReactGA.set({
        page,
      });
      ReactGA.pageview(page);
    }
  }

  componentWillMount() {
    history.listen((location, action) => {
      if (action === 'PUSH') {
        scrollTo(0, 0);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const currentPage = this.props.location.pathname;
    const nextPage = nextProps.location.pathname;
    if (currentPage !== nextPage) {
      this.trackPage(nextPage);
    }
  }

  render() {
    // const userInfo = auth.getUserInfo();

    return (
      <ErrorBoundary>
        <div className={'bg-white'}>
          <div className={'d-flex flex-column'}>
            <Switch>
              {/*<ProtectedRoute exac path={routes.USER} component={UserPages} />*/}
              {indexRoutes.map((prop, key) => (
                <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />
              ))}
              <Route component={NotFoundPage} />
            </Switch>
            {/* <CallModule />*/}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
