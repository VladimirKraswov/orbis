import { useState, useRef, useEffect } from 'preact/hooks';
import PropTypes from 'prop-types';
import './styles.css';
import Box from '../Box';

const DotMenu = ({ options, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (onClick, e) => {
    e.stopPropagation();
    onClick();
    setIsOpen(false);
  };

  return (
    <Box ref={menuRef} style={{ position: 'relative', ...style }} className="dot-menu-container">
      <button
        className="dot-menu-trigger"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        •••
      </button>
      {isOpen && (
        <Box column className="dot-menu" backgroundColor="#1e1e1e" pd="0.1rem" border="1px solid #444" br="8px" boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)">
          {options.map(({ label, icon, onClick }, index) => (
            <Box
              key={label}
              className="dot-menu-item"
              alignItems="center"
              gap="0.5rem"
              onClick={(e) => handleOptionClick(onClick, e)}
            >
              {icon && <Box className="dot-menu-icon">{icon}</Box>}
              <span className="dot-menu-label">{label}</span>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

DotMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  style: PropTypes.object,
};

DotMenu.defaultProps = {
  style: {},
};

export default DotMenu;
