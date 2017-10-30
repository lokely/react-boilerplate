import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => (
  <div className={`Alert ${props.type}`}>
    {props.children}
  </div>
);

Alert.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
