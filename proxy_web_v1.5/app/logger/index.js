import * as loglevel from 'loglevel';
import env from 'env';

if (env.ENVIRONMENT === 'dev') {
  loglevel.setLevel('debug');
} else {
  loglevel.setLevel('error');
}

export default loglevel;
