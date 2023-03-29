import { createSelector } from 'reselect';
import { KEY_APP } from './constants';
import auth, { MASTER_DATA } from 'utils/auth';
import isNil from 'lodash/isNil';
import get from 'lodash/get';

const selectPageDomain = (state) => state.get(KEY_APP);

const makeSelectGlobal = () => createSelector(
  selectPageDomain,
  (substate) => substate.toJS()
);

const makeSelectIsShowRemindCompleteProfile = () => createSelector(
  selectPageDomain,
  (substate) => substate.get('isShowRemindCompleteProfile')
);

const makeSelectUserInfo = () => createSelector(
  selectPageDomain,
  (substate) => substate.get('userInfo')
);

const makeSelectSocialMedia = () => createSelector(
  selectPageDomain,
  (substate) => substate.get('socialMedia')
);

const makeSelectMasterData = () => createSelector(
  selectPageDomain,
  (substate) => {



    return null;
  }
);

export default makeSelectGlobal;
export {
  makeSelectIsShowRemindCompleteProfile,
  makeSelectUserInfo,
  makeSelectMasterData,
  makeSelectSocialMedia,
};
