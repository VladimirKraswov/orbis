import PropTypes from "prop-types";
import { styles } from "./styles";

const CustomInput = ({ label, unit, id, min, value, onChange }) => {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.formControlLabel} htmlFor={id}>
        {label}
      </label>
      <input
        style={styles.formControlInput}
        type="number"
        id={id}
        min={min}
        value={value}
        // @ts-ignore
        onChange={(e) => onChange(e.target.value)}
      />
      <span style={styles.inputLabelUnit}>{unit}</span>
    </div>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomInput;