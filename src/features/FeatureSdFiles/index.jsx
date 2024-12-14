import { useState } from 'preact/hooks';

import { Table, Modal, Button, FeatureContainer, Box } from '../../components';

import { useMachine } from '../../providers/machine';

import { styles } from './styles';


const FeatureSdFiles = () => {
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null });
  const [inputValue, setInputValue] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  const {
    fs: { files, isLoading, error, fetchFiles, createFolder, renameFile, deleteFile, executeFile },
  } = useMachine();

  const handleDialogConfirm = async () => {
    setIsModalLoading(true);
    try {
      const { type, data } = dialog;

      switch (type) {
        case 'create-folder':
          await createFolder(inputValue);
          break;
        case 'rename':
          await renameFile(data.shortname, inputValue);
          break;
        case 'delete':
          await deleteFile(data.shortname);
          break;
        case 'execute':
          await executeFile(data.shortname);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(`Error during ${dialog.type} action:`, err);
    } finally {
      setIsModalLoading(false);
      closeDialog();
    }
  };

  const openDialog = (type, data = null) => {
    setDialog({ isOpen: true, type, data });
    setInputValue(type === 'rename' ? data?.shortname || '' : '');
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, type: '', data: null });
    setInputValue('');
  };

  const renderDialogContent = () => {
    const { type, data } = dialog;

    switch (type) {
      case 'create-folder':
        return (
          <>
            <h3 style={styles.dialogHeader}>Create New Folder</h3>
            <input
              style={styles.input}
              value={inputValue}
              // @ts-ignore
              onChange={(e) => setInputValue(e.target.value)}
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
              value={inputValue}
              // @ts-ignore
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="New name"
            />
          </>
        );
      case 'delete':
        return <p>Are you sure you want to delete <strong>{data?.shortname}</strong>?</p>;
      case 'execute':
        return <p>Do you want to execute <strong>{data?.shortname}</strong>?</p>;
      default:
        return null;
    }
  };

  const renderFileRows = () =>
    files.map((file) => [
      file.size === '-1' ? `📁 ${file.shortname}` : `📄 ${file.shortname}`,
      file.size !== '-1' ? `${file.size} bytes` : 'Directory',
      <div style={styles.actions}>
        <Button variant="outlined" onClick={() => openDialog('execute', file)}>▶️</Button>
        <Button variant="outlined" onClick={() => openDialog('rename', file)}>✏️</Button>
        <Button variant="outlined" onClick={() => openDialog('delete', file)}>🗑️</Button>
      </div>,
    ]);

  return (
    <FeatureContainer
      title="SD Files"
      contentStyle={styles.container}
      headerElements={
        <Box gap="1rem">
          <Button variant="outlined" onClick={fetchFiles}>Refresh</Button>
          <Button variant="secondary" onClick={() => openDialog('create-folder')}>Create Folder</Button>
        </Box>
      }
    >

      {isLoading && <p style={styles.loading}>Loading files...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      {!isLoading && !error && (
        <Table columns={['Name', 'Size', 'Actions']} data={renderFileRows()} />
      )}

      <Modal isOpen={dialog.isOpen} onClose={closeDialog}>
        {isModalLoading ? <p style={styles.loading}>Processing...</p> : renderDialogContent()}
        <div style={styles.dialogActions}>
          <Button
            variant="primary"
            onClick={handleDialogConfirm}
            disabled={dialog.type === 'create-folder' || dialog.type === 'rename' ? !inputValue.trim() : false}
          >
            Confirm
          </Button>
          <Button type="secondary" onClick={closeDialog}>Cancel</Button>
        </div>
      </Modal>
    </FeatureContainer>
  );
};

export default FeatureSdFiles;
