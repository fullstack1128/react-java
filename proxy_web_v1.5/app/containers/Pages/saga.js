import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserProfileReq, userUploadAvatarReq } from 'services/user.service';


import {
  FETCH_USER_INFO,
  FETCH_USER_INFO_SUCCESSFULLY,
  GET_MASTER_DATA,
  GET_MASTER_DATA_SUCCESSFULLY,
  USER_UPLOAD_AVATAR,
  GET_SOCIAL_MEDIA,
  GET_SOCIAL_MEDIA_SUCCESSFULLY,
} from './constants';
import auth from 'utils/auth';
import { setUserInfo } from './actions';

function* fetchUserProfile() {
  try {
    const result = yield call(getUserProfileReq);
    const { profile } = result;
    if (profile.date_of_birth) {
      profile.date_of_birth = new Date(profile.date_of_birth);
    }

    // Put to store
    yield put({ type: FETCH_USER_INFO_SUCCESSFULLY, profile });
    yield call(auth.setUserInfo, profile);
  } catch (error) {
    // TODO handle error
  }
}

function* getMasterDataGlobal() {
  try {
    // Put to store
    yield put({ type: GET_MASTER_DATA_SUCCESSFULLY });
  } catch (error) {
    // TODO handle error
  }
}

export function* uploadAvatar(action) {
  try {
    const response = yield call(userUploadAvatarReq, action.file);
    const { user } = response.data;

    yield put(setUserInfo(user));
    yield call(auth.setUserInfo, user);
    action.cbSuccess();
  } catch (error) {
    action.cbError(error.response.data.error.code);
  }
}

export default function* defaultSaga() {
  yield takeLatest(FETCH_USER_INFO, fetchUserProfile);
  yield takeLatest(GET_MASTER_DATA, getMasterDataGlobal);
  yield takeLatest(USER_UPLOAD_AVATAR, uploadAvatar);
}
