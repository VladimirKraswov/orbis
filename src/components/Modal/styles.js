export const modalStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#2e2e2e',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    color: '#f4f4f4',
  },
  closeButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#f4f4f4',
  },
  content: {
    marginTop: '20px',
  },
};