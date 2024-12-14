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

  const fetchFiles = async () => {
    const data = await handleApiCall(fetchFilesApi, '/');
    setFiles(data.filter((file) => !HIDDEN_FILES.includes(file.name)));
  };

  const createFolder = async (folderName) => {
    if (!folderName.trim()) return;
    const response = await handleApiCall(createFolderApi, '/', folderName);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
  };

  const renameFile = async (fileName, newFilename) => {
    if (!fileName.trim() || !newFilename.trim()) return;
    await handleApiCall(renameFileApi, '/', fileName, newFilename);
    await fetchFiles();
  };

  const deleteFile = async (fileName) => {
    if (!fileName) return;
    const response = await handleApiCall(deleteFileApi, '/', fileName);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
  };

  const executeFile = async (fileName) => {
    if (!fileName) return;
    await handleApiCall(executeFileApi, fileName);
  };

  const downloadFile = async (fileName) => {
    if (!fileName) return;
    await handleApiCall(downloadFileApi, fileName);
  };

  const uploadFile = async (fileName) => {
    if (!fileName) return;
    const response = await handleApiCall(uploadFileApi, fileName);
    setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    isLoading,
    error,
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
