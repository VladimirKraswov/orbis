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
    background: 'linear-gradient(145deg, #d32f2f, #b71c1c)', // Градиент с теплым красным
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '50%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
  },
  closeButtonHover: {
    background: 'linear-gradient(145deg, #b71c1c, #d32f2f)', // Градиент при наведении
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  },
  closeButtonActive: {
    background: 'linear-gradient(145deg, #b71c1c, #8e0000)', // Градиент при нажатии
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.5)',
  },
  content: {
    marginTop: '20px',
  },
};
