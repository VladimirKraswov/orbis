const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  settingsPanel: {
    padding: '8px',
    background: '#2b2b2b',
    borderBottom: '1px solid #444',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff', // Светлый текст
  },
  label: {
    marginRight: '16px',
    display: 'flex',
    alignItems: 'center',
    color: '#ffffff', // Белый текст
  },
  checkbox: {
    marginRight: '4px',
    accentColor: '#ffffff', // Светлый синий
  },
  clearButton: {
    marginLeft: 'auto',
    padding: '4px 8px',
    background: '#444',
    color: '#ffffff', // Светлый текст
    border: '1px solid #555',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  consoleOutput: {
    flex: 1,
    overflowY: 'auto',
    padding: '8px',
    background: '#1e1e1e', // Темный фон
    color: '#ffffff',
    borderBottom: '1px solid #444',
    fontFamily: 'monospace',
  },
  commandLine: {
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
