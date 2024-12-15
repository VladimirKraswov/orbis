import { useRef, useState } from 'preact/hooks';
import { Table, Modal, Button, FeatureContainer, Box, SvgIcon, DotMenu } from '../../components';
import { useMachine } from '../../providers/machine';
import { styles } from './styles';
import { icons } from '../../icons';
import { humanizeSize } from '../../utils';
import MemoryStatus from './components/MemoryStatus';

const FeatureSdFiles = () => {
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const {
    fs: { files, isLoading, error, fetchFiles, createFolder, renameFile, deleteFile, executeFile, uploadFile, status },
  } = useMachine();

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await uploadFile(file, '/', (progress) => setUploadProgress(progress));
      console.log(`File ${file.name} uploaded successfully.`);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
      event.target.value = null;
    }
  };

  const triggerFileInput = () => inputRef.current?.click();

  const openDialog = (type, data = null) => setDialog({ isOpen: true, type, data });
  const closeDialog = () => setDialog({ isOpen: false, type: '', data: null });

  const handleDialogConfirm = async () => {
    const { type, data } = dialog;
    if (!type) return;

    try {
      switch (type) {
        case 'create-folder':
          await createFolder(data);
          break;
        case 'rename':
          await renameFile(data.shortname, data.newName);
          break;
        case 'delete':
          await deleteFile(data.shortname);
          break;
        case 'execute':
          await executeFile(data.shortname);
          break;
        default:
          console.warn('Unknown dialog type');
      }
    } catch (err) {
      console.error(`Error during ${type} action:`, err);
    } finally {
      closeDialog();
    }
  };

  const renderFileActions = (file) => [
    {
      label: 'Execute',
      icon: <SvgIcon source={icons.play} fillColor="#4caf50" />,
      onClick: () => openDialog('execute', file),
    },
    {
      label: 'Rename',
      icon: <SvgIcon source={icons.pencil} fillColor="#ffffff" />,
      onClick: () => openDialog('rename', file),
    },
    {
      label: 'Delete',
      icon: <SvgIcon source={icons.trash} fillColor="#a52019" />,
      onClick: () => openDialog('delete', file),
    },
  ];

  const renderFileRows = () =>
    files.map((file) => [
      file.size === '-1' ? `📁 ${file.shortname}` : `📄 ${file.shortname}`,
      file.size !== '-1' ? humanizeSize(file.size) : 'Directory',
      <DotMenu options={renderFileActions(file)} />,
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
          <input type="file" ref={inputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
        </Box>
      }
    >
      <Box fullHeight column>
        {isLoading && <p style={styles.loading}>Loading files...</p>}
        {error && <p style={styles.error}>Error: {error}</p>}

        {!isLoading && !error && (
          <Table columns={['Name', 'Size', 'Actions']} data={renderFileRows()} />
        )}
      
        {status && (
          <MemoryStatus total={status.total} used={status.used} occupation={status.occupation} />
        )}
      </Box>

      <Modal isOpen={dialog.isOpen} onClose={closeDialog}>
        <Box column gap="1rem" style={styles.modalContent}>
          <p>{dialog.type === 'delete' ? 'Confirm deletion?' : `Perform ${dialog.type}?`}</p>
          <Box justifyContent="flex-end" gap="12px">
            <Button variant="primary" onClick={handleDialogConfirm}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal isOpen={isUploading} onClose={() => {}}>
        <Box column alignItems="center" style={styles.modalContent}>
          <p>Uploading file... {uploadProgress}%</p>
          <progress value={uploadProgress} max="100" style={styles.progressBar} />
          <Button variant="secondary" onClick={() => setIsUploading(false)}>Cancel Upload</Button>
        </Box>
      </Modal>
    </FeatureContainer>
  );
};

export default FeatureSdFiles;
