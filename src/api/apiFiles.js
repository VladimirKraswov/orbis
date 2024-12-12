import { sendHttpCommand } from "./apiCommands";

// @ts-ignore
export const fetchFilesApi = async (path = '/') => {
  const url = `/api/upload?path=${encodeURIComponent(path)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.status}`);
    }

    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error(`Error fetching files: ${error}`);
    throw error;
  }
};

// @ts-ignore
export const createFolderApi = async (path, folderName) => {
  const url = `/api/upload?path=${encodeURIComponent(path)}&action=createdir&filename=${encodeURIComponent(folderName)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to create folder: ${response.status}`);
    }

    // Парсим JSON-ответ, если сервер возвращает обновлённый список файлов
    const data = await response.json();
    return data; // Убедитесь, что data содержит поле files
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
    throw error;
  }
};


// @ts-ignore
export const renameFileApi = async (path, currentName, newName) => {
  const url = `/api/upload?path=${encodeURIComponent(path)}&action=rename&filename=${encodeURIComponent(currentName)}&newname=${encodeURIComponent(newName)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to rename file: ${response.status}`);
    }

    // Парсим JSON-ответ, если сервер возвращает обновлённый список файлов
    const data = await response.json();
    return data; // Убедитесь, что data содержит поле files
  } catch (error) {
    console.error(`Error renaming file: ${error}`);
    throw error;
  }
};

// @ts-ignore
export const deleteFileApi = async (path, fileName) => {
  const url = `/api/upload?path=${encodeURIComponent(path)}&action=deletedir&filename=${encodeURIComponent(fileName)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.status}`);
    }

    // Парсим JSON-ответ, если сервер возвращает обновлённый список файлов
    const data = await response.json();
    return data; // Убедитесь, что data содержит поле files
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
    throw error;
  }
};

// @ts-ignore
// @ts-ignore
export const executeFileApi = async (filePath, updateInterval = 50) => {
  const commandText = `$SD/Run=${encodeURIComponent(filePath)}`;
  const url = `/api/command?commandText=${commandText}&PAGEID=0`;

  try {
    await sendHttpCommand(`$Report/Interval=${updateInterval}`);

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to execute file: ${response.status}`);
    }

    const text = await response.text();
    if (text.trim()) {
      return JSON.parse(text);
    }

    return null;
  } catch (error) {
    console.error(`Error executing file: ${error}`);
    throw error;
  }
};