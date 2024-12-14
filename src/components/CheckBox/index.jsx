import PropTypes from 'prop-types';

import { styles } from './styles';

const Checkbox = ({ style = {}, label = '', checked, onChange }) => {
  return (
    <div style={{ ...styles.container, ...style}}>
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
  style: PropTypes.object,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
