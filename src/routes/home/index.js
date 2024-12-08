// @ts-ignore
import { h } from 'preact';
import { useState } from 'preact/hooks';
import GridView from '../../components/GridView';
import ControlPanel from '../../components/ControlPanel';
import CommandConsole from '../../components/CommandConsole';

const Home = () => {
  const [command, setCommand] = useState('');
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [logMessages, setLogMessages] = useState([]);
  const [controlPanelWidth, setControlPanelWidth] = useState(450); // Ширина панели управления
  const [logPanelHeight, setLogPanelHeight] = useState(200); // Высота панели логов

  const handleCommandSubmit = (cmd) => {
    setCommands((prev) => [...prev, cmd]);
    setCurrentCommand('');
    setLogMessages((prev) => [...prev, `Command executed: ${cmd}`]);
    console.log(`Command sent: ${cmd}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1e1e1e', color: '#cccccc' }}>
      {/* Основная рабочая область */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Панель управления */}
        <div
          style={{
            width: `${controlPanelWidth}px`,
            borderRight: '1px solid #444',
            backgroundColor: '#252526',
            color: '#ffffff',
            overflow: 'auto',
          }}
        >
          <ControlPanel onCommand={handleCommandSubmit} />
        </div>

        {/* Визуализация сетки */}
        <div style={{ flex: 1, borderRight: '1px solid #444', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e1e' }}>
          <GridView />
        </div>

        {/* Вывод команд */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', borderLeft: '1px solid #444', backgroundColor: '#252526', color: '#ffffff' }}>
          <CommandConsole
            commands={commands}
            currentCommand={currentCommand}
            onCommandChange={setCurrentCommand}
            onCommandSubmit={handleCommandSubmit}
          />
        </div>
      </div>

      {/* Лог-панель */}
      <div
        style={{
          height: `${logPanelHeight}px`,
          borderTop: '1px solid #444',
          backgroundColor: '#252526',
          color: '#cccccc',
          overflowY: 'auto',
          padding: '8px',
          fontFamily: 'monospace',
        }}
      >
        {logMessages.map((log, index) => (
          <div key={index} style={{ margin: '4px 0', color: '#aaaaaa' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
