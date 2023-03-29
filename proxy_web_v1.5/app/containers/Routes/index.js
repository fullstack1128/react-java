import AuthPages from '../Pages/AuthPages';
import UserPages from '../Pages/UserPages';

const indexRoutes = [
  { path: '/(login|register|create-password|forget-password)', name: 'login', component: AuthPages },
  // { path: '/user', name: 'auth', component: UserPages },
  { path: '/', name: 'auth', component: UserPages },
];

export default indexRoutes;
