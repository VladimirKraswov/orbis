import { useState } from 'preact/hooks';
import { styles } from './styles';
import { Block } from '../../components';
import { CommandConsole, ControlPanel, GridView, SdFiles, Sender } from '../../features';

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

        <Block title="3D View">
          <div style={styles.blockContentCentered}>
            <GridView />
          </div>
        </Block>

        <Block title="Commands">
          <CommandConsole />
        </Block>

        <Block title="GRBL Reports">
          {logMessages.map((log, index) => (
            <div key={index} style={styles.logItem}>
              {log}
            </div>
          ))}
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
