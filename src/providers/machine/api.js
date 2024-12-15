import { BASE_URL, RECONNECT_INTERVAL, WEBSOCKET_URL } from "./constants";

// State for reconnect timeout
let reconnectTimeout = null;

/**
 * Establishes a WebSocket connection with auto-reconnect functionality.
 * @param {function} onOpen - Callback for connection open.
 * @param {function} onMessage - Callback for incoming messages.
 * @param {function} onError - Callback for errors.
 * @param {function} onClose - Callback for connection close.
 * @returns {WebSocket} The WebSocket instance.
 */
export const connectWebSocket = (onOpen, onMessage, onError, onClose) => {
    let websocket;

    const initializeWebSocket = () => {
       websocket = new WebSocket(WEBSOCKET_URL, ['arduino']);
        websocket.binaryType = 'arraybuffer';

        websocket.onopen = () => {
            console.log('WebSocket connected');
            onOpen?.();
        };

        websocket.onmessage = (event) => {
            const data = event.data instanceof ArrayBuffer
                ? new TextDecoder().decode(event.data)
                : event.data;
            onMessage?.(data, event.data instanceof ArrayBuffer);
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            onError?.(error);
        };

        websocket.onclose = (event) => {
            console.warn('WebSocket disconnected', event);
            onClose?.(event);
            attemptReconnect();
        };
    };

    const attemptReconnect = () => {
        if (reconnectTimeout) return;

        console.log(`Attempting to reconnect WebSocket in ${RECONNECT_INTERVAL / 1000} seconds...`);
        reconnectTimeout = setTimeout(() => {
            reconnectTimeout = null;
            initializeWebSocket();
        }, RECONNECT_INTERVAL);
    };

    initializeWebSocket();

    return websocket;
};

/**
 * Sends a command through the WebSocket.
 * @param {WebSocket} websocket - The WebSocket instance.
 * @param {string} command - The command to send.
 * @param {function} [onSendError] - Callback for send errors.
 */
export const sendWebSocketCommand = (websocket, command, onSendError) => {
    if (websocket?.readyState === WebSocket.OPEN) {
        try {
            websocket.send(command);
            console.log(`WebSocket command sent: ${command}`);
        } catch (error) {
            console.error('Error sending WebSocket command:', error);
            onSendError?.('Error sending command');
        }
    } else {
        const errorMessage = 'WebSocket is not connected';
        console.warn(errorMessage);
        onSendError?.(errorMessage);
    }
};

/**
 * Sends a command via HTTP.
 * @param {string} command - The command to send.
 * @returns {Promise<string>} The server response.
 */
export const sendCommand = async (command) => {
    const url = `${BASE_URL}/command?commandText=${command}&PAGEID=0`;

    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Error sending HTTP command:', error);
        throw error;
    }
};

/**
 * Fetches machine parameters via HTTP.
 * @returns {Promise<{x: number, y: number, z: number}>} The machine parameters.
 */
export const fetchMachineParameters = async () => {
    try {
        const response = await sendCommand('$$');
        const lines = response.split('\n');

        const parseParameter = (key) => {
            const line = lines.find((line) => line.startsWith(key));
            return line ? parseFloat(line.split('=')[1]) : 0;
        };

        return {
            x: parseParameter('$130='),
            y: parseParameter('$131='),
            z: parseParameter('$132=')
        };
    } catch (error) {
        console.error('Error fetching machine parameters:', error);
        return { x: 0, y: 0, z: 0 };
    }
};

/**
 * Fetches the list of files from the server.
 * @param {string} [path='/'] - The directory path to fetch.
 * @returns {Promise<Array>} The list of files.
 */
export const fetchFilesApi = async (path = '/') => {
    const url = `${BASE_URL}/upload?path=${encodeURIComponent(path)}`;

    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to fetch files: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching files: ${error}`);
        throw error;
    }
};

/**
 * Creates a folder on the server.
 * @param {string} path - The parent directory path.
 * @param {string} folderName - The name of the new folder.
 * @returns {Promise<Object>} The server response.
 */
export const createFolderApi = async (path, folderName) => {
    const url = `${BASE_URL}/upload?path=${encodeURIComponent(path)}&action=createdir&filename=${encodeURIComponent(folderName)}`;

    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to create folder: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error creating folder: ${error}`);
        throw error;
    }
};

/**
 * Renames a file on the server.
 * @param {string} path - The directory path.
 * @param {string} currentName - The current file name.
 * @param {string} newName - The new file name.
 * @returns {Promise<Object>} The server response.
 */
export const renameFileApi = async (path, currentName, newName) => {
    const url = `${BASE_URL}/upload?path=${encodeURIComponent(path)}&action=rename&filename=${encodeURIComponent(currentName)}&newname=${encodeURIComponent(newName)}`;

    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to rename file: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error renaming file: ${error}`);
        throw error;
    }
};

/**
 * Deletes a file on the server.
 * @param {string} path - The directory path.
 * @param {string} fileName - The name of the file to delete.
 * @returns {Promise<Object>} The server response.
 */
export const deleteFileApi = async (path, fileName) => {
    const url = `${BASE_URL}/upload?path=${encodeURIComponent(path)}&action=deletedir&filename=${encodeURIComponent(fileName)}`;

    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to delete file: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error deleting file: ${error}`);
        throw error;
    }
};

/**
 * Executes a file on the server.
 * @param {string} filePath - The file path to execute.
 * @param {number} [updateInterval=50] - The update interval in ms.
 * @returns {Promise<Object|null>} The server response or null.
 */
export const executeFileApi = async (filePath, updateInterval = 50) => {
    const commandText = `$SD/Run=${encodeURIComponent(filePath)}`;
    const url = `${BASE_URL}/command?commandText=${commandText}&PAGEID=0`;

    try {
        await sendCommand(`$Report/Interval=${updateInterval}`);

        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Failed to execute file: ${response.status}`);
        }

        const text = await response.text();
        return text.trim() ? JSON.parse(text) : null;
    } catch (error) {
        console.error(`Error executing file: ${error}`);
        throw error;
    }
};

/**
 * Downloads a file from the server.
 * @param {string} filePath - The file path to download.
 */
export const downloadFileApi = async (filePath) => {
    const url = `${BASE_URL}/${encodeURIComponent(filePath)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'cache-control': 'no-cache',
                'pragma': 'no-cache',
            },
            mode: 'cors',
        });

        if (!response.ok) {
            throw new Error(`Failed to download file: ${response.status}`);
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filePath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
};

/**
 * Uploads a file to the server with progress tracking.
 * @param {File} file - The file to upload.
 * @param {string} path - The path where the file should be uploaded.
 * @param {function} onProgress - Callback function for upload progress.
 * @returns {Promise<Object>} - The server's response.
 */
export const uploadFileApi = (file, path = '/', onProgress) => {
    const url = `${BASE_URL}/upload`;
  
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
    
        formData.append('path', path);
        formData.append('myfile[]', file, file.name);
    
        xhr.open('POST', url, true);
    
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && typeof onProgress === 'function') {
            const progress = Math.round((event.loaded / event.total) * 100);
            console.log('Progress:', progress); // Вывод прогресса
            onProgress(progress);
          }
        };
    
        xhr.onload = () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (error) {
              reject(new Error('Failed to parse server response'));
            }
          } else {
            reject(new Error(`Failed to upload file: ${xhr.status}`));
          }
        };
    
        xhr.onerror = () => {
          reject(new Error('An error occurred during the file upload.'));
        };
    
        xhr.send(formData);
      });
  };
  
