import PropTypes from 'prop-types';
import { Box } from '../../../../components';
import { styles } from './styles';

const MemoryStatus = ({ total, used, occupation }) => {
  const parsedTotal = parseFloat(total);
  const parsedUsed = parseFloat(used);
  const free = parsedTotal - parsedUsed;

  return (
    <Box
      fullWidth
      padding={styles.container.padding}
      backgroundColor={styles.container.backgroundColor}
      borderRadius={styles.container.borderRadius}
      style={{
        ...styles.container,
      }}
    >
      <Box style={styles.infoRow}>
        <span>
          <strong>Total:</strong> {parsedTotal.toFixed(2)} MB
        </span>
        <span>|</span>
        <span>
          <strong>Used:</strong> {parsedUsed.toFixed(2)} MB
        </span>
        <span>|</span>
        <span>
          <strong>Free:</strong> {free.toFixed(2)} MB
        </span>
      </Box>

      <Box style={styles.occupationRow}>
        <span style={styles.occupation}>
          <strong>Occupation:</strong>
        </span>
        <meter
          value={occupation}
          min="0"
          max="100"
          high="90"
          style={styles.meter}
        ></meter>
        <span style={styles.occupationText(occupation)}>{occupation}</span>
      </Box>
    </Box>
  );
};

MemoryStatus.propTypes = {
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  used: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  occupation: PropTypes.number.isRequired,
};

export default MemoryStatus;
