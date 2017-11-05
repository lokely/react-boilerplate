import axios from 'axios';
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
    title: 'Portfolio',
    description: 'This is the home page.',
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
    image: '',
    preload: () => axios.get('http://159.203.100.15/api/portfolio').then(res => res.data)
  }
];
