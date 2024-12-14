import { useRef, useState } from 'preact/hooks';

import { Table, Modal, Button, FeatureContainer, Box, SvgIcon, DotMenu } from '../../components';

import { useMachine } from '../../providers/machine';

import { styles } from './styles';
import { icons } from '../../icons';
import { humanizeSize } from '../../utils';

const FeatureSdFiles = () => {
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null });
  const [inputValue, setInputValue] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);


  const {
    fs: { files, isLoading, error, fetchFiles, createFolder, renameFile, deleteFile, executeFile, downloadFile, uploadFile },
  } = useMachine();

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setIsUploading(true);
    setUploadProgress(0);
  
    try {
      await uploadFile(file, '/', (progress) => {
        console.log('Progress:', progress);
        setUploadProgress(progress);
      });
      console.log(`File ${file.name} uploaded successfully.`);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
      event.target.value = null;
    }
  };
  

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const cancelUpload = () => {
    setIsUploading(false);
    setUploadProgress(0);
    console.log('Upload canceled by the user.');
  };

  const openDialog = (type, data = null) => {
    setDialog({ isOpen: true, type, data });
    setInputValue(type === 'rename' ? data?.shortname || '' : '');
  };

  const closeDialog = () => {
    setDialog({ isOpen: false, type: '', data: null });
    setInputValue('');
  };

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
      file.size !== '-1' ? humanizeSize(file.size) : 'Directory',
      <DotMenu
        options={[
          {
            label: 'Execute',
            icon: <SvgIcon source={icons.play} fillColor="#4caf50" />,
            onClick: () => openDialog('execute', file),
          },
          {
            label: 'Rename',
            icon: "✏️",
            onClick: () => openDialog('rename', file),
          },
          {
            label: 'Delete',
            icon: <SvgIcon source={icons.trash} fillColor="#a52019" />,
            onClick: () => openDialog('delete', file),
          },
          // {
          //   label: 'Download',
          //   icon: <SvgIcon source={icons.download} fillColor="#1e88e5" />,
          //   onClick: () => console.log('Download', file),
          // },
        ]}
      />,
    ]);

  return (
    <FeatureContainer
      title="SD Files"
      contentStyle={styles.container}
      headerElements={
        <Box gap="1rem">
          <Button variant="outlined" onClick={fetchFiles}>Refresh</Button>
          <Button variant="secondary" onClick={() => openDialog('create-folder')}>Create Folder</Button>
          <Button variant="secondary" onClick={triggerFileInput}>Upload</Button>
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </Box>
      }
    >
      {isLoading && <p style={styles.loading}>Loading files...</p>}
      {error && <p style={styles.error}>Error: {error}</p>}

      {!isLoading && !error && (
        <Table columns={['Name', 'Size', 'Actions']} data={renderFileRows()} />
      )}

      {uploadProgress > 0 && (
        <div style={styles.uploadProgress}>
          <p>Upload Progress: {uploadProgress}%</p>
          <progress value={uploadProgress} max="100"></progress>
        </div>
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
      <Modal isOpen={isUploading} onClose={() => {}}>
        <div style={styles.modalContent}>
          <p style={styles.loadingText}>Uploading file... {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" style={styles.progressBar}></progress>
          <Button variant="secondary" onClick={cancelUpload}>Cancel Upload</Button>
        </div>
      </Modal>
    </FeatureContainer>
  );
};

export default FeatureSdFiles;
