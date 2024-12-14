export const styles = {
  container: {
    flex: 1,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  tooltipStyle: {
    visibility: 'hidden',
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    padding: '5px',
    fontSize: '12px',
    position: 'absolute',
    zIndex: 999,
    bottom: '-40px',
    left: '50%',
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
    opacity: 0,
    transition: 'opacity 0.2s'
  },
  toolbarStyles: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      background: '#333',
      borderBottom: '1px solid #444',
      padding: '5px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      zIndex: 10,
      boxSizing: 'border-box',
      justifyContent: 'flex-start'
    },
    buttonWrapperStyle: {
      position: 'relative',
      display: 'inline-block'
    },
    iconButtonStyle: {
      width: '32px',
      height: '32px',
      background: '#555',
      border: 'none',
      borderRadius: '4px',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '18px',
      lineHeight: '32px',
      textAlign: 'center',
      padding: 0,
      position: 'relative',
    },
    buttonWrapperHoverStyle: {
      position: 'relative',
      display: 'inline-block'
    },
};