import PropTypes from 'prop-types';
import styles from './styles';
import { useMachine } from '../../providers/machine';

const Status = () => {
  const { info: { status }, unlock } = useMachine();

  const determineStyle = () => {
    if (status.toLowerCase().includes('alarm')) return styles.alarmButton;
    if (status.toLowerCase().includes('home')) return styles.homing;
    return styles.status;
  };

  return (
    <div style={styles.header}>
      {status.toLowerCase().includes('alarm') ? (
        <button
          style={styles.alarmButton}
          onClick={unlock}
        >
          🚨 Alarm! Click to Unlock 🚨
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={determineStyle()}>{status}</div>
        </div>
      )}
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string,
};

export default Status;

