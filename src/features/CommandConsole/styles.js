const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  settingsPanel: {
    padding: '8px',
    background: '#333',
    borderBottom: '1px solid #555',
    display: 'flex',
    alignItems: 'center',
    color: '#ccc',
  },
  label: {
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '4px',
    accentColor: '#007bff',
  },
  clearButton: {
    marginLeft: 'auto',
    padding: '4px 8px',
    background: '#555',
    color: '#fff',
    border: '1px solid #777',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  consoleOutput: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px',
    background: '#222',
    color: '#ccc',
    borderBottom: '1px solid #555',
    fontFamily: 'monospace',
  },
  commandLine: {
    display: 'flex',
    borderTop: '1px solid #555',
    padding: '8px',
    background: '#333',
  },
  input: {
    flex: 1,
    padding: '8px',
    marginRight: '8px',
    background: '#222',
    color: '#ccc',
    border: '1px solid #444',
    borderRadius: '4px',
  },
  sendButton: {
    padding: '8px 16px',
    background: '#555',
    color: '#fff',
    border: '1px solid #777',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  commandItem: {
    margin: '4px 0',
  },
};

export default styles;
