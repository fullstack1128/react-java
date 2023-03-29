// import { isEmpty } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'jwt_token';
const USER_INFO = 'user_info';


export const MASTER_DATA = 'app_master_data';

const parse = JSON.parse;
const stringify = JSON.stringify;

export const sharingSessionStorage = {
  REQUESTING_SHARED_CREDENTIALS: 'REQUESTING_SHARED_CREDENTIALS',
  CREDENTIALS_SHARING: 'CREDENTIALS_SHARING',
  CREDENTIALS_FLUSH: 'CREDENTIALS_FLUSH',
};

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage = true) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      // Fix lỗi data lưu ở session sẽ bị lỗi khi move sang tab mới
      // return sessionStorage.setItem(key, stringify(value));
      return localStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
    if (value.date_of_birth) {
      value.date_of_birth = new Date(value.date_of_birth);
    }
    return auth.set(value, userInfo, isLocalStorage);
  },

  getTokenPayload() {
    const token = auth.getToken();

    if (token) {
      try {
        return jwt_decode(token);
      } catch (error) {
        return null;
      }
    }

    return null;
  },

  isTokenValid(tokenPayload) {
    if (!tokenPayload) {
      return false;
    }

    try {
      const expInMillis = tokenPayload.exp * 1000;
      if (Date.now() < expInMillis) {
        return true;
      }
    } catch (error) {}
    return false;
  },

  isAuthenticated() {
    return this.isTokenValid(this.getTokenPayload());
  },

  sharingSessionStorage() {
    localStorage.setItem(sharingSessionStorage.REQUESTING_SHARED_CREDENTIALS, Date.now().toString());
    localStorage.removeItem(sharingSessionStorage.REQUESTING_SHARED_CREDENTIALS);

    addEventListener('storage', (event) => {
      const credentials = JSON.parse(sessionStorage.getItem(TOKEN_KEY));
      const userInfo = JSON.parse(sessionStorage.getItem(USER_INFO));

      if (event.key === sharingSessionStorage.REQUESTING_SHARED_CREDENTIALS && credentials) {
        localStorage.setItem(sharingSessionStorage.CREDENTIALS_SHARING, stringify({
          TOKEN_KEY: credentials,
          USER_INFO: stringify(userInfo),
        }));
        localStorage.removeItem(sharingSessionStorage.CREDENTIALS_SHARING);
      }
      if (event.key === sharingSessionStorage.CREDENTIALS_SHARING && !credentials) {
        if (event.newValue) {
          const parseData = parse(event.newValue);

          sessionStorage.setItem(TOKEN_KEY, stringify(parseData.TOKEN_KEY));
          sessionStorage.setItem(USER_INFO, parseData.USER_INFO);
        }
      }
      if (event.key === sharingSessionStorage.CREDENTIALS_FLUSH && credentials) {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_INFO);
      }
    });
  },

  isPermission(permission) {
    if (auth.getUserInfo().permissions && auth.getUserInfo().permissions.includes(permission)) {
      return true;
    }
    return false;
  },


};

export default auth;
