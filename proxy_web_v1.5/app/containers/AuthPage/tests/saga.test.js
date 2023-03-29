import { runSaga } from 'redux-saga';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import * as authServices from '../../../services/auth.service';
import * as historyUtils from '../../../utils/history';

import { submitForm } from '../saga';

describe('authPage saga', () => {
  it('should add token and user info to sessionStorage when login success', async () => {
    const mockToken = 'hr5thgt4e54gr34534sv';

    const mockUser = {
      name: 'test',
      email: 'testlogin@faba.com',
      phone: '0'
    };

    const mockResponse = {
      success: true,
      token: mockToken,
      user: mockUser,
    };

    const params = {
      fromType: 'login',
      data: {
        email: mockUser.email,
        identifier: '',
        password: '123',
        rememberMe: false,
      },
    };

    const dispatched = [];

    // Call fake functions
    sinon.stub(authServices, 'submitFormAuthPage').callsFake(() => mockResponse);
    sinon.stub(historyUtils, 'forwardTo').callsFake(() => true);

    await runSaga({
      // All actions that dispatched in saga
      dispatch: (action) => dispatched.push(action),
    }, submitForm, params).done;

    // Compare actions that dispatched in saga with expect result
    expect(dispatched).toEqual([]);
    // Compare data in sessionStorage with mock data
    expect(sessionStorage.jwt_token).toEqual(JSON.stringify(mockToken));
    expect(sessionStorage.user_info).toEqual(JSON.stringify(mockUser));
  });
});
