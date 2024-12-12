import { useState, useEffect } from 'react';
import { sendHttpCommand } from '../../api/apiCommands';
import { useWebSocket } from '../../providers/WebSocketContext';
import IntervalReportSettings from './components/IntervalReport';
import ProgressBar from './components/ProgressBar';
import Status from './components/Status';
import styles from './styles';

const Reports = () => {
  const { messages } = useWebSocket();
  const [status, setStatus] = useState('Idle');
  const [isAlarm, setIsAlarm] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const latestStatusMessage = [...messages].reverse().find((msg) => msg.startsWith('<'));
    if (latestStatusMessage) {
      try {
        const cleanText = latestStatusMessage.replace(/[<>]/g, '');
        const parts = cleanText.split('|');
        const machineStatus = parts[0] || 'Unknown';

        setStatus(machineStatus);
        setIsAlarm(machineStatus.toLowerCase().includes('alarm'));

        if (latestStatusMessage.includes('Run')) {
          const sdPart = parts.find((part) => part.startsWith('SD:'));
          if (sdPart) {
            const [progressValue, file] = sdPart.replace('SD:', '').split(',');
            setProgress(Math.min(parseFloat(progressValue), 100)); // Обеспечиваем нормализацию до 100%
            setFileName(file || 'Unknown');
          }
        } else if (machineStatus === 'Idle') {
          setProgress(null);
          setFileName('');
        }
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
    <div style={styles.container}>
      {isAlarm ? (
        <button
          onClick={handleUnlock}
          style={styles.alarmButton}
        >
          🚨 Alarm! Click to Unlock
        </button>
      ) : (
        <Status status={status} />
      )}

      {progress !== null && (
        <ProgressBar progress={progress} fileName={fileName} />
      )}

      <div style={styles.reportContainer}>
        <IntervalReportSettings />
      </div>
    </div>
  );
};

export default Reports;
