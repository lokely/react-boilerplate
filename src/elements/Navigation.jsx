import React from 'react';
import { Link } from 'react-router-dom';
import pages from '../pages';

const Navigation = () => (
  <ul className="Navigation">
    {pages.map(page => (
      <li key={page.path}>
        <Link to={page.path}>{page.title}</Link>
      </li>
    ))}
  </ul>
);

export default Navigation;
