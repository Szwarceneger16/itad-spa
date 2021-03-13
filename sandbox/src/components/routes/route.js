import {Home,Login,About,Register} from '../../pages';

export default [
  {
    name: 'home',
    to: '/',
    component: Home
  },
  {
    name: 'login',
    to: '/login',
    component: Login
  },
  {
    name: 'about',
    to: '/about',
    component: About
  },
  {
    name: 'BBB',
    to: '/bbb'
  },
  {
    name: 'DDD',
    to: '/ddd'
  },
  {
    name: 'register',
    to: '/register',
    component: Register
  },
];