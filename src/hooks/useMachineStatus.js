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

function parseMachineParameters(message) {
  try {
    const lines = message.split('\n');
    const parameters = {};

    lines.forEach((line) => {
      const match = line.match(/^\$(\d+)=([\d.]+)/);
      if (match) {
        const [, key, value] = match;
        parameters[`$${key}`] = parseFloat(value);
      }
    });

    return parameters;
  } catch (error) {
    console.error('Error parsing machine parameters:', error);
    return {};
  }
}

function useMachineStatus() {
  const { messages } = useWebSocket();
  const { settings } = useSettings();

  const [status, setStatus] = useState('Unknown');
  const [mPos, setMPos] = useState({ x: 0, y: 0, z: 0 });
  const [wco, setWco] = useState({ x: 0, y: 0, z: 0 });
  const [wPos, setWPos] = useState({ x: 0, y: 0, z: 0 });
  const [feedSpindle, setFeedSpindle] = useState({ feed: 0, spindle: 0 });
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({});
  const [isInitializing, setIsInitializing] = useState(true);
  const [machineParameters, setMachineParameters] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await wait(1000);
        const results = await Promise.allSettled([
          sendHttpCommand('[ESP800]'),
          sendHttpCommand('$G'),
          sendHttpCommand('$SS'),
        ]);

        const [esp800, gCode, ss] = results.map((result) => (result.status === 'fulfilled' ? result.value : null));

        setInitialData({ esp800, gCode, ss });
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
  }, [settings.intervalReport.mode, settings.intervalReport.value, isInitializing]);

  useEffect(() => {
    const latestStatusMessage = [...messages].reverse().find((msg) => msg.startsWith('<'));
    if (latestStatusMessage) {
      try {
        const cleanText = latestStatusMessage.replace(/[<>]/g, '');
        const parts = cleanText.split('|');

        const machineStatus = parts[0] || 'Unknown';
        setStatus(machineStatus);

        const machinePosition = parseCoordinates(parts.find((p) => p.startsWith('MPos:')), 'MPos');
        const workCoordinateOffset = parseCoordinates(parts.find((p) => p.startsWith('WCO:')), 'WCO');

        if (machinePosition && workCoordinateOffset) {
          setWPos({
            x: parseFloat((machinePosition.x + workCoordinateOffset.x).toFixed(3)),
            y: parseFloat((machinePosition.y + workCoordinateOffset.y).toFixed(3)),
            z: parseFloat((machinePosition.z + workCoordinateOffset.z).toFixed(3)),
          });
        }

        setMPos(machinePosition || { x: 0, y: 0, z: 0 });
        setWco(workCoordinateOffset || { x: 0, y: 0, z: 0 });

        const feedSpindlePart = parts.find((p) => p.startsWith('FS:'));
        if (feedSpindlePart) {
          const [feed, spindle] = feedSpindlePart.replace('FS:', '').split(',').map(Number);
          setFeedSpindle({ feed: feed || 0, spindle: spindle || 0 });
        }
      } catch (err) {
        console.error('Error parsing status message:', err);
        setError('Ошибка при парсинге сообщения о статусе');
      }
    }

    const parameterMessage = [...messages].reverse().find((msg) => msg.includes('$130='));
    if (parameterMessage) {
      const parameters = parseMachineParameters(parameterMessage);
      setMachineParameters({
        x: parameters['$130'] || 0,
        y: parameters['$131'] || 0,
        z: parameters['$132'] || 0,
      });
    }
  }, [messages]);

  return { status, mPos, wco, wPos, feedSpindle, initialData, machineParameters, error, isInitializing };
}

export default useMachineStatus;
