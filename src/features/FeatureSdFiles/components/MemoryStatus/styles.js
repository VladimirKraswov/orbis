export const styles = {
  container: {
    fullWidth: true,
    padding: '0.8rem',
    backgroundColor: 'var(--color-background-dark)',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    background: 'linear-gradient(145deg, #2b2b2b, #1f1f1f)',
  },
  infoRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    fontWeight: '500',
    gap: '0.5rem',
    display: 'flex',
    color: '#ffffff',
  },
  occupation: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#ffffff'
  },
  occupationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.5rem',
  },
  meter: {
    width: '150px',
    height: '8px',
    border: '1px solid #555',
    borderRadius: '4px',
    overflow: 'hidden',
    background: '#3a3a3a',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
  },
  occupationText: (occupation) => ({
    fontWeight: 'bold',
    color: occupation > 90 ? '#e74c3c' : occupation > 70 ? '#f1c40f' : '#2ecc71',
    fontSize: '0.85rem',
  }),
};
