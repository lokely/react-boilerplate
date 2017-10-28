import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import pages from './pages';
import RouteWrapper from './elements/RouteWrapper';
import Navigation from './elements/Navigation';

const App = props => (
  <props.router context={{}} location={props.location}>
    <div className="Container">
      <Navigation {...props} />
      <div className="Content">
        <Switch>
          { pages
            .map(route => (
              <Route
                key={route.path || 'notfound'}
                path={route.path}
                exact={route.exact}
              >
                <RouteWrapper preload={route.preload} {...route} {...props}>
                  <route.component {...props} />
                </RouteWrapper>
              </Route>
            ))
          }
        </Switch>
      </div>
    </div>
  </props.router>
);

App.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string.isRequired
  })
};

export default App;
