import PropTypes from "prop-types";

import { Box, CustomInput } from "../../../../components";
import { styles } from "./styles";

export const VelocityControls = ({xyVelocity, zVelocity, onXYVelocityChange, onZVelocityChange }) => {
  return (
    <Box style={styles.container} width={200} height={120} column alignItems="center" gap="15px" pd="20px">
      <span style={styles.inputLabelUnit}>mm/min</span>
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
    </Box>
  );
};

VelocityControls.propTypes = {
  xyVelocity: PropTypes.number.isRequired,
  zVelocity: PropTypes.number.isRequired,
  onXYVelocityChange: PropTypes.func.isRequired,
  onZVelocityChange: PropTypes.func.isRequired,
};
