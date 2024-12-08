// @ts-ignore
import { h } from 'preact';
import { useState } from 'preact/hooks';
import GridView from '../../components/GridView';
import ControlPanel from '../../components/ControlPanel';
import CommandConsole from '../../components/CommandConsole';
import SdFiles from '../../components/SdFiles';

const Home = () => {
  const [command, setCommand] = useState('');
  const [commands, setCommands] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [logMessages, setLogMessages] = useState([]);

  const handleCommandSubmit = (cmd) => {
    setCommands((prev) => [...prev, cmd]);
    setCurrentCommand('');
    setLogMessages((prev) => [...prev, `Command executed: ${cmd}`]);
    console.log(`Command sent: ${cmd}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#1e1e1e', color: '#cccccc' }}>
      {/* Основная рабочая область */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '8px',
          padding: '8px',
          flex: 1,
          overflow: 'auto',
        }}
      >
        {/* Панель управления */}
        <div
          style={{
            backgroundColor: '#252526',
            color: '#ffffff',
            overflow: 'auto',
            border: '1px solid #444',
            borderRadius: '4px',
            aspectRatio: '1 / 1', // Сделать блок квадратным
          }}
        >
          <h2 style={headerStyle}>Controls:</h2>
          <ControlPanel onCommand={handleCommandSubmit} />
        </div>

        {/* Визуализация сетки */}
        <div
          style={{
            backgroundColor: '#1e1e1e',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '4px',
            aspectRatio: '1 / 1', // Сделать блок квадратным
          }}
        >
          <h2 style={{ ...headerStyle, borderBottom: '1px solid #444' }}>3D View:</h2>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <GridView />
          </div>
        </div>

        {/* Вывод команд */}
        <div
          style={{
            backgroundColor: '#252526',
            color: '#ffffff',
            overflow: 'auto',
            border: '1px solid #444',
            borderRadius: '4px',
            aspectRatio: '1 / 1', // Сделать блок квадратным
          }}
        >
          <h2 style={headerStyle}>Commands:</h2>
          <CommandConsole
            commands={commands}
            currentCommand={currentCommand}
            onCommandChange={setCurrentCommand}
            onCommandSubmit={handleCommandSubmit}
          />
        </div>

        {/* Лог-панель */}
        <div
          style={{
            backgroundColor: '#252526',
            color: '#cccccc',
            overflowY: 'auto',
            padding: '8px',
            border: '1px solid #444',
            borderRadius: '4px',
            fontFamily: 'monospace',
            aspectRatio: '1 / 1', // Сделать блок квадратным
          }}
        >
          <h2 style={{ ...headerStyle, marginBottom: '8px' }}>GRBL Reports:</h2>
          {logMessages.map((log, index) => (
            <div key={index} style={{ margin: '4px 0', color: '#aaaaaa' }}>
              {log}
            </div>
          ))}
        </div>

        {/* Блок SD Files */}
        <SdFiles apiUrl="http://192.168.1.149" />
      </div>
    </div>
  );
};

// Общие стили для заголовков блоков
const headerStyle = {
  margin: '0',
  padding: '8px',
  backgroundColor: '#333',
  borderBottom: '1px solid #444',
  fontSize: '16px',
  color: '#ffffff',
};

export default Home;
