import { useEffect, useState } from 'react';
import { useWebSocket } from '../providers/WebSocketContext';
import { sendHttpCommand } from '../api/apiCommands';

function useMachineStatus() {
  const { messages } = useWebSocket();
  const [status, setStatus] = useState(null);
  const [mPos, setMPos] = useState(null);
  const [feedSpindle, setFeedSpindle] = useState(null);
  const [error, setError] = useState(null);

  // Раз в секунду отправляем команду запроса статуса
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await sendHttpCommand('?');
      } catch (err) {
        console.error('Error sending http command:', err);
        setError('Не удалось отправить команду');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // При обновлении сообщений в WebSocket ищем последнее статусное сообщение
  useEffect(() => {
    const latestStatusMessage = [...messages].reverse().find(msg => msg.startsWith('<'));
    if (latestStatusMessage) {
      try {
        const cleanText = latestStatusMessage.replace(/[<>]/g, '');
        // Пример: "Idle|MPos:0.000,0.000,0.000|FS:0,0"
        const parts = cleanText.split('|');
        
        const machineStatus = parts[0] || 'Unknown';
        let position = null;
        let fs = null;

        // Парсим координаты
        const mPosPart = parts.find(p => p.startsWith('MPos:'));
        if (mPosPart) {
          const coords = mPosPart.replace('MPos:', '').split(',');
          position = {
            x: parseFloat(coords[0]),
            y: parseFloat(coords[1]),
            z: parseFloat(coords[2]),
          };
        }

        // Парсим Feed & Spindle
        const fsPart = parts.find(p => p.startsWith('FS:'));
        if (fsPart) {
          const fsVals = fsPart.replace('FS:', '').split(',');
          fs = {
            feed: parseFloat(fsVals[0]),
            spindle: parseFloat(fsVals[1])
          };
        }

        setStatus(machineStatus);
        setMPos(position);
        setFeedSpindle(fs);
        setError(null);
      } catch (err) {
        console.error('Error parsing status message:', err);
        setError('Ошибка при парсинге сообщения о статусе');
      }
    }
  }, [messages]);

  return { status, mPos, feedSpindle, error };
}

export default useMachineStatus;
