// HeightMapModal.js
import { useState } from 'preact/hooks';
import { Modal } from '../../../../components';

const stepsOptions = [1, 2, 4, 6, 8, 10, 15, 20, 40, 100];

const inputStyle = { width: '60px', marginRight: '10px' };

const HeightMapModal = ({ isOpen, onClose, onApply }) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const [step, setStep] = useState(10);

  const handleApply = () => {
    const w = Number(width);
    const h = Number(height);
    const s = Number(step);
    if (!isNaN(w) && !isNaN(h) && !isNaN(s) && s > 0 && w > 0 && h > 0) {
      onApply({ width: w, height: h, step: s });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 style={{ color: '#fff' }}>Создание карты высот</h3>
      <div style={{ marginBottom: '10px', color: '#fff' }}>
        <label>
          Ширина (мм):&nbsp;
          <input
            type="number"
            value={width}
            // @ts-ignore
            onChange={(e) => setWidth(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: '#fff' }}>
        <label>
          Длина (мм):&nbsp;
          <input
            type="number"
            value={height}
            // @ts-ignore
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px', color: '#fff' }}>
        <label>
          Шаг (мм):&nbsp;
          <select value={step} onChange={(e) => setStep(e.target.
// @ts-ignore
          value)}>
            {stepsOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleApply}>Создать</button>
    </Modal>
  );
};

export default HeightMapModal;
