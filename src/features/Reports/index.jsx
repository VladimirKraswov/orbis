import { useState, useEffect } from 'react';
import { sendHttpCommand } from '../../api/apiCommands';
import { useWebSocket } from '../../providers/WebSocketContext';
import IntervalReportSettings from './components/IntervalReport';

const Reports = () => {
  const { messages } = useWebSocket();
  const [status, setStatus] = useState('Idle');
  const [isAlarm, setIsAlarm] = useState(false);

  useEffect(() => {
    const latestStatusMessage = [...messages].reverse().find((msg) => msg.startsWith('<'));
    if (latestStatusMessage) {
      try {
        const cleanText = latestStatusMessage.replace(/[<>]/g, '');
        const parts = cleanText.split('|');
        const machineStatus = parts[0] || 'Unknown';

        setStatus(machineStatus);
        setIsAlarm(machineStatus.toLowerCase().includes('alarm'));
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    }
  }, [messages]);

  const handleUnlock = async () => {
    try {
      await sendHttpCommand('$X');
      console.log('Machine unlocked');
    } catch (error) {
      console.error('Failed to unlock the machine:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        color: '#fff',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      {isAlarm ? (
        <button
          onClick={handleUnlock}
          title="Нажмите, чтобы разблокировать тревогу"
          style={{
            padding: '15px 40px',
            backgroundColor: '#ff4c4c',
            color: '#fff',
            border: '2px solid #d32f2f',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '18px',
            textTransform: 'uppercase',
            boxShadow: '0 6px 20px rgba(255, 76, 76, 0.7)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          🚨 Alarm! Click to Unlock
        </button>
      ) : (
        <div
          title="Текущий статус системы"
          style={{
            padding: '15px 30px',
            backgroundColor: '#4caf50',
            color: '#fff',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.6)',
          }}
        >
          ✅ {status}
        </div>
      )}

      <div
        style={{
          width: '100%',
          backgroundColor: '#2e2e2e',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <IntervalReportSettings />
      </div>
    </div>
  );
};

export default Reports;
