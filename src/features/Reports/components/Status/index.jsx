import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Status = ({ status }) => {
  return (
    <div style={styles.status} title="Текущий статус системы">
      ✅ {status}
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Status;
