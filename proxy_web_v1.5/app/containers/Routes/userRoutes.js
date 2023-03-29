import OverviewPageIcon from 'images/sidebarIcon/ic_unit.svg';
import ProxyPageIcon from 'images/sidebarIcon/ic_currency.svg';
import ProfilePageIcon from 'images/sidebarIcon/ic_customer.svg';
import ConfigurationPageIcon from 'images/sidebarIcon/ic_port.svg';
import ModemPageIcon from 'images/sidebarIcon/ic_fee.svg';
import PackagePageIcon from 'images/sidebarIcon/ic_sop.svg';
import LicensePageIcon from 'images/sidebarIcon/ic-developer-board.svg';
import TransactionPageIcon from 'images/sidebarIcon/ic-jf-insurace.svg';
import CustomerPageIcon from 'images/sidebarIcon/ic_partner.svg';
import SeaPageIcon from 'images/sidebarIcon/ic_quote_sea.svg';

import OverviewPage from 'containers/Admin/OverviewPage/Loadable';
import ModemPage from 'containers/Admin/ModemPage/Loadable';
import LicensePage from 'containers/Admin/LicensePage/Loadable';
import PackagePage from 'containers/Admin/PackagePage/Loadable';
import TransactionPage from 'containers/Admin/TransactionPage/Loadable';
import ProxyWanPage from 'containers/Admin/ProxyWanPage/Loadable';
import CustomerPage from 'containers/Admin/CustomerPage/Loadable';
import ConfigurationPage from 'containers/Admin/ConfigurationPage/Loadable';

import DashboardPage from 'containers/Client/DashboardPage/Loadable';
import MyProxyPage from 'containers/Client/MyProxyPage/Loadable';
import RechargePage from 'containers/Client/RechargePage/Loadable';
import AccountPage from 'containers/Client/ProfilePage/Loadable';
import ChangePasswordPage from 'containers/Client/ChangePasswordPage/Loadable';
import FaqPage from 'containers/Client/FaqPage/Loadable';

import { routes } from './routeHelper';
import { eUserType } from '../../enums/EUserType';

const userRoutes = [
  {
    path: routes.ADMIN_OVERVIEW,
    name: 'AdminOverview',
    component: OverviewPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_MODEM,
    name: 'AdminModem',
    component: ModemPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_MODEM_DETAIL,
    name: 'AdminModemDetail',
    component: ModemPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_PROXY,
    name: 'AdminProxy',
    component: ProxyWanPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_CUSTOMER,
    name: 'AdminCustomer',
    component: CustomerPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_LICENSE,
    name: 'AdminLicense',
    component: LicensePage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_TRANSACTION,
    name: 'AdminTransaction',
    component: TransactionPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_PACKAGE,
    name: 'AdminPackage',
    component: PackagePage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.ADMIN_CONFIGURATION,
    name: 'AdminConfiguration',
    component: ConfigurationPage,
    roles: [eUserType.ADMIN],
    className: 'white-full-bg',
  },

  {
    path: routes.CLIENT_DASHBOARD,
    name: 'ClientDashboard',
    component: DashboardPage,
    roles: [eUserType.CLIENT],
    className: 'white-full-bg',
  },
  {
    path: routes.CLIENT_NEW_MOBILE,
    name: 'ClientNewMobile',
    component: DashboardPage,
    roles: [eUserType.CLIENT],
    className: 'white-full-bg',
  },
  {
    path: routes.CLIENT_PROXY,
    name: 'ClientProxy',
    component: MyProxyPage,
    roles: [eUserType.CLIENT],
    className: 'white-full-bg',
  },
  {
    path: routes.CLIENT_RECHARGE,
    name: 'ClientRecharge',
    component: RechargePage,
    roles: [eUserType.CLIENT],
    className: 'white-full-bg',
  },
  {
    path: routes.CLIENT_ACCOUNT,
    name: 'ClientAccount',
    component: AccountPage,
    roles: [eUserType.CLIENT, eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.CHANGE_PASSWORD,
    name: 'Password',
    component: ChangePasswordPage,
    roles: [eUserType.CLIENT, eUserType.ADMIN],
    className: 'white-full-bg',
  },
  {
    path: routes.CLIENT_FAQ,
    name: 'Faq',
    component: FaqPage,
    roles: [eUserType.CLIENT],
    className: 'white-full-bg',
  },
];

export const managementLinks = [
  {
    path: routes.ADMIN_OVERVIEW,
    name: 'overview',
    icon: OverviewPageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_MODEM,
    name: 'modem',
    icon: ModemPageIcon,
    roles: [eUserType.ADMIN],
    children: [
      routes.ADMIN_MODEM_DETAIL,
    ],
  },
  {
    path: routes.ADMIN_PROXY,
    name: 'proxy',
    icon: ProxyPageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_LICENSE,
    name: 'license',
    icon: LicensePageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_PACKAGE,
    name: 'pkg',
    icon: PackagePageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_CUSTOMER,
    name: 'customer',
    icon: CustomerPageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_TRANSACTION,
    name: 'transaction',
    icon: TransactionPageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_CONFIGURATION,
    name: 'configuration',
    icon: ConfigurationPageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.ADMIN_MONITOR,
    name: 'monitor',
    icon: SeaPageIcon,
    roles: [eUserType.ADMIN],
    children: [
    ],
  },

  {
    path: routes.CLIENT_DASHBOARD,
    name: 'dashboard',
    icon: LicensePageIcon,
    roles: [eUserType.CLIENT],
    children: [
    ],
  },
  {
    path: routes.CLIENT_NEW_MOBILE,
    name: 'newmobile',
    icon: LicensePageIcon,
    roles: [eUserType.CLIENT],
    children: [
    ],
  },
  {
    path: routes.CLIENT_PROXY,
    name: 'myproxy',
    icon: ProxyPageIcon,
    roles: [eUserType.CLIENT],
    children: [
    ],
  },
  {
    path: routes.CLIENT_RECHARGE,
    name: 'recharge',
    icon: TransactionPageIcon,
    roles: [eUserType.CLIENT],
    children: [
    ],
  },
  {
    path: routes.CLIENT_ACCOUNT,
    name: 'profile',
    icon: ProfilePageIcon,
    roles: [eUserType.CLIENT, eUserType.ADMIN],
    children: [
    ],
  },
  {
    path: routes.CLIENT_FAQ,
    name: 'faq',
    icon: ConfigurationPageIcon,
    roles: [eUserType.CLIENT],
    children: [
    ],
  },
];

export default userRoutes;
