import { Box } from '../../components';
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
    <Box height="100vh" scrollable>
      <div style={styles.container}>
        <FeatureControls />
        <FeatureVisualizer />
        <FeatureCommands />
        <FeatureReports />
        <FeatureSdFiles />
        <FeatureSender />
      </div>
    </Box>
  );
};

export default HomePage;
