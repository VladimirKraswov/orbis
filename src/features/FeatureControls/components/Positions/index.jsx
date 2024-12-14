import PropTypes from "prop-types";

import { styles } from "./styles";

const PositionRow = ({ id, label, position, onZero }) => (
  <tr>
    <td>
      <button
        style={styles.button}
        id={`zero_${id}_btn`}
        onClick={() => onZero(`${id}0`)}
      >
        Ø
      </button>
    </td>
    <td>
      <span style={styles.label}>
        <span id={`control_${id}_position_label`}>{label}</span>:
        <span id={`control_${id}_position`}>{position}</span>
      </span>
    </td>
    <td></td>
  </tr>
);

const SubPositionRow = ({ id, label, position }) => (
  <tr>
    <td></td>
    <td>
      <table>
        <tbody>
          <tr style={{ height: '5px' }}></tr>
          <tr>
            <td>
              <span style={styles.label}>
                <span id={`control_${id}_position_label`}>{label}</span>:
                <span id={`control_${id}_position`}>{position}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);

const PositionLabels = ({ positions, onZero }) => (
  <div style={styles.positionContainer} id="positions_labels">
    <button
      style={styles.zeroButton}
      onClick={() => onZero('XYZ')}
    >
      Ø<span style={{ fontSize: "12px", marginLeft: "5px" }}>XYZ</span>
    </button>
    {positions.map((position) => (
      <div
        key={position.id}
        style={styles.positionText}
        id={position.displayId || ''}
      >
        <table style={styles.table}>
          <tbody>
            <PositionRow
              id={position.id}
              label={position.label}
              position={position.value}
              onZero={onZero}
            />
            {position.subPosition && (
              <SubPositionRow
                id={position.subPosition.id}
                label={position.subPosition.label}
                position={position.subPosition.value}
              />
            )}
          </tbody>
        </table>
      </div>
    ))}
  </div>
);

PositionLabels.propTypes = {
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      subPosition: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.number.isRequired,
      }),
    })
  ).isRequired,
  onZero: PropTypes.func.isRequired,
};

export default PositionLabels;
