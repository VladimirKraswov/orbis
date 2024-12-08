export const buttonStyles = {
  primary: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
  },
  outlined: {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: '#e9ecef',
    color: '#adb5bd',
    cursor: 'not-allowed',
  },
};

export const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#252526',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  inputContainer: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#ffffff',
  },
  input: {
    marginLeft: '8px',
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  },
  buttonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    justifyItems: 'center',
    alignItems: 'center',
    marginBottom: '16px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '8px',
  },
};
