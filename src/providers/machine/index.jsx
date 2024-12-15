import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { sendCommand, connectWebSocket } from './api';
import useFileSystem from './useFileSystem';
import useMachineInfo from './useMachineInfo';

const MachineContext = createContext({
  messages: [],
  fs: {
    files: [],
    isLoading: false,
    error: null,
    status: null,
    fetchFiles: async () => {},
    createFolder: async () => {},
    renameFile: async () => {},
    deleteFile: async () => {},
    executeFile: async () => {},
    downloadFile: async () => {},
    uploadFile: async () => {},
  },
  info: {
    mPos: { x: 0, y: 0 },
    wPos: { x: 0, y: 0 },
    feedSpindle: { feed: 0, spindle: 0 },
    wco: { x: 0, y: 0 },
    error: null,
    status: null,
    statusError: null,
    initialData: {},
    isInitializing: false,
    machineParameters: { x: 0, y: 0, z: 0 },
  },
  sendMessage: () => {},
  sendCommand: () => {},
  unlock: () => {},
});

const MachineProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const websocketRef = useRef(null);

  const fileSystem = useFileSystem();
  const machineInfo = useMachineInfo(messages);

  useEffect(() => {
    const websocket = connectWebSocket(
      () => setMessages((prev) => [...prev, 'WebSocket: Connected']),
      (data) => setMessages((prev) => [...prev, data.trim()]),
      (error) => setMessages((prev) => [...prev, `WebSocket: Error: ${error}`]),
      () => setMessages((prev) => [...prev, 'WebSocket: Disconnected'])
    );
    websocketRef.current = websocket;

    return () => websocket?.close();
  }, []);

  const sendMessage = (message) => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.send(message);
    } else {
      console.error('WebSocket is not open.');
    }
  };

  const unlock = async () => {
    try {
      await sendCommand('$X');
      console.log('Machine unlocked');
    } catch (error) {
      console.error('Failed to unlock the machine:', error);
    }
  };

  const fs = useMemo(
    () => ({
      ...fileSystem,
    }),
    [fileSystem]
  );

  const info = useMemo(
    () => ({
      ...machineInfo,
    }),
    [machineInfo]
  );

  const contextValue = useMemo(
    () => ({
      messages,
      fs,
      info,
      sendMessage,
      sendCommand,
      unlock,
    }),
    [messages, fs, info]
  );

  return <MachineContext.Provider value={contextValue}>{children}</MachineContext.Provider>;
};

const useMachine = () => {
  const context = useContext(MachineContext);
  if (!context) {
    throw new Error('useMachine must be used within MachineProvider');
  }
  return context;
};

MachineProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MachineProvider, useMachine };
