import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

import { useMachine } from '../../providers/machine';
import { Button, Checkbox, FeatureContainer } from '../../components';

import styles from './styles';

const FeatureCommands = () => {
  const { messages, sendCommand, info: { initialData } } = useMachine();
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isAutoscroll, setIsAutoscroll] = useState(true);
  const consoleRef = useRef(null);

  const handleAutoscroll = useCallback(() => {
    if (isAutoscroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [isAutoscroll, commands]);

  useEffect(() => {
    handleAutoscroll();
  }, [commands, handleAutoscroll]);

  const filterMessage = useCallback((message) => (
    message &&
    !message.startsWith('PING:') &&
    !message.startsWith('CURRENT_ID:') &&
    !message.startsWith('ACTIVE_ID:')
  ), []);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (filterMessage(latestMessage)) {
        setCommands((prev) => [...prev, `WS: ${latestMessage}`]);
      }
    }
  }, [messages, filterMessage]);

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
      await sendCommand(currentCommand);
      setCommands((prev) => [...prev, `HTTP Sent: ${currentCommand}`]);
    } catch (error) {
      setCommands((prev) => [...prev, `HTTP Error: ${error.message}`]);
    }
    setCurrentCommand('');
  };

  const renderCommand = useCallback((cmd) => {
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
  }, []);

  return (
    <FeatureContainer
      style={styles.container}
      title="Commands"
      headerElements={
        <div style={styles.settingsPanel}>
          <Checkbox
            label="Autoscroll"
            checked={isAutoscroll} 
            onChange={(e) => setIsAutoscroll(e.target.checked)}
          />
          <Button style={styles.clearButton} variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </div>
      }
    >
      <div ref={consoleRef} style={styles.consoleOutput}>
        {commands.map((cmd, index) => (
          <div key={index} style={styles.commandItem}>
            {renderCommand(cmd)}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={styles.commandLine}>
        <input
          type="text"
          value={currentCommand}
          // @ts-ignore
          onChange={(e) => setCurrentCommand(e.target.value)}
          placeholder="Send Command..."
          style={styles.input}
        />
        <Button type="submit">
          Send
        </Button>
      </form>
    </FeatureContainer>
  );
};

export default FeatureCommands;