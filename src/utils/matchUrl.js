import { matchPath } from 'react-router-dom';
import pages from '../pages';

const matchUrl = url => (
  pages.reduce(
    (acc, route) => {
      const m = matchPath(url, route);
      if (
        m && (m.isExact || route.exact === false)
      ) {
        const meta = pages.find(p => p.path === m.path);
        return Object.assign({}, m, meta) || acc;
      }
      return acc;
    },
    null,
  )
);

export default matchUrl;
