// Visualizer.js
import { useState, useEffect, useRef } from 'preact/hooks';
import PropTypes from 'prop-types';
import useThreeScene from './useThreeScene';
import { createAxisHelpers, createHeightMapPlane, createLights, createSpindle } from './helpers';
import useMachineStatus from '../../hooks/useMachineStatus';
import { styles } from './styles';
import Toolbar from './components/Toolbar';
import DimensionsModal from './components/DimensionsModal';
import HeightMapModal from './components/HeightMapModal';

const Visualizer = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeightMapModalOpen, setIsHeightMapModalOpen] = useState(false);

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
  const scaleFactor = 0.1;

  const heightMapMeshRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;
  
    // Если axisGroup уже существует, обновите его, не удаляя
    // Если нужно всё же пересоздать, будьте уверены в порядке операций
    if (!axisGroupRef.current) {
      const axisGroup = createAxisHelpers(sceneRef.current, machineDims);
      axisGroupRef.current = axisGroup;
      createLights(sceneRef.current);
      spindleRef.current = createSpindle(axisGroupRef.current);
    } else {
      // Обновите размеры или другие параметры осей и сетки, если нужно
    }
  
    if (cameraRef.current) {
      const cameraDistance = Math.max(machineDims.x, machineDims.y) * 1.5;
      const cameraHeight = machineDims.z * 10; // Увеличим Z для более высокого обзора
      
      // Позиционируем камеру так, чтобы она смотрела на центр
      // Например, (machineDims.x / 2, machineDims.y / 2, cameraHeight)
      cameraRef.current.position.set(0, -70, cameraHeight);
      cameraRef.current.lookAt(0, 0, 0);
    }
  
  }, [sceneRef]); // Зависимость только от sceneRef, чтобы не пересоздавать группу при каждом изменении machineDims
  

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
  const handleApplyDimensions = ({x,y,z}) => {
    setMachineDims({ x, y, z });
    setIsModalOpen(false);
  };

  const handleGetHeightMap = () => {
    setIsHeightMapModalOpen(true);
  };

  const handleCloseHeightMapModal = () => setIsHeightMapModalOpen(false);

  const handleApplyHeightMap = ({width, height, step}) => {
    if (!axisGroupRef.current) return;
    
    if (heightMapMeshRef.current) {
      axisGroupRef.current.remove(heightMapMeshRef.current);
      heightMapMeshRef.current = null;
    }

    const mesh = createHeightMapPlane(axisGroupRef.current, width, height, step);
    heightMapMeshRef.current = mesh;
  
    setIsHeightMapModalOpen(false);
  };

  return (
    <div
      style={{
        outline: isFocused ? '2px solid blue' : 'none',
        ...styles.container,
        position: 'relative'
      }}
    >
      <Toolbar
        onOpenDimensions={handleOpenModal}
        onGetHeightMap={handleGetHeightMap}
      />
      <div ref={mountRef} style={styles.content} />
      <DimensionsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultX={machineDims.x}
        defaultY={machineDims.y}
        defaultZ={machineDims.z}
        onApply={handleApplyDimensions}
      />
      <HeightMapModal
        isOpen={isHeightMapModalOpen}
        onClose={handleCloseHeightMapModal}
        onApply={handleApplyHeightMap}
      />
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