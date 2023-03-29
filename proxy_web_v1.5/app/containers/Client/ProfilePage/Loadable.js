/**
 *
 * Asynchronously loads the component for AccountManagementPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
