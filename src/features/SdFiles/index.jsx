import { useState, useEffect } from 'preact/hooks';
import { Table, Modal, Button } from '../../components';
import { styles } from './styles';
import { createFolderApi, deleteFileApi, fetchFilesApi, renameFileApi, executeFileApi } from '../../api/apiFiles';

const SdFiles = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null });
  const [newFolderName, setNewFolderName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  const hiddenFiles = [
    'System Volume Information',
    '.Spotlight-V100',
    '.fseventsd',
    'Thumbs.db',
    '.DS_Store',
  ];

  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchFilesApi('/');
      const visibleFiles = data.filter((file) => !hiddenFiles.includes(file.name));
      setFiles(visibleFiles);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDialogConfirm = async () => {
    const { type, data } = dialog;
    setIsModalLoading(true);
  
    try {
      if (type === 'create-folder') {
        if (!newFolderName.trim()) return;
  
        const response = await createFolderApi('/', newFolderName);
  
        // Проверяем, что response существует и содержит поле files
        const updatedFiles = response?.files?.filter((file) => !hiddenFiles.includes(file.name)) || [];
        setFiles(updatedFiles);
      } else if (type === 'rename') {
        if (!renameValue.trim()) return;
        await renameFileApi('/', data.shortname, renameValue);
        fetchFiles(); // Обновляем список файлов после переименования
      } else if (type === 'delete') {
        const response = await deleteFileApi('/', data.shortname);
  
        // Проверяем, что response существует и содержит поле files
        const updatedFiles = response?.files?.filter((file) => !hiddenFiles.includes(file.name)) || [];
        setFiles(updatedFiles);
      } else if (type === 'execute') {
        await executeFileApi(data.shortname);
      } else {
        fetchFiles(); // Обновляем список файлов для всех остальных действий
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsModalLoading(false);
      closeDialog();
    }
  };
  

  const openDialog = (type, data = null) => {
    setDialog({ isOpen: true, type, data });
    if (type === 'create-folder') setNewFolderName('');
    if (type === 'rename') setRenameValue(data?.shortname || '');
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, type: '', data: null });
    setNewFolderName('');
    setRenameValue('');
  };

  const fileRows = files.map((file) => [
    file.size === '-1' ? '📁 ' + file.shortname : '📄 ' + file.shortname,
    file.size !== '-1' ? `${file.size} bytes` : 'Directory',
    <>
      <Button type="primary" onClick={() => openDialog('execute', file)}>
        ▶️
      </Button>
      <Button type="secondary" onClick={() => openDialog('rename', file)}>
        ✏️
      </Button>
      <Button type="outlined" onClick={() => openDialog('delete', file)}>
        🗑️
      </Button>
    </>,
  ]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>SD Files</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <Button type="primary" onClick={fetchFiles}>
          Refresh
        </Button>
        <Button type="secondary" onClick={() => openDialog('create-folder')}>
          Create Folder
        </Button>
      </div>
      {isLoading && <p style={{ color: '#aaaaaa' }}>Loading files...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!isLoading && !error && (
        <Table
          columns={['Name', 'Size', 'Actions']}
          data={fileRows}
        />
      )}
      <Modal isOpen={dialog.isOpen} onClose={closeDialog}>
        {isModalLoading ? (
          // @ts-ignore
          <p>Loading...</p>
        ) : (
          <>
            {dialog.type === 'create-folder' && (
              <>
                <h3>Create New Folder</h3>
                <input
                  style={styles.input}
                  value={newFolderName}
                  // @ts-ignore
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                />
              </>
            )}
            {dialog.type === 'rename' && (
              <>
                <h3>Rename File/Folder</h3>
                <input
                  style={styles.input}
                  value={renameValue}
                  // @ts-ignore
                  onChange={(e) => setRenameValue(e.target.value)}
                  placeholder="New name"
                />
              </>
            )}
            {dialog.type === 'delete' && (
              <p>Are you sure you want to delete {dialog.data?.shortname}?</p>
            )}
            {dialog.type === 'execute' && (
              <p>Do you want to execute {dialog.data?.shortname}?</p>
            )}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <Button type="primary" onClick={handleDialogConfirm}>
                Confirm
              </Button>
              <Button type="secondary" onClick={closeDialog}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SdFiles;
