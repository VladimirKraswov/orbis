import { useEffect, useState } from 'react';
import { useWebSocket } from '../providers/WebSocketContext';
import { sendHttpCommand } from '../api/apiCommands';
import { useSettings } from '../providers/Settings';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseCoordinates(part, prefix) {
  if (!part || !part.startsWith(prefix)) return null;
  try {
    const coords = part.replace(`${prefix}:`, '').split(',');
    return {
      x: parseFloat(coords[0]) || 0,
      y: parseFloat(coords[1]) || 0,
      z: parseFloat(coords[2]) || 0,
    };
  } catch (err) {
    console.error(`Error parsing coordinates for prefix ${prefix}:`, err);
    return null;
  }
}

function useMachineStatus() {
  const { messages } = useWebSocket();
  const { settings } = useSettings(); // Подключение настроек
  const [status, setStatus] = useState('Unknown');
  const [mPos, setMPos] = useState({ x: 0, y: 0, z: 0 });
  const [wco, setWco] = useState({ x: 0, y: 0, z: 0 }); // Рабочее смещение (WCO)
  const [wPos, setWPos] = useState({ x: 0, y: 0, z: 0 }); // Рабочие координаты (WPos)
  const [feedSpindle, setFeedSpindle] = useState({ feed: 0, spindle: 0 });
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({});
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await wait(1000);
        const results = await Promise.allSettled([
          sendHttpCommand('[ESP800]'),
          // fetch('http://192.168.1.149/preferences2.json').then(res => res.json()),
          // fetch('http://192.168.1.149/macrocfg.json').then(res => res.json()),
          sendHttpCommand('$G'),
          sendHttpCommand('$/axes/x/homing/mpos_mm'),
          sendHttpCommand('$/axes/x/homing/positive_direction'),
          sendHttpCommand('$/axes/x/max_travel_mm'),
          sendHttpCommand('$/axes/y/homing/mpos_mm'),
          sendHttpCommand('$/axes/y/homing/positive_direction'),
          sendHttpCommand('$/axes/y/max_travel_mm'),
          // sendHttpCommand('[ESP400]'),
          sendHttpCommand('$SS'),
        ]);
  
        const [
          esp800,
          // preferences,
          // macrocfg,
          gCode,
          xHomingMpos,
          xHomingDirection,
          xMaxTravel,
          yHomingMpos,
          yHomingDirection,
          yMaxTravel,
          esp400,
          ss,
        ] = results.map(result => (result.status === 'fulfilled' ? result.value : null));
  
        setInitialData({
          esp800,
          // preferences,
          // macrocfg,
          gCode,
          xHomingMpos,
          xHomingDirection,
          xMaxTravel,
          yHomingMpos,
          yHomingDirection,
          yMaxTravel,
          esp400,
          ss,
        });
      } catch (err) {
        console.error('Error in fetchInitialData:', err);
      } finally {
        setTimeout(() => setIsInitializing(false), 1000);
      }
    };
  
    fetchInitialData();
  }, []);
  

  useEffect(() => {
    let intervalId;

    const applySettings = async () => {
      const mode = settings.intervalReport.mode;
      const autoInterval = settings.intervalReport.value || 1000;
      const pullInterval = 1000;

      try {
        if (mode === 'disabled') {
          await sendHttpCommand('$Report/Interval=0');
          console.log('Reports disabled.');
        } else if (mode === 'auto') {
          await sendHttpCommand(`$Report/Interval=${autoInterval}`);
          console.log(`Auto report set to ${autoInterval} ms.`);
        } else if (mode === 'poll') {
          await sendHttpCommand('$Report/Interval=0');
          console.log('Polling mode enabled.');
          intervalId = setInterval(async () => {
            try {
              await sendHttpCommand('?');
            } catch (err) {
              console.error('Error during polling:', err);
              setError('Не удалось отправить команду');
            }
          }, pullInterval);
        }
      } catch (err) {
        console.error('Error applying settings:', err);
      }
    };

    if (!isInitializing) {
      applySettings();
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [settings.intervalReport.mode, settings.intervalReport.value, isInitializing]); // Добавляем isInitializing в зависимости

  useEffect(() => {
    console.log('Message', messages);
    
    const latestStatusMessage = [...messages].reverse().find(msg => msg.startsWith('<'));
    if (!latestStatusMessage) return;

    try {
      const cleanText = latestStatusMessage.replace(/[<>]/g, '');
      const parts = cleanText.split('|');

      // Обработка статуса машины
      const machineStatus = parts[0] || 'Unknown';
      setStatus(machineStatus);

      // Парсинг координат
      const machinePosition = parseCoordinates(parts.find(p => p.startsWith('MPos:')), 'MPos');
      const workCoordinateOffset = parseCoordinates(parts.find(p => p.startsWith('WCO:')), 'WCO');

      // Вычисление рабочих координат
      if (machinePosition && workCoordinateOffset) {
        setWPos({
          x: parseFloat((machinePosition.x + workCoordinateOffset.x).toFixed(3)),
          y: parseFloat((machinePosition.y + workCoordinateOffset.y).toFixed(3)),
          z: parseFloat((machinePosition.z + workCoordinateOffset.z).toFixed(3)),
        });
      }

      setMPos(machinePosition || { x: 0, y: 0, z: 0 });
      setWco(workCoordinateOffset || { x: 0, y: 0, z: 0 });

      // Парсинг Feed и Spindle
      const feedSpindlePart = parts.find(p => p.startsWith('FS:'));
      if (feedSpindlePart) {
        const [feed, spindle] = feedSpindlePart.replace('FS:', '').split(',').map(Number);
        setFeedSpindle({ feed: feed || 0, spindle: spindle || 0 });
      }
    } catch (err) {
      console.error('Error parsing status message:', err);
      setError('Ошибка при парсинге сообщения о статусе');
    }
  }, [messages]);

  return { status, mPos, wco, wPos, feedSpindle, initialData, error, isInitializing };
}

export default useMachineStatus;