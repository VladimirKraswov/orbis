import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './styles';
import { connectWebSocket, sendHttpCommand } from '../../api/apiCommands';

const CommandConsole = ({ apiUrl = '192.168.1.149' }) => {
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const consoleRef = useRef();
  const websocketRef = useRef(null);

  // Автопрокрутка
  useEffect(() => {
    if (isAutoscroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commands, isAutoscroll]);

  // WebSocket подключение
  useEffect(() => {
    websocketRef.current = connectWebSocket(
      apiUrl,
      () => setCommands((prev) => [...prev, 'WebSocket: Connected']),
      (data, isBinary) => {
        if (isBinary) {
          setCommands((prev) => [...prev, data.trim()]);
        } else if (!isIgnoredMessage(data)) {
          setCommands((prev) => [...prev, data.trim()]);
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

  // Фильтрация ненужных сообщений
  const isIgnoredMessage = (data) => {
    const ignoredMessages = ['PING:', 'CURRENT_ID:', 'ACTIVE_ID:'];
    return ignoredMessages.some((msg) => data.startsWith(msg));
  };

  // Отправка команды через HTTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      try {
        const response = await sendHttpCommand(apiUrl, currentCommand);
        setCommands((prev) => [
          ...prev,
          `HTTP Sent: ${currentCommand}`,
          `Response: ${response}`,
        ]);
      } catch (error) {
        setCommands((prev) => [...prev, `HTTP Error: ${error.message}`]);
      }
      setCurrentCommand('');
    }
  };

  const handleClear = () => {
    setCommands([]);
  };

  return (
    <div style={styles.container}>
      {/* Верхняя панель настроек */}
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

      {/* Область вывода команд */}
      <div ref={consoleRef} style={styles.consoleOutput}>
        {commands.map((cmd, index) => (
          <div key={index} style={styles.commandItem}>
            {cmd}
          </div>
        ))}
      </div>

      {/* Форма отправки команды */}
      <form onSubmit={handleSubmit} style={styles.commandLine}>
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
