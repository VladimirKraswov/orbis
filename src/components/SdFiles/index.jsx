// @ts-ignore
// @ts-ignore
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// @ts-ignore
const SdFiles = ({ apiUrl }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // @ts-ignore
  const [openMenu, setOpenMenu] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, type: '', data: null });
  const [newFolderName, setNewFolderName] = useState('');
  const [renameValue, setRenameValue] = useState('');

  const hiddenFiles = [
    "System Volume Information",
    ".Spotlight-V100",
    ".fseventsd",
    "Thumbs.db",
    ".DS_Store",
  ];

  // Функция для загрузки файлов
  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/upload?path=/`, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`Failed to fetch files: ${response.status}`);
      }

      const data = await response.json();
      const visibleFiles = data.files.filter((file) => !hiddenFiles.includes(file.name));
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

  const handleCreateFolder = () => {
    setDialog({ isOpen: true, type: 'create-folder', data: null });
  };

  const handleRename = (file) => {
    setRenameValue(file.shortname);
    setDialog({ isOpen: true, type: 'rename', data: file });
  };

  const handleDelete = (file) => {
    setDialog({ isOpen: true, type: 'delete', data: file });
  };

  const handleRun = (file) => {
    console.log(`Run action triggered for file: ${file.shortname}`);
    // Реализуйте логику запуска файла
  };

  const handleDialogConfirm = async () => {
    const { type, data } = dialog;

    try {
      if (type === 'create-folder') {
        if (!newFolderName.trim()) return;
        await fetch(`/api/upload?path=/${newFolderName}`, { method: 'POST' });
      } else if (type === 'rename') {
        if (!renameValue.trim()) return;
        await fetch(`/api/upload?path=/${data.shortname}&newname=${renameValue}`, { method: 'PUT' });
      } else if (type === 'delete') {
        await fetch(`/api/upload?path=/${data.shortname}`, { method: 'DELETE' });
      }
      fetchFiles(); // Обновить список файлов
    } catch (err) {
      setError(err.message);
    } finally {
      setDialog({ isOpen: false, type: '', data: null });
      setNewFolderName('');
      setRenameValue('');
    }
  };

  const handleDialogCancel = () => {
    setDialog({ isOpen: false, type: '', data: null });
    setNewFolderName('');
    setRenameValue('');
  };

  return (
    <div
      style={{
        backgroundColor: '#252526',
        color: '#ffffff',
        overflowY: 'auto',
        border: '1px solid #444',
        borderRadius: '4px',
        fontFamily: 'monospace',
        padding: '8px',
        aspectRatio: '1 / 1',
      }}
    >
      <h2 style={headerStyle}>SD Files:</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <button style={buttonStyle} onClick={fetchFiles}>
          Refresh
        </button>
        <button style={buttonStyle} onClick={handleCreateFolder}>
          Create Folder
        </button>
        <label style={uploadLabelStyle}>
          Upload File
          <input type="file" style={{ display: 'none' }} />
        </label>
      </div>
      {isLoading && <p style={{ color: '#aaaaaa' }}>Loading files...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!isLoading && !error && (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index} style={fileRowStyle}>
                <td style={tdStyle}>
                  {file.size === '-1' ? (
                    <span style={{ marginRight: '8px' }}>📁</span>
                  ) : (
                    <span style={{ marginRight: '8px' }}>📄</span>
                  )}
                  {file.shortname}
                </td>
                <td style={tdStyle}>{file.size !== '-1' ? `${file.size} bytes` : 'Directory'}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button style={runButtonStyle} onClick={() => handleRun(file)}>
                      ▶️
                    </button>
                    <button style={renameButtonStyle} onClick={() => handleRename(file)}>
                      ✏️
                    </button>
                    <button style={deleteButtonStyle} onClick={() => handleDelete(file)}>
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {dialog.isOpen && (
        <div style={dialogStyle}>
          <h3 style={{ marginBottom: '8px' }}>
            {dialog.type === 'create-folder' && 'Create New Folder'}
            {dialog.type === 'rename' && 'Rename File/Folder'}
            {dialog.type === 'delete' && 'Confirm Deletion'}
          </h3>
          {dialog.type === 'create-folder' && (
            <input
              type="text"
              value={newFolderName}
              // @ts-ignore
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              style={inputStyle}
            />
          )}
          {dialog.type === 'rename' && (
            <input
              type="text"
              value={renameValue}
              // @ts-ignore
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder="New name"
              style={inputStyle}
            />
          )}
          {dialog.type === 'delete' && (
            <p>Are you sure you want to delete {dialog.data?.shortname}?</p>
          )}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button style={buttonStyle} onClick={handleDialogConfirm}>
              Confirm
            </button>
            <button style={buttonStyle} onClick={handleDialogCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Стили
const headerStyle = {
  margin: '0',
  padding: '8px',
  backgroundColor: '#2a2a2a',
  borderBottom: '1px solid #3c3c3c',
  fontSize: '16px',
  color: '#f4f4f4',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle = {
  textAlign: 'left',
  padding: '8px',
  backgroundColor: '#3a3a3a',
  color: '#eaeaea',
  borderBottom: '1px solid #4c4c4c',
};

const tdStyle = {
  padding: '8px',
  color: '#dedede',
  borderBottom: '1px solid #3c3c3c',
};

const fileRowStyle = {
  backgroundColor: '#2e2e2e',
  transition: 'background-color 0.3s',
};

const buttonStyle = {
  backgroundColor: '#3b3b3b',
  color: '#f4f4f4',
  border: '1px solid #444',
  borderRadius: '4px',
  padding: '6px 12px',
  cursor: 'pointer',
  fontSize: '14px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s, box-shadow 0.3s',
};

const runButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
  color: '#ffffff',
};

const renameButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#2196F3',
  color: '#ffffff',
};

const deleteButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#FF5722',
  color: '#ffffff',
};

const uploadLabelStyle = {
  backgroundColor: '#3b3b3b',
  color: '#f4f4f4',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  border: '1px solid #444',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s',
};

const dialogStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#2e2e2e',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  color: '#f4f4f4',
  width: '320px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #444',
  backgroundColor: '#2a2a2a',
  color: '#f4f4f4',
  fontSize: '14px',
};

// Hover эффекты
fileRowStyle[':hover'] = {
  backgroundColor: '#383838',
};

buttonStyle[':hover'] = {
  backgroundColor: '#4b4b4b',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
};

uploadLabelStyle[':hover'] = {
  backgroundColor: '#4b4b4b',
};


export default SdFiles;
