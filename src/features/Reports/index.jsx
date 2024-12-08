import { useWebSocket } from "../../api/WebSocketContext";


const Reports = () => {
  const { messages } = useWebSocket();

  const machineStatus = messages.find((msg) => msg.startsWith('<')) || 'No status available';

  return (
    <div>
      <h2>Monitor</h2>
      <div>Status: {machineStatus}</div>
    </div>
  );
};

export default Reports;
