import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './styles';
import { sendHttpCommand } from '../../api/apiCommands';
import { useWebSocket } from '../../providers/WebSocketContext';
import useMachineStatus from '../../hooks/useMachineStatus';

const CommandConsole = () => {
  const { messages } = useWebSocket();
  const { initialData } = useMachineStatus(); // Подключение к данным инициализации
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const consoleRef = useRef(null);

  // Автоскролл
  useEffect(() => {
    if (isAutoscroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commands, isAutoscroll]);

  // Обновление лога WebSocket сообщениями
  useEffect(() => {
    const filterMessage = (message) => (
      message &&
      !message.startsWith('PING:') &&
      !message.startsWith('CURRENT_ID:') &&
      !message.startsWith('ACTIVE_ID:')
    );

    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (filterMessage(latestMessage)) {
        setCommands((prev) => [...prev, `WS: ${latestMessage}`]);
      }
    }
  }, [messages]);

  // Обновление лога данными инициализации
  useEffect(() => {
    // @ts-ignore
    if (initialData && typeof initialData === 'object' && initialData.esp800) {
      // @ts-ignore
      setCommands((prev) => [...prev, String(initialData.esp800)]);
    }
  }, [initialData]);

  const handleClear = () => setCommands([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    try {
      await sendHttpCommand(currentCommand);
      setCommands((prev) => [...prev, `HTTP Sent: ${currentCommand}`]);
    } catch (error) {
      setCommands((prev) => [...prev, `HTTP Error: ${error.message}`]);
    }
    setCurrentCommand('');
  };

  const renderCommand = (cmd) => {
    const stylesMap = {
      'WS:': { color: '#4fc3f7', fontWeight: 'bold' },
      'HTTP Sent:': { color: '#81c784', fontWeight: 'bold' },
      'HTTP Error:': { color: '#e57373', fontWeight: 'bold' },
      '[MSG:INFO]': { color: '#90a4ae', fontStyle: 'italic' },
      'ALARM': { color: '#ffb74d', fontWeight: 'bold' },
      default: { color: '#ffffff' },
    };

    const style = Object.entries(stylesMap).find(([key]) => cmd.startsWith(key) || cmd.includes(key))?.[1] || stylesMap.default;

    return <span style={style}>{cmd}</span>;
  };

  return (
    <div style={styles.container}>
      {/* Верхняя панель */}
      <div style={styles.settingsPanel}>
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={isAutoscroll}
            // @ts-ignore
            onChange={(e) => setIsAutoscroll(e.target.checked)}
            style={styles.checkbox}
          />
          Autoscroll
        </label>
        <button onClick={handleClear} style={styles.clearButton}>
          Clear
        </button>
      </div>

      {/* Область вывода */}
      <div ref={consoleRef} style={styles.consoleOutput}>
        {commands.map((cmd, index) => (
          <div key={index} style={styles.commandItem}>
            {renderCommand(cmd)}
          </div>
        ))}
      </div>

      {/* Ввод команды */}
      <form onSubmit={handleSubmit} style={styles.commandLine}>
        <input
          type="text"
          value={currentCommand}
          // @ts-ignore
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