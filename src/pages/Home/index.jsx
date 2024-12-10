import { useState } from 'preact/hooks';
import { styles } from './styles';
import { Block } from '../../components';
import { CommandConsole, ControlPanel, Visualizer, SdFiles, Sender, Reports } from '../../features';

const HomePage = () => {
  const [logMessages, setLogMessages] = useState([]);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.gridContainer}>
        <Block title="Controls">
          <ControlPanel
            onCommand={(cmd) =>
              setLogMessages((prev) => [...prev, `Command executed: ${cmd}`])
            }
          />
        </Block>

        <Block title="3D Visualizer">
          <div style={styles.blockContentCentered}>
            <Visualizer />
          </div>
        </Block>

        <Block title="Commands">
          <CommandConsole />
        </Block>

        <Block title="GRBL Reports">
          <Reports />
        </Block>

        <Block title="SD Files">
          <SdFiles />
        </Block>

        <Block title="Sender">
          <Sender />
        </Block>
      </div>
    </div>
  );
};

export default HomePage;
