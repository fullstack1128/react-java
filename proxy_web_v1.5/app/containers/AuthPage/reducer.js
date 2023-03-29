/*
 *
 * AuthPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { ON_CHANGE, SUBMITTED_ERROR } from './constants';

export const initialState = fromJS({
  formType: 'login',
  modifiedData: Map({}),
  errorStatus: false,
});

function authPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return state.updateIn(['modifiedData', action.key], () => action.value);
    case SUBMITTED_ERROR:
      return state.set('errorStatus', true);
    default:
      return state;
  }
}

export default authPageReducer;
