import Home from './Home';
import About from './About';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    title: 'Home',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/about',
    component: About,
    exact: true,
    title: 'About',
    description: '',
    socialText: '',
    image: ''
  }
];
