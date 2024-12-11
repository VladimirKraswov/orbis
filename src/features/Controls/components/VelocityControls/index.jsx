import PropTypes from "prop-types";

import { CustomInput } from "../../../../components";
import { styles } from "./styles";

export const VelocityControls = ({xyVelocity, zVelocity, onXYVelocityChange, onZVelocityChange }) => {
  return (
    <div style={styles.container}>
      {/* Управление скоростью XY */}
      <CustomInput
        label="XY:"
        unit="mm/min"
        id="control_xy_velocity"
        min="1"
        value={xyVelocity}
        onChange={onXYVelocityChange}
      />
      
      {/* Управление скоростью Z */}
      <CustomInput
        label="Z:"
        unit="mm/min"
        id="control_z_velocity"
        min="1"
        value={zVelocity}
        onChange={onZVelocityChange}
      />
    </div>
  );
};

VelocityControls.propTypes = {
  xyVelocity: PropTypes.number.isRequired,
  zVelocity: PropTypes.number.isRequired,
  onXYVelocityChange: PropTypes.func.isRequired,
  onZVelocityChange: PropTypes.func.isRequired,
};
