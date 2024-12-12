export const styles = {
  container: {
    backgroundColor: '#1c1c1e',
    color: '#e0e0e0',
    fontFamily: 'Arial, sans-serif',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  toolbar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  loading: {
    color: '#999',
    fontSize: '14px',
    textAlign: 'center',
  },
  error: {
    color: '#e57373',
    fontSize: '14px',
    textAlign: 'center',
  },
  input: {
    width: 'calc(100% - 20px)', // Учитываем padding модального окна
    padding: '10px',
    margin: '10px 0',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2b2b2b',
    color: '#e0e0e0',
    fontSize: '14px',
    boxSizing: 'border-box', // Гарантирует, что padding и border не выходят за границы
  },
  dialogHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  dialog: {
    maxWidth: '400px',
    width: '90%', // Уменьшаем ширину, чтобы контент всегда умещался
    backgroundColor: '#2b2b2b',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
    margin: '0 auto',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '16px',
  },
};
