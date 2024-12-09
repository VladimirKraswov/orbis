const apiUrl = '192.168.1.149'
export const connectWebSocket = (onOpen, onMessage, onError, onClose) => {
  try {
    const wsUrl = `ws://${apiUrl}:81/`;
    const websocket = new WebSocket(wsUrl, ['arduino']);
    websocket.binaryType = 'arraybuffer'; // Устанавливаем поддержку бинарных данных

    websocket.onopen = async () => {
      console.log('WebSocket connected');
      if (onOpen) onOpen();
    };

    websocket.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const textDecoder = new TextDecoder();
        const decodedMessage = textDecoder.decode(event.data);
        if (onMessage) onMessage(decodedMessage, true);
      } else {
        if (onMessage) onMessage(event.data, false);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };

    websocket.onclose = (event) => {
      console.warn('WebSocket disconnected', event);
      if (onClose) onClose(event);
    };

    return websocket;
  } catch (error) {
    console.error('Failed to establish WebSocket connection:', error);
    if (onError) onError(error);
    return null;
  }
};


export const sendWebSocketCommand = (websocket, command, onSendError) => {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    try {
      websocket.send(command);
      console.log(`WebSocket command sent: ${command}`);
    } catch (error) {
      console.error('Error sending WebSocket command:', error);
      if (onSendError) onSendError('Error sending command');
    }
  } else {
    const errorMessage = 'WebSocket is not connected';
    console.warn(errorMessage);
    if (onSendError) onSendError(errorMessage);
  }
};


export const sendHttpCommand = async (command) => {
  // Формируем строку запроса вручную
  const url = `/api/command?commandText=${command}&PAGEID=0`;

  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    console.log('HTTP Response:', data);
    return data;
  } catch (error) {
    console.error('Error sending HTTP command:', error);
    throw error;
  }
};

export const fetchMachineParameters = async () => {
  try {
    const response = await sendHttpCommand("$$"); // Получение всех параметров
    const lines = response.split("\n"); // Разделение ответа на строки

    const xLine = lines.find((line) => line.startsWith("$130="));
    const yLine = lines.find((line) => line.startsWith("$131="));
    const zLine = lines.find((line) => line.startsWith("$132="));

    const x = xLine ? parseFloat(xLine.split("=")[1]) : 0;
    const y = yLine ? parseFloat(yLine.split("=")[1]) : 0;
    const z = zLine ? parseFloat(zLine.split("=")[1]) : 0;

    return { x, y, z };
  } catch (error) {
    console.error("Error fetching machine parameters:", error);
    return { x: 0, y: 0, z: 0 }; // Значения по умолчанию при ошибке
  }
};

