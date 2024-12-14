import { useState, useEffect } from 'react';

import IntervalReportSettings from './components/IntervalReport';

import { useMachine } from '../../providers/machine';

import { styles } from './styles';
import { FeatureContainer, ProgressBar, Status, Tab, Tabs } from '../../components';

const FeatureReports = () => {
  const { messages } = useMachine();
  const [progress, setProgress] = useState(null);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const latestStatusMessage = [...messages].reverse().find((msg) => msg.startsWith('<'));
    if (latestStatusMessage) {
      try {
        const cleanText = latestStatusMessage.replace(/[<>]/g, '');
        const parts = cleanText.split('|');
        const machineStatus = parts[0] || 'Unknown';

        if (latestStatusMessage.includes('Run')) {
          const sdPart = parts.find((part) => part.startsWith('SD:'));
          if (sdPart) {
            const [progressValue, file] = sdPart.replace('SD:', '').split(',');
            setProgress(Math.min(parseFloat(progressValue), 100));
            setFileName(file || 'Unknown');
          }
        } else if (machineStatus === 'Idle') {
          setProgress(null);
          setFileName('');
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    }
  }, [messages]);


  return (
    <FeatureContainer title="GRBL Reports" headerElements={<Status/>}>
      {!!progress && 
        <ProgressBar
          style={styles.progressBar}
          progress={progress}
          description={`File: ${fileName}`} 
        />
      } 
      <Tabs style={styles.tabs}>
        <Tab label="Interval" title="Spindle Control">
          <IntervalReportSettings />
        </Tab>
        
        <Tab label="Override" title="Override Settings">
          <p>Override controls go here.</p>
        </Tab>

        <Tab label="Spindle" title="Spindle Control">
          <p>Spindle Control.</p>
        </Tab>
      </Tabs>
    </FeatureContainer>
  );
};

export default FeatureReports;