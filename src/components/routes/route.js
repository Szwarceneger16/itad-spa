import * as Pages from '../../pages';

export default [
  {
    name: 'home',
    path: '/home',
    navbarDisplay: true,
    component: Pages.Home
  },
  {
    name: 'about',
    path: '/about',
    navbarDisplay: true,
    component: Pages.About
  },
  {
    name: 'myEvents',
    path: '/myEvents',
    secure: ["admin"],
    navbarDisplay: true,
    component: Pages.MyEvents
  },
  {
    name: 'DDD',
    path: '/ddd'
  },
  {
    name: 'login',
    path: '/login',
    navbarDisplay: true,
    component: Pages.Login
  },
  {
    name: 'register',
    path: '/register',
    navbarDisplay: true,
    component: Pages.Register
  },
  {
    name: 'events',
    path: '/eventsList',
    navbarDisplay: true,
    component: Pages.EventsList
  },
  {
    name: 'list',
    path: '/eventDetails/:eventId',
    component: Pages.EventDetails
  },
];