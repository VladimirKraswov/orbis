import { useState, useEffect, useRef } from 'react';
import { sendHttpCommand } from '../../api/apiCommands';
import { useWebSocket } from '../../providers/WebSocketContext';


const Sender = () => {
  const { messages } = useWebSocket();
  const [fileContent, setFileContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const resolveOkRef = useRef(null); // Для хранения текущего промиса ожидания "ok"

  // Функция ожидания "ok"
  const waitForOk = () => {
    return new Promise((resolve, reject) => {

      // Устанавливаем текущий обработчик
      resolveOkRef.current = () => {
        resolveOkRef.current = null;
        resolve();
      };
    });
  };

  // Обработка новых сообщений WebSocket
  useEffect(() => {
    if (messages.length > 0 && resolveOkRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage === 'ok') {
        resolveOkRef.current(); // Разрешаем промис при получении "ok"
      }
    }
  }, [messages]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const content = await file.text();
      setFileContent(content);
    }
  };

  const handleSendFile = async () => {
    if (!fileContent) {
      console.error('No G-code file loaded');
      return;
    }

    setIsSending(true);
    const lines = fileContent.split('\n').map((line) => line.trim()).filter((line) => line);

    for (const line of lines) {
      try {
        await sendHttpCommand(line); // Отправка команды
        console.log(`HTTP Sent: ${line}`);
        await waitForOk(); // Ожидание "ok" из WebSocket
        console.log(`Confirmed: ${line}`);
      } catch (error) {
        console.error(`Error sending line: ${line}`, error);
        break; // Прерываем цикл в случае ошибки
      }
    }

    setIsSending(false);
    console.log('G-code sending completed.');
  };

  return (
    <div>
      <h2>Sender</h2>
      <input type="file" onChange={handleFileChange} accept=".gcode,.txt,.nc" />
      <button onClick={handleSendFile} disabled={isSending}>
        {isSending ? 'Sending...' : 'Start'}
      </button>
    </div>
  );
};

export default Sender;
