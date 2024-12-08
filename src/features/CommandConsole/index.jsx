// @ts-ignore
import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './styles';

const CommandConsole = ({ commands, currentCommand, onCommandChange, onCommandSubmit }) => {
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const [isVerbose, setIsVerbose] = useState(false);
  const consoleRef = useRef();

  // Автопрокрутка
  useEffect(() => {
    if (isAutoscroll && consoleRef.current) {
      // @ts-ignore
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [commands, isAutoscroll]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      const command = isVerbose
        ? `[VERBOSE] ${currentCommand}`
        : currentCommand; // Добавление режима Verbose
      onCommandSubmit(command);
    }
  };

  const handleClear = () => {
    onCommandSubmit('[CLEAR LOGS]');
    console.log('Console cleared');
  };

  return (
    <div style={styles.container}>
      {/* Верхняя панель настроек */}
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
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={isVerbose}
            // @ts-ignore
            onChange={(e) => setIsVerbose(e.target.checked)}
            style={styles.checkbox}
          />
          Verbose mode
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
          // @ts-ignore
          onChange={(e) => onCommandChange(e.target.value)}
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
