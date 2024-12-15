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
import { normalizePath } from "../../utils";

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
      path:  data.path || '/',
      total: data?.total || '0 MB',
      used: data?.used || '0 MB',
      occupation: `${data?.occupation || 0}%`,
      state: data?.status || 'Unknown',
    });
  };

  const fetchFiles = async (path = status.path) => {
    const normalizedPath = normalizePath('/', path);
    console.log('Fetching files for path:', normalizedPath);
  
    const response = await handleApiCall(fetchFilesApi, normalizedPath);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
    updateStatus({ ...response, path: normalizedPath });
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
    const normalizedPath = normalizePath(status.path, fileName);
    await handleApiCall(executeFileApi, normalizedPath);
  };

  const downloadFile = async (fileName) => {
    if (!fileName) return;
    const normalizedPath = normalizePath(status.path, fileName);
    await handleApiCall(downloadFileApi, normalizedPath);
  };

  const uploadFile = async (file, onProgress) => {
    if (!file) return;
    const normalizedPath = normalizePath('/', status.path);

    console.log(`Uploading file to: ${normalizedPath}`);

    const response = await handleApiCall(uploadFileApi, file, normalizedPath, onProgress);
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
