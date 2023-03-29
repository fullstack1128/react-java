import { all, take, call, fork, takeLatest, put } from 'redux-saga/effects';
// Individual exports for testing
import { CHANGE_PASSWORD } from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as authServices from 'services/auth.service';
import { forwardTo } from '../../utils/history';
import auth from 'utils/auth';
import { setUserInfo } from 'containers/Pages/actions';

export function* changePassword(action) {
  try {
    const response = yield call(authServices.changePassword, { ...action.params });
    if (response.token && response.user) {
      // Set the user's credentials
      yield all([
        call(auth.setToken, response.token),
        call(auth.setUserInfo, response.user),
      ]);

      yield put(setUserInfo(response.user));

      action.callbackSuccess();
      // yield call(forwardTo, '/user/account-mgmt');
      yield call(forwardTo, '/user/info');
    }
  } catch (error) {
    action.callbackError(error.response);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, CHANGE_PASSWORD, changePassword);
  yield take(LOCATION_CHANGE);
}
