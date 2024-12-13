import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { sendCommand, connectWebSocket } from './api';
import useFileSystem from './useFileSystem';
import useMachineStatus from './useMachineStatus';

const MachineContext = createContext({
  messages: [],
  fs: {
    files: [],
    isLoading: false,
    error: null,
    fetchFiles: async () => {},
    createFolder: async (folderName) => {},
    renameFile: async (fileName, newFilename) => {},
    deleteFile: async (fileName) => {},
    executeFile: async (fileName) => {},
  },
  status: {
    mPos: { x: 0, y: 0 },
    wPos: { x: 0, y: 0 },
    feedSpindle: { feed: 0, spindle: 0 },
    wco: { x: 0, y: 0 },
    error: null,
    statusError: null,
    initialData: {},
    isInitializing: false,
    machineParameters: { x: 0, y: 0, z: 0 },
  },
  sendMessage: (message) => {},
  sendCommand: (command) => {},
});

const MachineProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const websocketRef = useRef(null);

  const { files, isLoading, error, fetchFiles, createFolder, renameFile, deleteFile, executeFile } = useFileSystem();
  const { mPos, wPos, feedSpindle, wco, error: statusError, initialData, isInitializing, machineParameters } = useMachineStatus(messages); 

  // WebSocket подключение
  useEffect(() => {
    websocketRef.current = connectWebSocket(
      () => setMessages((prev) => [...prev, 'WebSocket: Connected']),
      (data) => setMessages((prev) => [...prev, data.trim()]),
      (error) => setMessages((prev) => [...prev, `WebSocket: Error: ${error}`]),
      () => setMessages((prev) => [...prev, 'WebSocket: Disconnected'])
    );

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      websocketRef.current.send(message);
    } else {
      console.error('WebSocket is not open.');
    }
  };

  // Структурируем файловую систему
  const fs = useMemo(
    () => ({
      files,
      isLoading,
      error,
      fetchFiles,
      createFolder,
      renameFile,
      deleteFile,
      executeFile,
    }),
    [files, isLoading, error, fetchFiles, createFolder, renameFile, deleteFile, executeFile]
  );

  const status = useMemo(
    () => ({
      mPos,
      wPos,
      feedSpindle,
      wco,
      error,
      statusError,
      initialData,
      isInitializing,
      machineParameters,
    }),
    [mPos, wPos, feedSpindle, wco, error, initialData, statusError, isInitializing, machineParameters]
  );

  // Контекстное значение
  const contextValue = useMemo(
    () => ({
      messages,
      fs,
      status,
      sendMessage,
      sendCommand,
    }),
    [messages, fs, status]
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
