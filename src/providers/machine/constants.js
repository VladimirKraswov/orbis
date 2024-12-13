export const DEV_URL = 'api';

export const BASE_URL = process.env.NODE_ENV === 'development' 
    ? DEV_URL 
    : window.location.origin;

export const WEBSOCKET_URL = process.env.NODE_ENV === 'development' 
    ? 'ws://localhost:5173/ws' 
    : `${window.location.origin.replace(/^http/, 'ws')}:81/`;
    
export const RECONNECT_INTERVAL = 5000;

export const HIDDEN_FILES = [
  'System Volume Information',
  '.Spotlight-V100',
  '.fseventsd',
  'Thumbs.db',
  '.DS_Store',
];
