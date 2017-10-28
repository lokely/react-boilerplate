import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CancelToken } from 'axios';

class RouteWrapper extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.match) !== JSON.stringify(nextProps.match)) {
      this.fetchData();
    }
  }

  async fetchData() {
    if (typeof document !== 'undefined' && this.props.title) {
      /*global document*/
      document.title = this.props.title;
    }
    if (this.props.preload) {
      try {
        const data = this.props.preload(this.props.match, {
          cancelToken: new CancelToken((c) => { this.cancelPreload = c; })
        });
        this.setState({ data });
      } catch(error) {
        this.setState({ data: { error } });
      }
    }
  }

  componentWillUnmount() {
    if (this.cancelPreload) {
      this.cancelPreload();
    }
  }

  render() {
    const { children } = this.props;
    const childState = Object.assign({}, this.props, this.state.data);
    return (
      <div className="Route">
        {childState.error &&
          <div className="Error">Error: {childState.error}</div>
        }
        {React.cloneElement(children, childState)}
      </div>
    );
  }
}

RouteWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  match: PropTypes.object.isRequired,
  preload: PropTypes.func
};
RouteWrapper.defaultProps = {
  title: '',
  preload: null
};

export default withRouter(RouteWrapper);
