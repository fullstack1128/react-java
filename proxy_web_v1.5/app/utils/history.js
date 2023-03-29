import createHistory from 'history/createBrowserHistory';
const history = createHistory();

/**
 * Helper to handle navigation from sagas.
 * @param  {String} location The path to navigate
 * @param state
 */
export function forwardTo(location, state) {
  history.push(location, state);
}


export default history;
