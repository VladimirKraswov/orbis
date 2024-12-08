export const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#1e1e1e',
    color: '#cccccc',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(512px, 1fr))',
    gridAutoRows: 'minmax(512px, 1fr)',
    gap: '16px',
    padding: '16px',
    flex: 1,
    overflow: 'auto',
    boxSizing: 'border-box',
  },
  blockContentCentered: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logItem: {
    margin: '4px 0',
    color: '#aaaaaa',
  },
};
