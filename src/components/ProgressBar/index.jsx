import PropTypes from 'prop-types';
import styles from './styles';

const ProgressBar = ({ style = {}, progress = 0, description = '' }) => {
  const progressValue = Math.min(Math.max(progress, 0), 100);

  return (
    <div style={{...styles.container, ...style}}>
      {description && (
        <div style={styles.description}>{description}</div>
      )}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progressValue}%` }} />
      </div>
      <div style={styles.label}>{progressValue.toFixed(2)}%</div>
    </div>
  );
};

ProgressBar.propTypes = {
  style: PropTypes.object,
  progress: PropTypes.number,
  description: PropTypes.string,
};

ProgressBar.defaultProps = {
  style: {},
  progress: 0,
  description: '',
};

export default ProgressBar;
