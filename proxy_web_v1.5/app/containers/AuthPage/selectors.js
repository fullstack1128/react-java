import { initialState } from './reducer';
import { KEY_APP } from 'containers/AuthPage/constants';

/**
 * Direct selector to the authPage state domain
 */
const selectAuthPageDomain = (state) => state.get(KEY_APP, initialState);

export { selectAuthPageDomain };

