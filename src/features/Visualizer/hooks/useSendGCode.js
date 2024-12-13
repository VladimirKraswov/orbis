import { useEffect, useRef, useState } from "preact/hooks";

import { logWithTimestamp, validateGCode } from "../../../utils";
import { useMachine } from "../../../providers/machine";


const BUFFER_LIMIT = 5; 
const TIMEOUT = 30000;

export const useSendGCode = () => {
  const { messages, sendCommand } = useMachine();
  const [isSending, setIsSending] = useState(false);
  const resolveOkRef = useRef(null);
  const [bufferSize, setBufferSize] = useState(0);
  // Максимальное количество команд в буфере
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const resetState = () => {
    setBufferSize(0);
    resolveOkRef.current = null;
    setCurrentLineIndex(0);
  };

  const waitForOk = (timeout = TIMEOUT) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolveOkRef.current = null;
        reject(new Error("Timeout waiting for 'ok' or 'Idle' response"));
      }, timeout);

      resolveOkRef.current = () => {
        clearTimeout(timer);
        resolveOkRef.current = null;
        resolve();
      };
    });
  };

  useEffect(() => {
    if (messages.length > 0 && resolveOkRef.current) {
      const lastMessage = messages[messages.length - 1];

      // Проверяем состояния
      if (lastMessage === "ok" || lastMessage.includes("Idle")) {
        resolveOkRef.current();
        setBufferSize((prev) => Math.max(prev - 1, 0)); // Уменьшаем размер буфера
      } else {
        logWithTimestamp(`Received message: ${lastMessage}`);
      }
    }
  }, [messages]);

  const sendInitializationCommands = async () => {
    try {
      logWithTimestamp("Sending initialization commands...");
      await sendCommand("$X");
      logWithTimestamp("Alarm reset command sent.");
      await waitForOk();

      await sendCommand("$H");
      logWithTimestamp("Homing command sent.");
      await waitForOk();

      logWithTimestamp("Initialization completed.");
    } catch (error) {
      throw new Error(`Initialization failed: ${error.message}`);
    }
  };

  const sendGCode = async (gcode) => {
    if (!gcode) {
      logWithTimestamp("No G-code provided.");
      return;
    }

    setIsSending(true);

    try {
      const lines = validateGCode(gcode);
      logWithTimestamp(`Validated G-code: ${lines.length} lines.`);

      await sendInitializationCommands();

      for (let i = currentLineIndex; i < lines.length; i++) {
        setCurrentLineIndex(i);

        // Ожидание освобождения места в буфере
        while (bufferSize >= BUFFER_LIMIT) {
          logWithTimestamp("Buffer full, waiting...");
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Отправка команды
        await sendCommand(lines[i]);
        setBufferSize((prev) => prev + 1); // Увеличиваем размер буфера
        logWithTimestamp(`Sent: ${lines[i]}`);
        await waitForOk();
        logWithTimestamp(`Acknowledged: ${lines[i]}`);
      }

      logWithTimestamp("All G-code lines sent successfully.");
    } catch (error) {
      console.error("Error sending G-code:", error.message);
    } finally {
      resetState(); // Сбрасываем состояние после завершения
      setIsSending(false);
    }
  };

  return { isSending, sendGCode };
};
