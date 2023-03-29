import auth from 'utils/auth';
import {
  FORM_TYPE_CREATE_PASSWORD_VI,
  FORM_TYPE_FORGOT_PASSWORD_VI,
  FORM_TYPE_LOGIN_VI,
  FORM_TYPE_REGISTER_VI,
  INIT_DATA_REGISTER,
  SUBMIT,
  SUBMIT_FORGOT_PASSWORD_OTP,
  SUBMIT_OTP,
  UPLOAD_AVATAR,
  UPLOAD_CONTRACT_FILE,
  UPLOAD_PHOTO_CARD,
} from './constants';
import { submitFormAuthPage, submitOTPForgotPasswordForm, submitOTPForm } from '../../services/auth.service';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { forwardTo } from '../../utils/history';
import { eUserType } from '../../enums/EUserType';
import { initDataRegisterReq, uploadAvatarReq, uploadContractFileReq, uploadPhotoCardReq } from 'services/user.service';
import { setUserInfo, showRemindCompleteProfile } from 'containers/Pages/actions';
import { routes } from '../Routes/routeHelper';


export function* submitForm(action) {
  try {
    auth.clearUserInfo();
    auth.clearToken();

    const response = yield call(submitFormAuthPage, action.formType, action.data);

    switch (action.formType) {
      case FORM_TYPE_LOGIN_VI: {
        if (response.token) {
          // Set the user's credentials
          yield all([
            call(auth.setToken, response.token, action.data.remember_me),
            call(auth.setUserInfo, response.user, action.data.remember_me),
          ]);

          yield put(setUserInfo(response.user));

          if (response.user.role === 'CLIENT') {
            yield call(forwardTo, routes.CLIENT_DASHBOARD);
          } else {
            yield call(forwardTo, routes.ADMIN_OVERVIEW);
          }
        }

        break;
      }

      case FORM_TYPE_REGISTER_VI: {
        if (response.uuid) {
          action.callbackSuccess(response);
          yield call(forwardTo, '/login');
        } else {
          action.callbackError(response.message);
        }
        break;
      }

      case FORM_TYPE_FORGOT_PASSWORD_VI: {
        yield call(forwardTo, `/${FORM_TYPE_CREATE_PASSWORD_VI}`);
        break;
      }

      case FORM_TYPE_CREATE_PASSWORD_VI: {
        if (response.data.uuid) {
          action.callbackSuccess(response);
          yield call(forwardTo, '/login');
        } else {
          action.callbackError(response.message);
        }
        break;
      }

      default:
        action.callbackSuccess();
        yield call(forwardTo, `/${FORM_TYPE_LOGIN_VI}`);
        break;
    }
  } catch (error) {
    action.callbackError(error.response);
  }
}

export function* submitOTP(action) {
  try {
    yield call(submitOTPForm, action.phone);
  } catch (error) {
    action.callbackError(error.response);
  }
}

export function* submitOTPForgotPassword(action) {
  try {
    yield call(submitOTPForgotPasswordForm, action.phone);
  } catch (error) {
    action.callbackError(error.response);
  }
}

export function* uploadAvatar(action) {
  try {
    const response = yield call(uploadAvatarReq, action.file);
    action.cbSuccess(response.data.url);
  } catch (error) {
    action.cbError(error.response);
  }
}

export function* uploadContractFile(action) {
  try {
    const response = yield call(uploadContractFileReq, action.file);
    action.cbSuccess(response.data.url);
  } catch (error) {
    action.cbError(error.response);
  }
}

export function* uploadPhotoCard(action) {
  try {
    const response = yield call(uploadPhotoCardReq, action.params.file);
    action.cbSuccess(response.data.url, action.params.type);
  } catch (error) {
    action.cbError(error.response);
  }
}


export function* initDataRegister(action) {
  try {
    const response = yield call(initDataRegisterReq);
    action.cbSuccess(response.data);
  } catch (error) {
    action.cbError(error.response);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, SUBMIT, submitForm);
  yield fork(takeLatest, SUBMIT_OTP, submitOTP);
  yield fork(takeLatest, SUBMIT_FORGOT_PASSWORD_OTP, submitOTPForgotPassword);
  yield fork(takeLatest, UPLOAD_AVATAR, uploadAvatar);
  yield fork(takeLatest, UPLOAD_CONTRACT_FILE, uploadContractFile);
  yield fork(takeLatest, UPLOAD_PHOTO_CARD, uploadPhotoCard);
  yield fork(takeLatest, INIT_DATA_REGISTER, initDataRegister);
  // yield take(LOCATION_CHANGE);
}
