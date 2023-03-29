import {
  FETCH_USER_INFO,
  SET_USER_INFO,
  SHOW_REMIND_COMPLETE_PROFILE,
  HIDE_REMIND_COMPLETE_PROFILE,
  GET_MASTER_DATA,
  USER_UPLOAD_AVATAR,
  GET_SOCIAL_MEDIA,
} from './constants';


export function setUserInfo(data) {
  return {
    type: SET_USER_INFO,
    data,
  };
}

export function showRemindCompleteProfile() {
  return {
    type: SHOW_REMIND_COMPLETE_PROFILE,
  };
}


export function hideRemindCompleteProfile() {
  return {
    type: HIDE_REMIND_COMPLETE_PROFILE,
  };
}

export function fetchUserInfo() {
  return {
    type: FETCH_USER_INFO,
  };
}

export function getMasterData() {
  return {
    type: GET_MASTER_DATA,
  };
}

export function getSocialMedia() {
  return {
    type: GET_SOCIAL_MEDIA,
  };
}

export function uploadAvatar(file, cbError, cbSuccess) {
  return {
    type: USER_UPLOAD_AVATAR,
    file,
    cbError,
    cbSuccess,
  };
}
