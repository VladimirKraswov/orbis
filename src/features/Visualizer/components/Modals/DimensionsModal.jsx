import { useState } from 'preact/hooks';
import { Modal } from '../../../../components';

const inputStyle = { width: '60px', marginRight: '10px' };

const DimensionsModal = ({ isOpen, onClose, defaultX, defaultY, defaultZ, onApply }) => {
  const [inputX, setInputX] = useState(defaultX);
  const [inputY, setInputY] = useState(defaultY);
  const [inputZ, setInputZ] = useState(defaultZ);

  const handleApplyDimensions = () => {
    const x = Number(inputX);
    const y = Number(inputY);
    const z = Number(inputZ);
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      onApply({ x, y, z });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 style={{ color: '#fff' }}>Установить размеры обрабатываемой поверхности (mm)</h3>
      <div style={{ marginBottom: '10px', color: '#fff' }}>
        <label>
          X:&nbsp;
          <input
            type="number"
            value={inputX}
            // @ts-ignore
            onChange={(e) => setInputX(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: '#fff' }}>
        <label>
          Y:&nbsp;
          <input
            type="number"
            value={inputY}
            // @ts-ignore
            onChange={(e) => setInputY(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: '#fff' }}>
        <label>
          Z:&nbsp;
          <input
            type="number"
            value={inputZ}
            // @ts-ignore
            onChange={(e) => setInputZ(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>
      <button onClick={handleApplyDimensions}>Применить</button>
    </Modal>
  );
};

export default DimensionsModal;
