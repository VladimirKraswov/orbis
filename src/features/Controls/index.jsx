// @ts-ignore
import { useState } from 'preact/hooks';
import Button from '../../components/Button';
import { styles } from './styles';
import { sendHttpCommand } from '../../api/apiCommands';

const ControlPanel = ({ onCommand }) => {
  const [feedRateXY, setFeedRateXY] = useState(1000);
  const [feedRateZ, setFeedRateZ] = useState(100);

  const handleMovement = async (axis, direction) => {
    const distance = 10;
    const feedRate = axis === 'Z' ? feedRateZ : feedRateXY;
    const commandText = `$J=G91 G21 F${feedRate} ${axis}${direction * distance}`;

    try {
      const response = await sendHttpCommand(commandText);
      if (onCommand) {
        onCommand(response);
      }
    } catch (error) {
      console.error('Failed to send command', error);
    }
  };

  const handleHome = async (axis) => {
    const commandText = axis ? `$H${axis}` : '$H';
    try {
      const response = await sendHttpCommand(commandText);
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
      const response = await sendHttpCommand(commandText);
      if (onCommand) {
        onCommand(response);
      }
    } catch (error) {
      console.error('Failed to reset coordinates', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Control Panel</h2>
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          XY Speed:
          <input
            type="number"
            value={feedRateXY}
            // @ts-ignore
            onChange={(e) => setFeedRateXY(Number(e.target.value))}
            style={styles.input}
          />
          mm/min
        </label>
        <label style={styles.label}>
          Z Speed:
          <input
            type="number"
            value={feedRateZ}
            // @ts-ignore
            onChange={(e) => setFeedRateZ(Number(e.target.value))}
            style={styles.input}
          />
          mm/min
        </label>
      </div>

      <div style={styles.buttonContainer}>
        <Button onClick={() => handleMovement('X', 1)}>+X</Button>
        <Button onClick={() => handleMovement('X', -1)}>−X</Button>
        <Button onClick={() => handleMovement('Y', 1)}>+Y</Button>
        <Button onClick={() => handleMovement('Y', -1)}>−Y</Button>
        <Button onClick={() => handleMovement('Z', 1)}>+Z</Button>
        <Button onClick={() => handleMovement('Z', -1)}>−Z</Button>
      </div>

      <div>
        <h3>Home Commands</h3>
        <div style={styles.buttonGroup}>
          <Button onClick={() => handleHome('X')}>Home X</Button>
          <Button onClick={() => handleHome('Y')}>Home Y</Button>
          <Button onClick={() => handleHome('Z')}>Home Z</Button>
          <Button onClick={() => handleHome()}>Home All</Button>
        </div>
      </div>

      <div>
        <h3>Reset Coordinates</h3>
        <div style={styles.buttonGroup}>
          <Button onClick={() => handleResetCoordinates(false)}>Reset X</Button>
          <Button onClick={() => handleResetCoordinates(true)}>Reset All</Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
