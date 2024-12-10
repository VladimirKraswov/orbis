import { useEffect, useRef, useState } from "preact/hooks";
import { sendHttpCommand } from "../../../api/apiCommands";
import { useWebSocket } from "../../../providers/WebSocketContext";

export const useSendGCode = () => {
  const { messages } = useWebSocket();
  const [isSending, setIsSending] = useState(false);
  const resolveOkRef = useRef(null);

  const waitForOk = () => {
    return new Promise((resolve) => {
      resolveOkRef.current = () => {
        resolveOkRef.current = null;
        resolve();
      };
    });
  };

  useEffect(() => {
    if (messages.length > 0 && resolveOkRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage === 'ok') {
        resolveOkRef.current();
      }
    }
  }, [messages]);

  const sendInitializationCommands = async () => {
    try {
      await sendHttpCommand('$X'); // Сброс тревоги
      console.log('Alarm reset');
      await waitForOk();

      await sendHttpCommand('$H'); // Homing
      console.log('Homing completed');
      await waitForOk();
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  };

  const sendGCode = async (gcode) => {
    if (!gcode) {
      console.error('No G-code provided');
      return;
    }

    setIsSending(true);

    try {
      // Выполняем разблокировку
     await sendInitializationCommands();

      const lines = gcode.split('\n').map((line) => line.trim()).filter((line) => line);
      console.log('G-code lines:', lines);
      

      for (const line of lines) {
        await sendHttpCommand(line);
        console.log(`HTTP Sent: ${line}`);
        await waitForOk();
        console.log(`Confirmed: ${line}`);
      }

      console.log('G-code sending completed.');
    } catch (error) {
      console.error('Error sending G-code:', error);
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendGCode };
};
