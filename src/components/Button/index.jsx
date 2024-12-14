import PropTypes from 'prop-types';
import './styles.css';

const Button = ({ variant = 'primary', className = '', ...props }) => {
  return (
    <button
      className={`button button--${variant} ${props.disabled ? 'button--disabled' : ''} ${className}`.trim()}
      {...props}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outlined']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'primary',
  className: '',
  disabled: false,
};

export default Button;
