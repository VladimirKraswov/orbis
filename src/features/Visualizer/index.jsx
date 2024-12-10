import { useState, useEffect, useRef } from 'preact/hooks';
import PropTypes from 'prop-types';
import useThreeScene from './useThreeScene';
import { createAxisHelpers, createLights, createSpindle } from './helpers';
import useMachineStatus from '../../hooks/useMachineStatus';
import { styles } from './styles';
import Toolbar from './components/Toolbar';
import DimensionsModal from './components/DimensionsModal';

const Visualizer = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    if (!sceneRef.current) return;
    if (axisGroupRef.current) {
      sceneRef.current.remove(axisGroupRef.current);
      axisGroupRef.current = null;
    }

    const axisGroup = createAxisHelpers(sceneRef.current, machineDims); 
    axisGroupRef.current = axisGroup;
    createLights(sceneRef.current);
    spindleRef.current = createSpindle(axisGroup);

    if (cameraRef.current) {
      cameraRef.current.position.set(machineDims.x, machineDims.y, machineDims.x);
      cameraRef.current.lookAt(machineDims.x / 2, machineDims.y / 2, machineDims.z / 2);
    }

  }, [sceneRef, machineDims]); 

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
    console.log("Получаем карту высот...");
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
