import { useState, useRef, useEffect } from 'preact/hooks';
import PropTypes from 'prop-types';
import styles from './styles';
import './styles.css';

/**
 * A reusable DotMenu component for displaying a dropdown menu with options.
 * @param {Object[]} options - An array of menu options.
 * @param {string} options[].label - The label of the menu option.
 * @param {JSX.Element} options[].icon - The icon for the menu option.
 * @param {function} options[].onClick - The function to call when the option is clicked.
 * @param {Object} style - Custom styles for the menu.
 */
const DotMenu = ({ options, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} style={{ position: 'relative', ...style }}>
      <button style={styles.trigger} onClick={toggleMenu} aria-expanded={isOpen} aria-label="Toggle menu">
        •••
      </button>
      {isOpen && (
        <div style={styles.menu} className="dot-menu">
          {options.map(({ label, icon, onClick }, index) => (
            <div
              key={index}
              className="dot-menu-item"
              onClick={() => {
                onClick();
                setIsOpen(false);
              }}
            >
              {icon && <span style={styles.icon}>{icon}</span>}
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
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
