import {
  FeatureControls,
  FeatureCommands,
  FeatureVisualizer,
  FeatureSdFiles,
  FeatureSender,
  FeatureReports,
} from '../../features';

import { styles } from './styles';

const HomePage = () => {

  return (
    <div style={styles.pageContainer}>
      <div style={styles.gridContainer}>
          <FeatureControls />
          <FeatureVisualizer />
          <FeatureCommands />
          <FeatureReports />
          <FeatureSdFiles />
          <FeatureSender />
      </div>
    </div>
  );
};

export default HomePage;
