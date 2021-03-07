import Home from './pages/Home.js';
import About from './pages/About.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

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