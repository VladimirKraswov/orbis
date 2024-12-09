export const styles = {
  positionContainer: {
    display: 'flex',
    width: 560,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: '15px',
    backgroundColor: 'var(--color-gradient-start)',
    borderRadius: '8px',
    boxShadow: "5px 5px 10px var(--color-shadow-primary), -5px -5px 10px var(--color-shadow-secondary)",
    color: 'var(--color-text)',
    marginTop: '10px',
  },
  positionText: {

  },
  label: {
    padding: '5px 8px',
    width: '100px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '4px',
    display: 'inline-block',
    fontWeight: 'bold',
    color: 'var(--color-text)',
  },
  button: {
    display: 'initial',
    background: 'linear-gradient(145deg, var(--color-gradient-start), var(--color-gradient-end))',
    border: '1px solid var(--color-border)',
    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
    color: 'var(--color-text)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '5px 5px 10px var(--color-shadow-primary), -5px -5px 10px var(--color-shadow-secondary)',
  },
  buttonHover: {
    background: 'linear-gradient(145deg, var(--color-gradient-hover-start), var(--color-gradient-hover-end))',
    boxShadow: '5px 5px 15px var(--color-shadow-hover), -5px -5px 15px var(--color-shadow-primary)',
  },
  table: {
    width: '100%',
    borderSpacing: '0',
    color: 'var(--color-text)',
  },
  zeroButton: {
    marginTop: "15px",
    padding: "8px 15px",
    background: "linear-gradient(145deg, var(--color-gradient-start), var(--color-gradient-end))",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    color: "var(--color-text)",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "5px 5px 10px var(--color-shadow-primary), -5px -5px 10px var(--color-shadow-secondary)",
    transition: "all 0.3s ease",
  },
};