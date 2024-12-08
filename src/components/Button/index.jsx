const Button = ({ style = {}, children, onClick, type = 'primary', disabled = false }) => {

  return (
    <button
      className={`button ${type} ${disabled ? 'disabled' : ''}`}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
