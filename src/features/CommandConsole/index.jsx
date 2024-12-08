import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './styles';
import { connectWebSocket, sendHttpCommand } from '../../api/apiCommands';

const CommandConsole = ({ apiUrl = '192.168.1.149' }) => {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const [isSendingGcode, setIsSendingGcode] = useState(false);
  const consoleRef = useRef();
  const websocketRef = useRef(null);
  const pendingResolveRef = useRef(null); // Для хранения текущего промиса ожидания "ok"

  // Автопрокрутка
  useEffect(() => {
    if (isAutoscroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commands, isAutoscroll]);

  // Подключение WebSocket
  useEffect(() => {
    websocketRef.current = connectWebSocket(
      () => setCommands((prev) => [...prev, 'WebSocket: Connected']),
      (data) => {
        const trimmedData = data.trim();
        if (trimmedData === 'ok') {
          if (pendingResolveRef.current) {
            pendingResolveRef.current();
            pendingResolveRef.current = null;
          }
        } else {
          setCommands((prev) => [...prev, trimmedData]);
        }
      },
      (error) => setCommands((prev) => [...prev, `WebSocket: Error: ${error}`]),
      () => setCommands((prev) => [...prev, 'WebSocket: Disconnected'])
    );

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, [apiUrl]);

  // Загрузка G-code файла
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const content = await file.text();
      setFileContent(content);
      setCommands((prev) => [...prev, `File loaded: ${file.name}`]);
    }
  };

  // Отправка строки G-code с ожиданием "ok"
  const sendGcodeLineWithConfirmation = async (line) => {
    return new Promise((resolve, reject) => {
      // Убедимся, что строка не пустая
      if (!line.trim()) {
        reject(new Error('Empty G-code line'));
        return;
      }
  
      pendingResolveRef.current = resolve;
  
      sendHttpCommand(line)
        .then((response) => {
          setCommands((prev) => [...prev, `HTTP Sent: ${line}`, `Response: ${response}`]);
          // Если сервер возвращает ошибку, обработайте её
          if (response.includes('error') || response.includes('[MSG:ERR')) {
            pendingResolveRef.current = null;
            reject(new Error(`Server error: ${response}`));
          }
        })
        .catch((error) => {
          pendingResolveRef.current = null;
          reject(error);
        });
    });
  };
  
  const handleStartGcode = async () => {
    if (!fileContent) {
      setCommands((prev) => [...prev, 'No G-code file loaded.']);
      return;
    }
  
    setIsSendingGcode(true);
    
    const lines = fileContent.split('\n').map((line) => line.trim()).filter((line) => line);
    console.log('G-code lines:', lines);
    
  
    for (const line of lines) {
      try {
        await sendGcodeLineWithConfirmation(line);
        setCommands((prev) => [...prev, `Sent: ${line}`]);
      } catch (error) {
        setCommands((prev) => [...prev, `Error: ${error.message}`]);
        break;
      }
    }
  
    setIsSendingGcode(false);
    setCommands((prev) => [...prev, 'G-code sending completed.']);
  };
  
  

  const handleStopGcode = () => {
    setIsSendingGcode(false);
  };

  const handleClear = () => {
    setCommands([]);
  };

  return (
    <div style={styles.container}>
      {/* Верхняя панель */}
      <div style={styles.settingsPanel}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={isAutoscroll}
            onChange={(e) => setIsAutoscroll(e.target.checked)}
            style={styles.checkbox}
          />
          Autoscroll
        </label>
        <button onClick={handleClear} style={styles.clearButton}>
          Clear
        </button>
      </div>

      {/* Управление G-code */}
      <div style={styles.gcodeControls}>
        <input type="file" accept=".gcode,.txt,.nc" onChange={handleFileChange} style={styles.fileInput} />
        <button onClick={handleStartGcode} disabled={isSendingGcode || !fileContent} style={styles.startButton}>
          {isSendingGcode ? 'Sending...' : 'Start G-code'}
        </button>
        {isSendingGcode && (
          <button onClick={handleStopGcode} style={styles.stopButton}>
            Stop
          </button>
        )}
      </div>

      {/* Область вывода */}
      <div ref={consoleRef} style={styles.consoleOutput}>
        {commands.map((cmd, index) => (
          <div key={index} style={styles.commandItem}>
            {cmd}
          </div>
        ))}
      </div>

      {/* Отправка команды */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await sendHttpCommand(currentCommand);
            setCommands((prev) => [...prev, `HTTP Sent: ${currentCommand}`]);
          } catch (error) {
            setCommands((prev) => [...prev, `HTTP Error: ${error.message}`]);
          }
          setCurrentCommand('');
        }}
        style={styles.commandLine}
      >
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          placeholder="Send Command..."
          style={styles.input}
        />
        <button type="submit" style={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default CommandConsole;
