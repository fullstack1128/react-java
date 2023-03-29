/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
  SET_USER_INFO,
  SHOW_REMIND_COMPLETE_PROFILE,
  HIDE_REMIND_COMPLETE_PROFILE,
  FETCH_USER_INFO,
  FETCH_USER_INFO_SUCCESSFULLY,
  GET_MASTER_DATA_SUCCESSFULLY,
  GET_SOCIAL_MEDIA_SUCCESSFULLY,
} from './constants';
import auth, { MASTER_DATA } from 'utils/auth';

// The initial state of the App
const initialState = fromJS({
  userInfo: null,
  isShowRemindCompleteProfile: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return state.set('userInfo', action.data);
    case FETCH_USER_INFO:
      return state;
    case FETCH_USER_INFO_SUCCESSFULLY:
      return state.set('userInfo', action.profile);
    case SHOW_REMIND_COMPLETE_PROFILE:
      return state.set('isShowRemindCompleteProfile', true);
    case HIDE_REMIND_COMPLETE_PROFILE:
      return state.set('isShowRemindCompleteProfile', false);
    case GET_MASTER_DATA_SUCCESSFULLY:
      auth.set(action.data, MASTER_DATA);
      return state.set('masterData', action.data);
    case GET_SOCIAL_MEDIA_SUCCESSFULLY:
      return state.set('socialMedia', action.data);
    default:
      return state;
  }
}

export default appReducer;
