import Home from './pages/Home.js';
import About from './pages/About.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

export default [
  {
    name: 'Home',
    to: '/',
    component: Home
  },
  {
    name: 'Login',
    to: '/login',
    component: Login
  },
  {
    name: 'About',
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
    name: 'Register',
    to: '/register',
    component: Register
  },
];