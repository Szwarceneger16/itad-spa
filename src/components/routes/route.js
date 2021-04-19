import * as Pages from '../../pages';

export default [
  {
    name: 'home',
    path: '/home',
    component: Pages.Home
  },
  {
    name: 'about',
    path: '/about',
    component: Pages.About
  },
  {
    name: 'myEvents',
    path: '/myEvents',
    secure: ["admin"],
    component: Pages.MyEvents
  },
  {
    name: 'DDD',
    path: '/ddd'
  },
  {
    name: 'login',
    path: '/login',
    component: Pages.Login
  },
  {
    name: 'register',
    path: '/register',
    component: Pages.Register
  },
  {
    name: 'PROBA',
    path: '/eventDetails',
    component: Pages.EventDetails
  },
];