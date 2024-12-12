import { useState, useEffect } from 'preact/hooks';
import { Table, Modal, Button } from '../../components';
import { createFolderApi, deleteFileApi, fetchFilesApi, renameFileApi, executeFileApi } from '../../api/apiFiles';
import { styles } from './styles';

const HIDDEN_FILES = [
  'System Volume Information',
  '.Spotlight-V100',
  '.fseventsd',
  'Thumbs.db',
  '.DS_Store',
];

const SdFiles = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null });
  const [newFolderName, setNewFolderName] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchFilesApi('/');
      setFiles(data.filter((file) => !HIDDEN_FILES.includes(file.name)));
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
      switch (type) {
        case 'create-folder':
          if (newFolderName.trim()) {
            const response = await createFolderApi('/', newFolderName);
            setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
          }
          break;

        case 'rename':
          if (renameValue.trim()) {
            await renameFileApi('/', data.shortname, renameValue);
            fetchFiles();
          }
          break;

        case 'delete':
          const response = await deleteFileApi('/', data.shortname);
          setFiles(response?.files?.filter((file) => !HIDDEN_FILES.includes(file.name)) || []);
          break;

        case 'execute':
          await executeFileApi(data.shortname);
          break;

        default:
          fetchFiles();
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

  const renderDialogContent = () => {
    switch (dialog.type) {
      case 'create-folder':
        return (
          <>
            <h3 style={styles.dialogHeader}>Create New Folder</h3>
            <input
              style={styles.input}
              value={newFolderName}
              // @ts-ignore
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
            />
          </>
        );
      case 'rename':
        return (
          <>
            <h3 style={styles.dialogHeader}>Rename File/Folder</h3>
            <input
              style={styles.input}
              value={renameValue}
              // @ts-ignore
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder="New name"
            />
          </>
        );
      case 'delete':
        return <p>Are you sure you want to delete <strong>{dialog.data?.shortname}</strong>?</p>;
      case 'execute':
        return <p>Do you want to execute <strong>{dialog.data?.shortname}</strong>?</p>;
      default:
        return null;
    }
  };

  const renderFileRows = () =>
    files.map((file) => [
      file.size === '-1' ? `📁 ${file.shortname}` : `📄 ${file.shortname}`,
      file.size !== '-1' ? `${file.size} bytes` : 'Directory',
      <div style={styles.actions}>
        <Button type="primary" onClick={() => openDialog('execute', file)}>
          ▶️
        </Button>
        <Button type="secondary" onClick={() => openDialog('rename', file)}>
          ✏️
        </Button>
        <Button type="outlined" onClick={() => openDialog('delete', file)}>
          🗑️
        </Button>
      </div>,
    ]);

  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        <Button type="primary" onClick={fetchFiles}>
          Refresh
        </Button>
        <Button type="secondary" onClick={() => openDialog('create-folder')}>
          Create Folder
        </Button>
      </div>

      {isLoading && <p style={styles.loading}>Loading files...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      {!isLoading && !error && (
        <Table columns={['Name', 'Size', 'Actions']} data={renderFileRows()} />
      )}

      <Modal isOpen={dialog.isOpen} onClose={closeDialog}>
        {isModalLoading ? <p style={styles.loading}>Loading...</p> : renderDialogContent()}
        <div style={styles.dialogActions}>
          <Button
            type="primary"
            onClick={handleDialogConfirm}
            disabled={
              (dialog.type === 'create-folder' && !newFolderName.trim()) ||
              (dialog.type === 'rename' && !renameValue.trim())
            }
          >
            Confirm
          </Button>
          <Button type="secondary" onClick={closeDialog}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SdFiles;
