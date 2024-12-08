

const Button = ({ children, onClick, type = 'primary', disabled = false }) => {
  return (
    <button
      className={`button ${type} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
