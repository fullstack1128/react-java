import { createSelector } from 'reselect';

/**
 * Direct selector to the changePasswordPage state domain
 */
const selectChangePasswordPageDomain = (state) => state.get('changePasswordPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChangePasswordPage
 */

const makeSelectChangePasswordPage = () => createSelector(
  selectChangePasswordPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectChangePasswordPage;
export {
  selectChangePasswordPageDomain,
};
