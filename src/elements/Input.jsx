import React from 'react';
import PropTypes from 'prop-types';

const Input = props => (
  props.type === 'textarea' ?
    <textarea
      {...props}
      onChange={e => props.onChange && props.onChange(e.target.value)}
      className={props.className ? `${props.className} Textarea` : 'Textarea'}
    /> :
      <input
        {...props}
        onChange={e => props.onChange && props.onChange(e.target.value)}
        className={props.className ? `${props.className} Input` : 'Input'}
      />
);

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

Input.defaultProps = {
  className: null,
  onChange: null,
  type: 'text'
};

export default Input;
