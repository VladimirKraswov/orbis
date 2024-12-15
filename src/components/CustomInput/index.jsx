import PropTypes from "prop-types";
import { styles } from "./styles";
import Box from "../Box";

const CustomInput = ({
  style = {},
  label,
  unit,
  id,
  type = "text",
  min,
  max,
  step,
  value,
  placeholder,
  className = "",
  onChange,
  ...props
}) => {
  return (
    <Box
      style={{ ...styles.container, ...style }}
      fullWidth
      gap="10px"
      justifyContent="space-between"
      alignItems="center"
      className={className}
    >
      {!!label && (
        <label style={styles.formControlLabel} htmlFor={id}>
          {label}
        </label>
      )}

      <Box fullWidth alignItems="center" gap="5px">
        <input
          style={styles.formControlInput}
          type={type}
          id={id}
          min={min}
          max={max}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          {...props}
        />
        {!!unit && <span style={styles.unit}>{unit}</span>}
      </Box>
    </Box>
  );
};

CustomInput.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  unit: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CustomInput;
