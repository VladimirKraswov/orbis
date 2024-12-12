import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connectWebSocket } from '../api/apiCommands';


const WebSocketContext = createContext({
  messages: [],
  sendMessage: () => {},
});


export const WebSocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const websocketRef = useRef(null);

  useEffect(() => {
    websocketRef.current = connectWebSocket(
      () => setMessages((prev) => [...prev, 'WebSocket: Connected']),
      (data) => {
        console.log('WebSocket Data Received:', data); // Логгируем полученные данные
        setMessages((prev) => [...prev, data.trim()]);
      },
      (error) => {
        console.error('WebSocket Error:', error); // Логгируем ошибки
        setMessages((prev) => [...prev, `WebSocket: Error: ${error}`]);
      },
      () => setMessages((prev) => [...prev, 'WebSocket: Disconnected'])
    );
    

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      websocketRef.current.send(message);
    }
  };

  return (
    <WebSocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

WebSocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
