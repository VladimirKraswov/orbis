const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  settingsPanel: {
    display: 'flex',
    alignItems: 'center',
  },
  clearButton: {
    marginLeft: '10px',
  },
  consoleOutput: {
    flex: 1,
    display: 'flex',
    overflowY: 'auto',
    padding: '8px',
    background: '#1e1e1e',
    color: '#ffffff',
    borderBottom: '1px solid #444',
    fontFamily: 'monospace',
  },
  commandLine: {
    flexShrink: 0,
    display: 'flex',
    borderTop: '1px solid #444',
    padding: '8px',
    background: '#2b2b2b',
  },
  input: {
    flex: 1,
    padding: '8px',
    marginRight: '8px',
    background: '#1e1e1e',
    color: '#ffffff',
    border: '1px solid #555',
    borderRadius: '4px',
  },
  sendButton: {
    padding: '8px 16px',
    background: '#444',
    color: '#ffffff',
    border: '1px solid #555',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  commandItem: {
    margin: '4px 0',
    fontSize: '14px',
    color: '#ffffff',
  },
};

export default styles;


