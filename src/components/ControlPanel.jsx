// @ts-ignore
import { useState } from 'preact/hooks';
import { sendCommand } from '../apiService';

const ControlPanel = ({ onCommand }) => {
  const [feedRateXY, setFeedRateXY] = useState(1000); // Скорость перемещения XY
  const [feedRateZ, setFeedRateZ] = useState(100); // Скорость перемещения Z

  const handleMovement = async (axis, direction) => {
    const distance = 10; // Расстояние перемещения в миллиметрах
    const feedRate = axis === 'Z' ? feedRateZ : feedRateXY; // Используем скорость в зависимости от оси
    const commandText = `$J=G91 G21 F${feedRate} ${axis}${direction * distance}`;

    try {
      const response = await sendCommand(commandText);
      if (onCommand) {
        onCommand(response); // Передача ответа обратно
      }
    } catch (error) {
      console.error('Failed to send command', error);
    }
  };

  const handleHome = async (axis) => {
    const commandText = axis ? `$H${axis}` : '$H';
    try {
      const response = await sendCommand(commandText);
      if (onCommand) {
        onCommand(response);
      }
    } catch (error) {
      console.error('Failed to send home command', error);
    }
  };

  const handleResetCoordinates = async (fullReset = false) => {
    const commandText = fullReset ? `G10 L20 P0 X0 Y0 Z0` : `G10 L20 P0 X0`;
    try {
      const response = await sendCommand(commandText);
      if (onCommand) {
        onCommand(response);
      }
    } catch (error) {
      console.error('Failed to reset coordinates', error);
    }
  };

  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#252526',
        color: '#ffffff',
        borderRight: '1px solid #444',
        fontFamily: 'Arial, sans-serif',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Control Panel</h2>

      {/* Ввод скоростей */}
      <div style={{ marginBottom: '16px' }}>
        <label style={labelStyle}>
          XY Speed:
          <input
            type="number"
            value={feedRateXY}
            // @ts-ignore
            onChange={(e) => setFeedRateXY(Number(e.target.value))}
            style={inputStyle}
          />
          mm/min
        </label>
        <label style={labelStyle}>
          Z Speed:
          <input
            type="number"
            value={feedRateZ}
            // @ts-ignore
            onChange={(e) => setFeedRateZ(Number(e.target.value))}
            style={inputStyle}
          />
          mm/min
        </label>
      </div>

      {/* Кнопки управления */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => handleMovement('X', 1)}>
          +X
        </button>
        <button style={buttonStyle} onClick={() => handleMovement('X', -1)}>
          -X
        </button>
        <button style={buttonStyle} onClick={() => handleMovement('Y', 1)}>
          +Y
        </button>
        <button style={buttonStyle} onClick={() => handleMovement('Y', -1)}>
          -Y
        </button>
        <button style={buttonStyle} onClick={() => handleMovement('Z', 1)}>
          +Z
        </button>
        <button style={buttonStyle} onClick={() => handleMovement('Z', -1)}>
          -Z
        </button>
      </div>

      {/* Кнопки "Домой" */}
      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '8px' }}>Home Commands</h3>
        <div style={homeButtonContainerStyle}>
          <button style={homeButtonStyle} onClick={() => handleHome('X')}>
            Home X
          </button>
          <button style={homeButtonStyle} onClick={() => handleHome('Y')}>
            Home Y
          </button>
          <button style={homeButtonStyle} onClick={() => handleHome('Z')}>
            Home Z
          </button>
        </div>
        <button style={{ ...homeButtonStyle, marginTop: '8px' }} onClick={() => handleHome()}>
          Home All
        </button>
      </div>

      {/* Кнопки сброса координат */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <h3 style={{ marginBottom: '8px' }}>Reset Coordinates</h3>
        <div style={resetButtonContainerStyle}>
          <button style={resetButtonStyle} onClick={() => handleResetCoordinates(false)}>
            Reset X
          </button>
          <button style={resetButtonStyle} onClick={() => handleResetCoordinates(true)}>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

// Стили
const buttonContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px',
  justifyItems: 'center',
  alignItems: 'center',
};

const buttonStyle = {
  width: '100px',
  height: '40px',
  borderRadius: '4px',
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  border: '1px solid #555',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
};

const homeButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: '8px',
};

const homeButtonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#444',
  color: '#fff',
  border: '1px solid #555',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'center',
};

const resetButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: '8px',
};

const resetButtonStyle = {
  padding: '8px 16px',
  borderRadius: '4px',
  backgroundColor: '#d9534f',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  fontSize: '14px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#ffffff',
  fontSize: '14px',
};

const inputStyle = {
  marginLeft: '8px',
  padding: '4px',
  borderRadius: '4px',
  border: '1px solid #555',
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  fontSize: '14px',
  width: '80px',
};

export default ControlPanel;
