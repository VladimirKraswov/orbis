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



// <div id="grbl_SD_status">/sd/iphoneF200.nc&nbsp;<progress id="print_prg" value="68.41" max="100"></progress>68.41%</div>

// <Run|MPos:26.151,-0.281,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-0.482,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-0.682,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-0.883,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-1.084,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-1.294,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-1.495,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-1.696,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-1.897,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-2.097,-1.101|FS:200,1000|Pn:PXYZ|SD:67.69,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-2.308,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:26.151,-2.519,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:25.971,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:25.771,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:25.570,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:25.360,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:25.160,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.959,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.749,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-2.388,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-2.188,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-1.987,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-1.786,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-1.575,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-1.375,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-1.174,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-0.973,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-0.763,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-0.562,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-0.361,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,-0.161,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,0.040,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,0.251,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,0.452,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,0.652,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,0.853,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.699,1.054,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.689,1.254,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.659,1.455,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.609,1.656,-1.101|FS:200,1000|Pn:PXYZ|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.529,1.846,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:68.41,/sd/iphoneF200.nc>
// <Run|MPos:24.439,2.037,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:69.20,/sd/iphoneF200.nc>
// <Run|MPos:24.318,2.198,-1.101|FS:200,1000|Pn:PXYZ|SD:69.20,/sd/iphoneF200.nc>
// <Run|MPos:24.168,2.338,-1.101|FS:200,1000|Pn:PXYZ|SD:69.20,/sd/iphoneF200.nc>
// <Run|MPos:23.998,2.438,-1.101|FS:200,1000|Pn:PXYZ|SD:69.20,/sd/iphoneF200.nc>
// <Run|MPos:23.798,2.519,-1.101|FS:200,1000|Pn:PXYZ|SD:69.65,/sd/iphoneF200.nc>
// <Run|MPos:23.597,2.549,-1.101|FS:200,1000|Pn:PXYZ|SD:70.09,/sd/iphoneF200.nc>
// <Run|MPos:23.387,2.549,-1.101|FS:200,1000|Pn:PXYZ|SD:70.53,/sd/iphoneF200.nc>
// <Run|MPos:23.177,2.529,-1.101|FS:200,1000|Pn:PXYZ|SD:70.98,/sd/iphoneF200.nc>
// <Run|MPos:22.976,2.459,-1.101|FS:200,1000|Pn:PXYZ|SD:72.21,/sd/iphoneF200.nc>
// <Run|MPos:22.796,2.378,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:72.21,/sd/iphoneF200.nc>
// <Run|MPos:22.626,2.268,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:72.21,/sd/iphoneF200.nc>
// <Run|MPos:22.466,2.127,-1.101|FS:200,1000|Pn:PXYZ|SD:72.21,/sd/iphoneF200.nc>
// <Run|MPos:22.335,1.977,-1.101|FS:200,1000|Pn:PXYZ|SD:72.21,/sd/iphoneF200.nc>
// <Run|MPos:22.225,1.806,-1.101|FS:200,1000|Pn:PXYZ|SD:72.21,/sd/iphoneF200.nc>
// <Run|MPos:22.125,1.626,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:22.055,1.435,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.995,1.234,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.955,1.034,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.935,0.843,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,0.632,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,0.421,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,0.221,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,0.020,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-0.181,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-0.381,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-0.582,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-0.793,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-0.993,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-1.194,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-1.395,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-1.596,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-1.806,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-2.007,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-2.208,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.925,-2.408,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.855,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.644,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.444,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.244,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:21.033,-2.539,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:72.97,/sd/iphoneF200.nc>
// <Run|MPos:20.823,-2.539,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.623,-2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-2.398,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-2.198,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-1.987,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-1.786,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-1.586,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-1.385,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-1.184,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-0.973,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-0.773,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-0.572,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-0.371,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,-0.171,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,0.040,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,0.241,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,0.442,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,0.642,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,0.843,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,1.054,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,1.254,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,1.455,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,1.656,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,1.856,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,2.057,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,2.258,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,2.469,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,2.669,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,2.870,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,3.071,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,3.281,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,3.482,-1.101|FS:192,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.563,3.683,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.663,3.813,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:20.873,3.813,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.073,3.813,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.274,3.813,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.474,3.813,-1.101|FS:192,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.684,3.813,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.825,3.753,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.825,3.552,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.825,3.342,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.825,3.141,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.825,2.940,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.825,2.740,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.865,2.719,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:21.975,2.880,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:22.105,3.041,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:22.245,3.191,-1.101|FS:200,1000|Pn:PXYZ|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:22.395,3.322,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:73.68,/sd/iphoneF200.nc>
// <Run|MPos:22.566,3.452,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:22.736,3.562,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:22.916,3.653,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:23.107,3.723,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:23.297,3.783,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:23.497,3.823,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:23.697,3.833,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:23.898,3.833,-1.101|FS:200,1000|Pn:PXYZ|SD:74.47,/sd/iphoneF200.nc>
// <Run|MPos:24.108,3.813,-1.101|FS:200,1000|Pn:PXYZ|SD:74.91,/sd/iphoneF200.nc>
// <Run|MPos:24.318,3.773,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:75.49,/sd/iphoneF200.nc>
// <Run|MPos:24.519,3.713,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:75.68,/sd/iphoneF200.nc>
// <Run|MPos:24.719,3.633,-1.101|FS:200,1000|Pn:PXYZ|SD:76.54,/sd/iphoneF200.nc>
// <Run|MPos:24.899,3.552,-1.101|FS:200,1000|Pn:PXYZ|SD:76.54,/sd/iphoneF200.nc>
// <Run|MPos:25.070,3.442,-1.101|FS:200,1000|Pn:PXYZ|SD:76.54,/sd/iphoneF200.nc>
// <Run|MPos:25.240,3.312,-1.101|FS:200,1000|Pn:PXYZ|SD:77.35,/sd/iphoneF200.nc>
// <Run|MPos:25.380,3.171,-1.101|FS:200,1000|Pn:PXYZ|SD:77.35,/sd/iphoneF200.nc>
// <Run|MPos:25.520,3.020,-1.101|FS:200,1000|Pn:PXYZ|SD:77.35,/sd/iphoneF200.nc>
// <Run|MPos:25.651,2.860,-1.101|FS:200,1000|Pn:PXYZ|SD:78.16,/sd/iphoneF200.nc>
// <Run|MPos:25.761,2.689,-1.101|FS:200,1000|Pn:PXYZ|SD:78.16,/sd/iphoneF200.nc>
// <Run|MPos:25.851,2.509,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:78.16,/sd/iphoneF200.nc>
// <Run|MPos:25.941,2.328,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:78.16,/sd/iphoneF200.nc>
// <Run|MPos:26.011,2.137,-1.101|FS:200,1000|Pn:PXYZ|SD:78.16,/sd/iphoneF200.nc>
// <Run|MPos:26.071,1.937,-1.101|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.111,1.736,-1.101|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.141,1.535,-1.101|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.335,-1.101|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,-0.936|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,-0.738|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,-0.533|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,-0.329|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,-0.125|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,0.079|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,0.278|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,0.482|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,0.681|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,0.885|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,1.089|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,1.294|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,1.498|FS:200,1000|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,1.696|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.151,1.294,1.901|FS:4700,0|Pn:PXYZ|Ov:100,100,100|A:S|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:26.161,1.294,2.099|FS:473,0|Pn:PXYZ|SD:78.96,/sd/iphoneF200.nc>
// <Run|MPos:29.386,1.325,2.099|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,2.054|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.855|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.651|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.447|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.248|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.044|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.840|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.635|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.437|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.233|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.028|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.170|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.374|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.579|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.783|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.987|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.310,1.425,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.290,1.636,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.259,1.826,-1.101|FS:200,1000|Pn:PXYZ|SD:79.67,/sd/iphoneF200.nc>
// <Run|MPos:31.209,2.037,-1.101|FS:200,1000|Pn:PXYZ|SD:80.42,/sd/iphoneF200.nc>
// <Run|MPos:31.149,2.228,-1.101|FS:200,1000|Pn:PXYZ|SD:80.42,/sd/iphoneF200.nc>
// <Run|MPos:31.069,2.418,-1.101|FS:200,1000|Pn:PXYZ|SD:80.42,/sd/iphoneF200.nc>
// <Run|MPos:30.969,2.599,-1.101|FS:200,1000|Pn:PXYZ|SD:81.18,/sd/iphoneF200.nc>
// <Run|MPos:30.849,2.760,-1.101|FS:200,1000|Pn:PXYZ|SD:81.18,/sd/iphoneF200.nc>
// <Run|MPos:30.709,2.900,-1.101|FS:200,1000|Pn:PXYZ|SD:81.18,/sd/iphoneF200.nc>
// <Run|MPos:30.528,3.020,-1.101|FS:200,1000|Pn:PXYZ|SD:81.95,/sd/iphoneF200.nc>
// <Run|MPos:30.358,3.111,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:81.95,/sd/iphoneF200.nc>
// <Run|MPos:30.148,3.171,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:82.80,/sd/iphoneF200.nc>
// <Run|MPos:29.937,3.201,-1.101|FS:200,1000|Pn:PXYZ|SD:83.40,/sd/iphoneF200.nc>
// <Run|MPos:29.717,3.191,-1.101|FS:200,1000|Pn:PXYZ|SD:84.07,/sd/iphoneF200.nc>
// <Run|MPos:29.507,3.151,-1.101|FS:200,1000|Pn:PXYZ|SD:84.49,/sd/iphoneF200.nc>
// <Run|MPos:29.316,3.071,-1.101|FS:200,1000|Pn:PXYZ|SD:85.24,/sd/iphoneF200.nc>
// <Run|MPos:29.146,2.980,-1.101|FS:200,1000|Pn:PXYZ|SD:85.24,/sd/iphoneF200.nc>
// <Run|MPos:28.986,2.850,-1.101|FS:200,1000|Pn:PXYZ|SD:85.24,/sd/iphoneF200.nc>
// <Run|MPos:28.836,2.699,-1.101|FS:200,1000|Pn:PXYZ|SD:86.00,/sd/iphoneF200.nc>
// <Run|MPos:28.715,2.539,-1.101|FS:200,1000|Pn:PXYZ|SD:86.00,/sd/iphoneF200.nc>
// <Run|MPos:28.605,2.368,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.00,/sd/iphoneF200.nc>
// <Run|MPos:28.535,2.168,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.475,1.977,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.415,1.786,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.375,1.586,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.345,1.385,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.505,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.705,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.916,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.116,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.316,1.345,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.527,1.345,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.727,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.937,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.138,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.338,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.548,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.749,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.959,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.159,1.345,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-1.061|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.857|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.652|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.448|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.250|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,-0.045|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.159|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.363|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.567|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.766|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,0.970|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.174|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.373|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.577|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.781|FS:647,0|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,1.345,1.986|FS:492,0|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.710,1.174,2.099|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,2.054|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,1.850|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,1.657|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,1.447|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,1.237|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,1.038|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,0.828|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,0.630|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,0.426|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,0.221|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,0.023|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,-0.182|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,-0.386|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,-0.596|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,-0.800|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.803,-1.004|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.702,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.552,0.502,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.541,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.341,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:32.141,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.931,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.730,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.520,0.301,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.320,0.301,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:31.119,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.909,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.709,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.508,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.308,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:30.098,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.867,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.667,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.457,0.301,-1.101|FS:200,1000|Pn:PXYZ|WCO:-4.000,-3.900,-0.900|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.246,0.301,-1.101|FS:200,1000|Pn:PXYZ|Ov:100,100,100|A:S|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:29.046,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.846,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.645,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:86.77,/sd/iphoneF200.nc>
// <Run|MPos:28.435,0.301,-1.101|FS:200,1000|Pn:PXYZ|SD:87.54,/sd/iphoneF200.nc>
// <Run|MPos:28.445,0.110,-1.101|FS:200,1000|Pn:PXYZ|SD:87.54,/sd/iphoneF200.nc>
// <Run|MPos:28.485,-0.080,-1.101|FS:200,1000|Pn:PXYZ|SD:87.54,/sd/iphoneF200.nc>
// <Run|MPos:28.545,-0.281,-1.101|FS:200,1000|Pn:PXYZ|SD:87.54,/sd/iphoneF200.nc>
// <Run|MPos:28.635,-0.462,-1.101|FS:200,1000|Pn:PXYZ|SD:87.54,/sd/iphoneF200.nc>
// <Run|MPos:28.735,-0.632,-1.101