/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import auth from 'utils/auth';

import {
  CHANGE_LOCALE,
} from './constants';
import {
  DEFAULT_LOCALE,
} from '../App/constants'; // eslint-disable-line

const locale = 'RB_LOCALE';

const initialState = fromJS({
  locale: auth && auth.get(locale) ? auth.get(locale) : DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      auth.set(action.locale, locale, true);
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
