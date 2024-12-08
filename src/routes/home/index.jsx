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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#cccccc',
      }}
    >
      {/* Основная рабочая область */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(512px, 1fr))',
          gridAutoRows: 'minmax(512px, 1fr)', // Гибкое управление высотой
          gap: '16px', // Увеличенный отступ между блоками
          padding: '16px',
          flex: 1,
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Панель управления */}
        <div
          style={{
            backgroundColor: '#252526',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '4px',
            minHeight: '512px',
            maxHeight: '400px', // Ограничение максимальной высоты
            overflow: 'auto', // Добавление прокрутки
            boxSizing: 'border-box',
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
            minHeight: '512px',
            maxHeight: '400px',
            overflow: 'hidden', // Скрыть выходящее содержимое
            boxSizing: 'border-box',
          }}
        >
          <h2 style={headerStyle}>3D View:</h2>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <GridView />
          </div>
        </div>

        {/* Вывод команд */}
        <div
          style={{
            backgroundColor: '#252526',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '4px',
            minHeight: '512px',
            maxHeight: '400px',
            overflow: 'auto',
            boxSizing: 'border-box',
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
            padding: '16px',
            border: '1px solid #444',
            borderRadius: '4px',
            fontFamily: 'monospace',
            minHeight: '512px',
            maxHeight: '400px',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={headerStyle}>GRBL Reports:</h2>
          {logMessages.map((log, index) => (
            <div key={index} style={{ margin: '4px 0', color: '#aaaaaa' }}>
              {log}
            </div>
          ))}
        </div>

        {/* Блок SD Files */}
        <div
          style={{
            backgroundColor: '#252526',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '4px',
            minHeight: '300px',
            maxHeight: '400px',
            overflow: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <h2 style={headerStyle}>SD Files:</h2>
          <SdFiles apiUrl="http://192.168.1.149" />
        </div>
      </div>
    </div>
  );
};

// Общие стили для заголовков блоков
const headerStyle = {
  position: 'sticky',
  top: '0',
  zIndex: '1',
  margin: '0',
  padding: '8px',
  backgroundColor: '#333',
  borderBottom: '1px solid #444',
  fontSize: '16px',
  color: '#ffffff',
};

export default Home;
