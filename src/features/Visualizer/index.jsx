// Visualizer.js
import { useState, useEffect, useRef } from 'preact/hooks';
import PropTypes from 'prop-types';
import useThreeScene from './useThreeScene';
import { createAxisHelpers, createLights, createSpindle } from './helpers';
import useMachineStatus from '../../hooks/useMachineStatus';
import { styles } from './styles';
import { Modal } from '../../components';

const Visualizer = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputX, setInputX] = useState(100);
  const [inputY, setInputY] = useState(100);
  const [inputZ, setInputZ] = useState(10);

  // Храним текущие размеры для сетки
  const [machineDims, setMachineDims] = useState({ x: 100, y: 100, z: 10 });

  const { mPos } = useMachineStatus();
  const { mountRef, sceneRef, axisGroupRef, cameraRef } = useThreeScene({
    rotation,
    position,
    isFocused,
    setRotation,
    setPosition,
    setIsFocused,
    graphicsSettings: { antialias: true }
  });

  const spindleRef = useRef(null);
  // @ts-ignore
  const axisGroupObjRef = useRef(null); // Храним ссылку на созданный group

  const scaleFactor = 0.1;

  // Инициализация сетки, осей, шпинделя
  useEffect(() => {
    if (!sceneRef.current) return;
    if (axisGroupRef.current) {
      // Если уже была создана осевая группа, удаляем её из сцены
      sceneRef.current.remove(axisGroupRef.current);
      axisGroupRef.current = null;
    }

    const axisGroup = createAxisHelpers(sceneRef.current, machineDims); 
    axisGroupRef.current = axisGroup;
    createLights(sceneRef.current);
    spindleRef.current = createSpindle(axisGroup);

    // Устанавливаем камеру так, чтобы она показывала только положительную часть координат.
    // Предполагаем, что машина имеет размеры machineDims.x, machineDims.y, machineDims.z,
    // тогда положительная часть будет от 0 до machineDims.x и т.д.
    // Расположим камеру таким образом, чтобы смотреть примерно на центр положительного квадранта.
    // Например, поставим камеру в точку (machineDims.x, machineDims.y, machineDims.y) и направим на (machineDims.x/2, machineDims.y/2, machineDims.z/2)
    if (cameraRef.current) {
      cameraRef.current.position.set(machineDims.x, machineDims.y, machineDims.x);
      cameraRef.current.lookAt(machineDims.x / 2, machineDims.y / 2, machineDims.z / 2);
    }

  }, [sceneRef, machineDims]); 

  // Обновляем позицию шпинделя при изменении mPos
  useEffect(() => {
    if (mPos && spindleRef.current) {
      const scaledX = mPos.x * scaleFactor;
      const scaledY = mPos.y * scaleFactor;
      const scaledZ = mPos.z * scaleFactor;
      
      spindleRef.current.position.set(scaledX, scaledY, scaledZ);
    }
  }, [mPos]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyDimensions = () => {
    const x = Number(inputX);
    const y = Number(inputY);
    const z = Number(inputZ);
    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      setMachineDims({ x, y, z });
      setIsModalOpen(false);
    }
  };

  return (
    <div
      style={{
        outline: isFocused ? '2px solid blue' : 'none',
        ...styles.container,
      }}
    >
      <button onClick={handleOpenModal} style={{}}>
        Установить размеры
      </button>
      <div ref={mountRef} style={styles.content} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3>Установить размеры обрабатываемой поверхности (mm)</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>
            X: <input type="number" value={inputX} onChange={(e) => setInputX(e.target.
// @ts-ignore
            value)} />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Y: <input type="number" value={inputY} onChange={(e) => setInputY(e.target.
// @ts-ignore
            value)} />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Z: <input type="number" value={inputZ} onChange={(e) => setInputZ(e.target.
// @ts-ignore
            value)} />
          </label>
        </div>
        <button onClick={handleApplyDimensions}>Применить</button>
      </Modal>
    </div>
  );
};

Visualizer.propTypes = {
  rotation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default Visualizer;
