import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const ProgressBar = ({ progress, fileName }) => {
  return (
    <div style={styles.container}>
      <div>
        <strong>File:</strong> {fileName}
      </div>
      <progress style={styles.progressBar} value={progress} max="100"></progress>
      <div style={styles.label}>{progress.toFixed(2)}%</div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default ProgressBar;
