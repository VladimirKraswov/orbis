import { useEffect, useState } from 'react';
import {
  fetchFilesApi,
  createFolderApi,
  renameFileApi,
  deleteFileApi,
  executeFileApi,
  downloadFileApi,
  uploadFileApi,
} from './api';
import { HIDDEN_FILES } from './constants';

const useFileSystem = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({
    path: '/',
    total: '0 MB',
    used: '0 MB',
    occupation: '0%',
    state: 'Unknown',
  });

  console.log('Status:', status);
  

  const handleApiCall = async (apiCall, ...args) => {
    setIsLoading(true);
    setError(null);
    try {
      return await apiCall(...args);
    } catch (err) {
      setError(err.message);
      console.error(`API Error: ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = (data) => {
    setStatus({
      path: data?.path?.startsWith('/') ? data.path : '/',
      total: data?.total || '0 MB',
      used: data?.used || '0 MB',
      occupation: `${data?.occupation || 0}%`,
      state: data?.status || 'Unknown',
    });
  };
  

  const fetchFiles = async (path = status.path) => {
    const response = await handleApiCall(fetchFilesApi, path);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
    updateStatus(response);
  };

  const createFolder = async (folderName) => {
    if (!folderName.trim()) return;
    const response = await handleApiCall(createFolderApi, status.path, folderName);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
    updateStatus(response);
  };

  const renameFile = async (fileName, newFilename) => {
    if (!fileName.trim() || !newFilename.trim()) return;
    const response = await handleApiCall(renameFileApi, status.path, fileName, newFilename);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
    updateStatus(response);
  };

  const deleteFile = async (fileName) => {
    if (!fileName) return;
    const response = await handleApiCall(deleteFileApi, status.path, fileName);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
    updateStatus(response);
  };

  const executeFile = async (fileName) => {
    if (!fileName) return;
    await handleApiCall(executeFileApi, `${status.path}/${fileName}`);
  };

  const downloadFile = async (fileName) => {
    if (!fileName) return;
    await handleApiCall(downloadFileApi, `${status.path}/${fileName}`);
  };

  const uploadFile = async (file, onProgress) => {
    if (!file) return;
    const currentPath = status.path || '/';
  
    console.log(`Uploading file to: ${currentPath}`);
  
    const response = await handleApiCall(uploadFileApi, file, currentPath, onProgress);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
    updateStatus(response);
  };
  

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    isLoading,
    error,
    status,
    fetchFiles,
    createFolder,
    renameFile,
    deleteFile,
    executeFile,
    downloadFile,
    uploadFile,
  };
};

export default useFileSystem;
