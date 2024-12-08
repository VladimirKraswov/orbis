import { h } from 'preact';
import { useState } from 'preact/hooks';

const TabBar = ({ command }) => {
  const [activeTab, setActiveTab] = useState('gcode'); // Активная вкладка

  return (
    <div>
      {/* Вкладки */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        <button
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            backgroundColor: activeTab === 'gcode' ? '#f0f0f0' : '#fff',
          }}
          onClick={() => setActiveTab('gcode')}
        >
          GCode Commands
        </button>
        <button
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            backgroundColor: activeTab === 'logs' ? '#f0f0f0' : '#fff',
          }}
          onClick={() => setActiveTab('logs')}
        >
          Logs
        </button>
      </div>
      {/* Контент вкладок */}
      <div style={{ padding: '10px', overflowY: 'auto', height: 'calc(100% - 40px)' }}>
        {activeTab === 'gcode' ? (
          <div>
            <h3>Send GCode Commands</h3>
            <p>Last command: {command}</p>
            {/* Здесь можно добавить поле ввода и кнопки */}
          </div>
        ) : (
          <div>
            <h3>Logs</h3>
            <p>Here are the logs...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabBar;
