import { useEffect, useState } from 'react';
import { useWebSocket } from '../providers/WebSocketContext';
import { sendHttpCommand } from '../api/apiCommands';

function useMachineStatus() {
  const { messages } = useWebSocket();
  const [status, setStatus] = useState(null);
  const [mPos, setMPos] = useState(null);
  const [wco, setWco] = useState(null); // Рабочее смещение (WCO)
  const [wPos, setWPos] = useState(null); // Рабочие координаты (WPos)
  const [feedSpindle, setFeedSpindle] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const latestStatusMessage = [...messages].reverse().find(msg => msg.startsWith('<'));
    if (latestStatusMessage) {
      try {
        const cleanText = latestStatusMessage.replace(/[<>]/g, '');
        const parts = cleanText.split('|');
        
        const machineStatus = parts[0] || 'Unknown';
        let machinePosition = null;
        let workCoordinateOffset = null;
        let workPosition = null;
        let feedSpindle = null;

        // Парсим машинные координаты (MPos)
        const mPosPart = parts.find(p => p.startsWith('MPos:'));
        if (mPosPart) {
          const coords = mPosPart.replace('MPos:', '').split(',');
          machinePosition = {
            x: parseFloat(coords[0]),
            y: parseFloat(coords[1]),
            z: parseFloat(coords[2]),
          };
        }

        // Парсим рабочее смещение (WCO)
        const wcoPart = parts.find(p => p.startsWith('WCO:'));
        if (wcoPart) {
          const coords = wcoPart.replace('WCO:', '').split(',');
          workCoordinateOffset = {
            x: parseFloat(coords[0]),
            y: parseFloat(coords[1]),
            z: parseFloat(coords[2]),
          };
        }

        // Рассчитываем рабочие координаты (WPos)
        if (machinePosition && workCoordinateOffset) {
          workPosition = {
            x: machinePosition.x + workCoordinateOffset.x,
            y: machinePosition.y + workCoordinateOffset.y,
            z: machinePosition.z + workCoordinateOffset.z,
          };
        }

        // Парсим Feed & Spindle
        const fsPart = parts.find(p => p.startsWith('FS:'));
        if (fsPart) {
          const fsVals = fsPart.replace('FS:', '').split(',');
          feedSpindle = {
            feed: parseFloat(fsVals[0]),
            spindle: parseFloat(fsVals[1])
          };
        }

        setStatus(machineStatus);
        setMPos(machinePosition);
        setWco(workCoordinateOffset);
        setWPos(workPosition); // Сохраняем рабочие координаты
        setFeedSpindle(feedSpindle);
        setError(null);
      } catch (err) {
        console.error('Error parsing status message:', err);
        setError('Ошибка при парсинге сообщения о статусе');
      }
    }
  }, [messages]);

  return { status, mPos, wco, wPos, feedSpindle, error };
}

export default useMachineStatus;
