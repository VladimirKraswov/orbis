import { Box } from "../../../../components";
import { useSettings } from "../../../../providers/Settings";

const IntervalReportSettings = () => {
  const { settings, updateSetting } = useSettings();

  const handleModeChange = (event) => {
    const mode = event.target.value;

    // Убедимся, что `intervalReport` существует
    const intervalReport = settings.intervalReport || { mode: 'disabled', value: 1000 };

    updateSetting('intervalReport', { ...intervalReport, mode });
  };

  const handleValueChange = async (event) => {
    const value = parseInt(event.target.value, 10) || 1000;

    const intervalReport = settings.intervalReport || { mode: 'disabled', value: 1000 };

    updateSetting('intervalReport', { ...intervalReport, value });
  };

  // Убедимся, что `intervalReport` существует
  const intervalReport = settings.intervalReport || { mode: 'disabled', value: 1000 };

  return (
    <Box column pd="15px" backgroundColor="#2e2e2e" borderRadius="10px" color="#fff">
      <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
        Interval Report Mode:
        <select
          value={intervalReport.mode}
          onChange={handleModeChange}
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: '1px solid #ccc',
          }}
        >
          <option value="disabled">Disabled</option>
          <option value="auto">Auto</option>
          <option value="poll">Poll</option>
        </select>
      </label>
      {intervalReport.mode !== 'disabled' && (
        <label style={{ display: 'block', marginTop: '10px', fontWeight: 'bold' }}>
          Interval (ms):
          <input
            type="number"
            value={intervalReport.value}
            onChange={handleValueChange}
            min={50}
            max={30000}
            style={{
              marginLeft: '10px',
              padding: '5px',
              borderRadius: '5px',
              backgroundColor: '#1a1a1a',
              color: '#fff',
              border: '1px solid #ccc',
              width: '100px',
            }}
          />
        </label>
      )}
    </Box>
  );
};

export default IntervalReportSettings;
