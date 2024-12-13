const styles = {
  container: {
    backgroundColor: '#2e2e2e',
    padding: '10px 15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    color: '#fff',
    flexDirection: 'column',
    gap: '10px',
  },
  progressBar: {
    width: '100%',
    height: '15px',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#444',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease',
  },
  label: {
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '12px',
    color: '#aaa',
  },
};

export default styles;
