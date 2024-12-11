import PropTypes from 'prop-types';

import { styles } from './styles';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <input
        type="checkbox"
        style={styles.input}
        checked={checked}
        // @ts-ignore
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
