import { createSelector } from 'reselect';

const selectUserProfile = (state) => state.get('userProfile');

const makeSelectUserProfileAndAuth = () =>
  createSelector(
    selectUserProfile,
    (userProfile) => ({
      status: userProfile.get('status'),
      profile: userProfile.get('profile'),
    })
  );

export default makeSelectUserProfileAndAuth;
