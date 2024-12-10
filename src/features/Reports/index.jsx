import React from 'react';
import useMachineStatus from '../../hooks/useMachineStatus';

const Reports = () => {
  const { status, mPos, feedSpindle, error } = useMachineStatus();

  return (
    <div style={{ fontFamily: 'sans-serif', margin: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Мониторинг Станка</h2>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {!error && !status && (
        <div style={{ fontStyle: 'italic' }}>Загрузка данных...</div>
      )}

      {status && (
        <table 
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            maxWidth: '400px',
            marginBottom: '20px',
            border: '1px solid #ccc'
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Параметр</th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Статус</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{status}</td>
            </tr>
            {mPos && (
              <>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>X</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mPos.x.toFixed(3)}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>Y</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mPos.y.toFixed(3)}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>Z</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{mPos.z.toFixed(3)}</td>
                </tr>
              </>
            )}
            {feedSpindle && (
              <>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>Feed</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{feedSpindle.feed}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>Spindle</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{feedSpindle.spindle}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
