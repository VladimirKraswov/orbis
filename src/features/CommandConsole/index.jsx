import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './styles';
import { sendHttpCommand } from '../../api/apiCommands';
import { useWebSocket } from '../../providers/WebSocketContext';

const CommandConsole = () => {
  const { messages } = useWebSocket();
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const consoleRef = useRef();

  // Autoscroll effect
  useEffect(() => {
    if (isAutoscroll && consoleRef.current) {
      // @ts-ignore
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commands, isAutoscroll]);

  // Add WebSocket messages to the commands log
  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage === 'ok') {
        setCommands((prev) => [...prev, 'WS: ok']);
      }
      setCommands((prev) => [...prev, `WS: ${latestMessage}`]);
    }
  }, [messages]);

  const handleClear = () => {
    setCommands([]);
  };

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

  return (
    <div style={styles.container}>
      {/* Top Panel */}
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

      {/* Output Area */}
      <div ref={consoleRef} style={styles.consoleOutput}>
        {commands.map((cmd, index) => (
          <div key={index} style={styles.commandItem}>
            {cmd}
          </div>
        ))}
      </div>

      {/* Command Input */}
      <form
        onSubmit={handleSubmit}
        style={styles.commandLine}
      >
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
