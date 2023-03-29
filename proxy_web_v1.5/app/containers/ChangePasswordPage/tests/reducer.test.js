
import { fromJS } from 'immutable';
import changePasswordPageReducer from '../reducer';

describe('changePasswordPageReducer', () => {
  it('returns the initial state', () => {
    expect(changePasswordPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
