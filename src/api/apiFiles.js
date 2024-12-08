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
export const createFolderApi = async (folderName) => {
  const url = `/api/upload?path=/${encodeURIComponent(folderName)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to create folder: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error creating folder: ${error}`);
    throw error;
  }
};

// @ts-ignore
export const renameFileApi = async (currentName, newName) => {
  const url = `/api/upload?path=/${encodeURIComponent(currentName)}&newname=${encodeURIComponent(newName)}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error(`Failed to rename file: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error renaming file: ${error}`);
    throw error;
  }
};

// @ts-ignore
export const deleteFileApi = async (fileName) => {
  const url = `/api/upload?path=/${encodeURIComponent(fileName)}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
    throw error;
  }
};
