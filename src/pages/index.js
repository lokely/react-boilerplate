import Home from './Home';
import About from './About';
import Projects from './Projects';
import Styling from './Styling';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    showInMenu: true,
    title: 'Home',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/about',
    component: About,
    exact: true,
    showInMenu: true,
    title: 'About',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/projects',
    exact: true,
    component: Projects,
    showInMenu: false,
    title: 'Projects',
    description: '',
    socialText: '',
    image: ''
  },
  {
    path: '/projects/styling',
    component: Styling,
    showInMenu: true,
    title: 'Styling',
    description: '',
    socialText: '',
    image: ''
  }
];
