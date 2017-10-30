import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  <button
    {...props}
    className={`${props.className} Button ${props.size}`}
  >
    {props.children}
  </button>
);

Input.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.string.isRequired
};

Input.defaultProps = {
  className: '',
  size: 'md'
};

export default Input;
