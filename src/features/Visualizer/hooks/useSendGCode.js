import { useEffect, useRef, useState } from "preact/hooks";
import { sendHttpCommand } from "../../../api/apiCommands";
import { useWebSocket } from "../../../providers/WebSocketContext";

export const useSendGCode = () => {
  const { messages } = useWebSocket();
  const [isSending, setIsSending] = useState(false);
  const resolveOkRef = useRef(null);
  const [bufferSize, setBufferSize] = useState(0);
  const bufferLimit = 5; // Максимальное количество команд в буфере

  const logWithTimestamp = (message) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
  };

  const waitForOk = (timeout = 30000) => {
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
      await sendHttpCommand("$X");
      logWithTimestamp("Alarm reset command sent.");
      await waitForOk();

      await sendHttpCommand("$H");
      logWithTimestamp("Homing command sent.");
      await waitForOk();

      logWithTimestamp("Initialization completed.");
    } catch (error) {
      throw new Error(`Initialization failed: ${error.message}`);
    }
  };

  const validateGCode = (gcode) => {
    const lines = gcode.split("\n").map((line) => line.trim());
    const invalidLines = lines.filter((line) => {
      return !/^(G|M)[0-9]/i.test(line) && line !== "";
    });

    if (invalidLines.length > 0) {
      throw new Error(`Invalid G-code lines detected: ${invalidLines.join(", ")}`);
    }
    return lines.filter((line) => line);
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

      for (const line of lines) {
        // Ожидание освобождения места в буфере
        while (bufferSize >= bufferLimit) {
          logWithTimestamp("Buffer full, waiting...");
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Отправка команды
        await sendHttpCommand(line);
        setBufferSize((prev) => prev + 1); // Увеличиваем размер буфера
        logWithTimestamp(`Sent: ${line}`);
        await waitForOk();
        logWithTimestamp(`Acknowledged: ${line}`);
      }

      logWithTimestamp("All G-code lines sent successfully.");
    } catch (error) {
      console.error("Error sending G-code:", error.message);
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendGCode };
};
