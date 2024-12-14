export const tableStyles = {
  container: {
    maxHeight: '400px',
    overflowY: 'auto',
    border: '1px solid #444',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: '#e0e0e0',
  },
  headerContainer: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#2b2b2b',
    zIndex: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  },
  header: {
    padding: '10px',
    borderBottom: '1px solid #555',
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: '14px',
  },
  row: {
    borderBottom: '1px solid #333',
    backgroundColor: '#1e1e1e',
    transition: 'background-color 0.3s',
  },
  cell: {
    padding: '10px',
    color: '#d0d0d0',
  },
  rowHover: {
    backgroundColor: '#2a2a2a',
  },
};
