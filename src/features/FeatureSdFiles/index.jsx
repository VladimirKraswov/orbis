import { useRef, useState } from 'preact/hooks';
import {
  Table,
  Modal,
  Button,
  FeatureContainer,
  Box,
  SvgIcon,
  DotMenu,
  CustomInput,
} from '../../components';
import { useMachine } from '../../providers/machine';
import { styles } from './styles';
import { icons } from '../../icons';
import { humanizeSize } from '../../utils';
import MemoryStatus from './components/MemoryStatus';

const FeatureSdFiles = () => {
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null, input: '' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef(null);

  const {
    fs: {
      files,
      isLoading,
      error,
      fetchFiles,
      createFolder,
      renameFile,
      deleteFile,
      executeFile,
      uploadFile,
      status,
    },
  } = useMachine();

  // File and Folder Operations
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await uploadFile(file, status.path, (progress) => setUploadProgress(progress));
      fetchFiles(status.path);
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
      event.target.value = null;
    }
  };

  const navigateTo = (newPath) => fetchFiles(newPath);

  const navigateUp = () => {
    if (status.path === '/') return;
    const parentPath = status.path.slice(0, status.path.lastIndexOf('/')) || '/';
    fetchFiles(parentPath);
  };

  const openDialog = (type, data = null) =>
    setDialog({ isOpen: true, type, data, input: data?.shortname || '' });

  const closeDialog = () => setDialog({ isOpen: false, type: '', data: null, input: '' });

  const handleDialogConfirm = async () => {
    const { type, data, input } = dialog;
    if (!type || !input.trim()) return;

    try {
      switch (type) {
        case 'create-folder':
          await createFolder(input.trim(), status.path);
          break;
        case 'rename':
          await renameFile(data.shortname, input.trim(), status.path);
          break;
        case 'delete':
          await deleteFile(data.shortname, status.path);
          break;
        case 'execute':
          await executeFile(data.shortname);
          break;
        default:
          console.warn('Unknown dialog type');
      }
      fetchFiles(status.path);
    } catch (err) {
      console.error(`Error during ${type} action:`, err);
    } finally {
      closeDialog();
    }
  };

  const handleRowClick = (file) => {
    if (!file.size) return

    if (file.size === '-1') {
      navigateTo(`${status.path}/${file.shortname}`);
    } else {
      openDialog('execute', file);
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

  const renderFileRows = () => {
    const rows = [];

    if (status.path !== '/') {
      rows.push([
        <span
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          onClick={navigateUp}
        >
          <SvgIcon source={icons.folderUp} fillColor="#FFC107" />
          ..
        </span>,
        'Parent Directory',
        null,
      ]);
    }

    rows.push(
      ...files.map((file) => [
        <span
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          onClick={() => handleRowClick(file)}
        >
          <SvgIcon
            source={file.size === '-1' ? icons.folder : icons.file}
            fillColor={file.size === '-1' ? '#FFC107' : 'white'}
          />
          {file.shortname}
        </span>,
        file.size !== '-1' ? humanizeSize(file.size) : 'Directory',
        <DotMenu options={renderFileActions(file)} />,
      ])
    );

    return rows;
  };

  const renderDialogContent = () => {
    const { type, input } = dialog;

    if (type === 'delete') {
      return <p>Confirm deletion?</p>;
    }

    return (
      <Box fullWidth column >
        <p>{type === 'create-folder' ? 'Create New Folder:' : 'Rename File/Folder:'}</p>
        <CustomInput
          value={input}
          onChange={(e) => setDialog((prev) => ({ ...prev, input: e.target.value }))}
          placeholder="Enter name"
        />
      </Box>
    );
  };

  // Render
  return (
    <FeatureContainer
      title={`SD Files - ${status.path}`}
      contentStyle={styles.container}
      headerElements={
        <Box gap="1rem">
          <Button variant="outlined" onClick={() => fetchFiles(status.path)}>
            Refresh
          </Button>
          <Button variant="secondary" onClick={() => openDialog('create-folder')}>
            Create Folder
          </Button>
          <Button variant="secondary" onClick={() => inputRef.current?.click()}>
            Upload
          </Button>
          <input type="file" ref={inputRef} onChange={handleFileSelect} style={{ display: 'none' }} />
        </Box>
      }
    >
      <Box fullHeight column>
        {isLoading && <p style={styles.loading}>Loading files...</p>}
        {error && <p style={styles.error}>Error: {error}</p>}

        {!isLoading && !error && (
          <Table
            columns={['Name', 'Size', 'Actions']}
            data={renderFileRows()}
            onRowClick={(row) => handleRowClick(row[0]?.props?.children || row)}
          />
        )}

        {status && (
          <MemoryStatus
            total={status.total}
            used={status.used}
            occupation={status.occupation}
          />
        )}
      </Box>

      <Modal isOpen={dialog.isOpen} onClose={closeDialog}>
        <Box column gap="1rem" style={styles.modalContent}>
          {renderDialogContent()}
          <Box justifyContent="flex-end" gap="12px">
            <Button
              variant="primary"
              onClick={handleDialogConfirm}
              disabled={!dialog.input.trim() && dialog.type !== 'delete'}
            >
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
          <Button variant="secondary" onClick={() => setIsUploading(false)}>
            Cancel Upload
          </Button>
        </Box>
      </Modal>
    </FeatureContainer>
  );
};

export default FeatureSdFiles;
