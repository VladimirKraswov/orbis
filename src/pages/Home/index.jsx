import { Block, Status } from '../../components';
import {
  CommandConsole,
  ControlPanel,
  Visualizer,
  SdFiles,
  Sender,
  Reports,
} from '../../features';

import { styles } from './styles';

const HomePage = () => {

  return (
    <div style={styles.pageContainer}>
      <div style={styles.gridContainer}>
        <Block title="Controls">
          <ControlPanel />
        </Block>

        <Block title="3D Visualizer">
          <div style={styles.blockContentCentered}>
            <Visualizer />
          </div>
        </Block>

        <Block title="Commands">
          <CommandConsole />
        </Block>

        <Block title="GRBL Reports" headerElements={<Status/>}>
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
