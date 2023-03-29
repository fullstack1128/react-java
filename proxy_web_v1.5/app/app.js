/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

// Import style bluesprint
import '@blueprintjs/core/lib/css/blueprint.css';

// Import style react-image-gallery
import 'react-image-gallery/styles/css/image-gallery.css';

// Import font SF Pro
import '!!style-loader!css-loader!./styles/fonts/SF Pro/stylesheet.css';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from 'utils/history';

// Import style bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'react-day-picker/lib/style.css';

// Import antd style
// import 'antd/dist/antd.css';

// Import react-rangeslider style
import 'react-rangeslider/lib/index.css';

// Import fontAwesome Pro
import '!!style-loader!css-loader!./styles/fonts/fontawesome-pro/css/all.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
import { ThemeProvider } from 'styled-components';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

// Import CSS reset and Global Styles
import './styles/global-styles';

// Import theme style
import theme from './styles/themeStyle';

import * as Sentry from '@sentry/browser';
import env from './env';
import { Route, Switch } from 'react-router-dom';


if (env.SENTRY_ENABLE) {
  Sentry.init({ dsn: env.SENTRY_DSN });
}

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route component={App} />
            </Switch>
          </ThemeProvider>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (window.Intl) {
  render(translationMessages);
} else {
  (new Promise((resolve) => {
    resolve(import('intl'));
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
