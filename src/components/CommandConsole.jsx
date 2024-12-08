// @ts-ignore
import { useState, useEffect, useRef } from 'preact/hooks';

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Верхняя панель настроек */}
      <div
        style={{
          padding: '8px',
          background: '#333',
          borderBottom: '1px solid #555',
          display: 'flex',
          alignItems: 'center',
          color: '#ccc',
        }}
      >
        <label style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={isAutoscroll}
            // @ts-ignore
            onChange={(e) => setIsAutoscroll(e.target.checked)}
            style={{ marginRight: '4px', accentColor: '#007bff' }}
          />
          Autoscroll
        </label>
        <label style={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={isVerbose}
            // @ts-ignore
            onChange={(e) => setIsVerbose(e.target.checked)}
            style={{ marginRight: '4px', accentColor: '#007bff' }}
          />
          Verbose mode
        </label>
        <button
          onClick={handleClear}
          style={{
            marginLeft: 'auto',
            padding: '4px 8px',
            background: '#555',
            color: '#fff',
            border: '1px solid #777',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>

      {/* Область вывода команд */}
      <div
        ref={consoleRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
          background: '#222',
          color: '#ccc',
          borderBottom: '1px solid #555',
          fontFamily: 'monospace',
        }}
      >
        {commands.map((cmd, index) => (
          <div key={index} style={{ margin: '4px 0' }}>
            {cmd}
          </div>
        ))}
      </div>

      {/* Форма отправки команды */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          borderTop: '1px solid #555',
          padding: '8px',
          background: '#333',
        }}
      >
        <input
          type="text"
          value={currentCommand}
          // @ts-ignore
          onChange={(e) => onCommandChange(e.target.value)}
          placeholder="Send Command..."
          style={{
            flex: 1,
            padding: '8px',
            marginRight: '8px',
            background: '#222',
            color: '#ccc',
            border: '1px solid #444',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            background: '#555',
            color: '#fff',
            border: '1px solid #777',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CommandConsole;
