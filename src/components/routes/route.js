import * as Pages from '../../pages';

const Home = {
  name: 'home',
  path: '/home',
  navbarDisplay: true,
  component: Pages.Home
};
export { Home };

export default [
  Home,
  {
    name: 'about',
    path: '/about',
    navbarDisplay: true,
    component: Pages.About
  },
  {
    name: 'myEvents',
    path: '/myEvents',
    secure: ["user","admin"],
    navbarDisplay: true,
    component: Pages.MyEvents
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
    secure: ["user","admin"],
    navbarDisplay: true,
    component: Pages.EventsList
  },
  {
    name: 'list',
    path: '/eventDetails/:eventId',
    secure: ["user","admin"],
    component: Pages.EventDetails
  },
];

