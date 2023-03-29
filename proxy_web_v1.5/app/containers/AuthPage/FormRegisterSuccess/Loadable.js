/**
 *
 * Asynchronously loads the component for FormRegisterSuccess
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
