import Home from './Home';
import About from './About';
import Charts from './Charts';

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
  },
  {
    path: '/charts',
    component: Charts,
    exact: true,
    title: 'Charts',
    description: '',
    socialText: '',
    image: ''
  }
];
