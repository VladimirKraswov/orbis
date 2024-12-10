import * as THREE from 'three';
import { useState, useEffect, useRef } from 'preact/hooks';
import PropTypes from 'prop-types';
import useThreeScene from './useThreeScene';
import useMachineStatus from '../../hooks/useMachineStatus';
import { styles } from './styles';
import Toolbar from './components/Toolbar';
import { Grid } from './components/3D/Grid';
import { Lights } from './components/3D/Lights';
import { Spindle } from './components/3D/Spindle';
import { HeightMapPlane } from './components/3D/HeightMapP';
import DimensionsModal from './components/Modals/DimensionsModal';
import HeightMapModal from './components/Modals/HeightMapModal';
import { Path } from './components/3D/Path';

const Visualizer = () => {
  const heightMapMeshRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPath, setShowPath] = useState(true);
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
    graphicsSettings: { antialias: true },
  });

  const spindleRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;
  
    if (!axisGroupRef.current) {
      const axisGroup = Grid(sceneRef.current, machineDims);
      axisGroupRef.current = axisGroup;
      Lights(sceneRef.current);
      spindleRef.current = Spindle(axisGroupRef.current);
  
      // Привязываем путь к axisGroup
      pathRef.current = new Path(axisGroupRef.current, 0xFF4500, 5);
    }
  
    if (cameraRef.current) {
      const cameraDistance = Math.max(machineDims.x, machineDims.y) * 1.5;
      const cameraHeight = machineDims.z * 10;
  
      cameraRef.current.position.set(0, -70, cameraHeight);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [sceneRef]);
  
  useEffect(() => {
    if (mPos && spindleRef.current) {
      const scaledX = mPos.x;
      const scaledY = mPos.y;
      const planeZ = 0; // Уровень плоскости
  
      // Устанавливаем положение шпинделя
      spindleRef.current.position.set(scaledX, scaledY, planeZ);
  
      // Добавляем точку пути с фиксацией на плоскости
      if (showPath && pathRef.current) {
        pathRef.current.addPoint(new THREE.Vector3(scaledX, scaledY, planeZ), true);
      }
    }
  }, [mPos, showPath]);
  
  

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyDimensions = ({ x, y, z }) => {
    setMachineDims({ x, y, z });
    setIsModalOpen(false);
  };

  const handleCloseHeightMapModal = () => setIsHeightMapModalOpen(false);

  const handleApplyHeightMap = ({ width, height, step }) => {
    if (!axisGroupRef.current) return;

    if (heightMapMeshRef.current) {
      axisGroupRef.current.remove(heightMapMeshRef.current);
      heightMapMeshRef.current = null;
    }

    const mesh = HeightMapPlane(axisGroupRef.current, width, height, step);
    heightMapMeshRef.current = mesh;

    setIsHeightMapModalOpen(false);
  };

  const handleGetHeightMap = () => {
    setIsHeightMapModalOpen(true);
  };

  return (
    <div
      style={{
        outline: isFocused ? '2px solid blue' : 'none',
        ...styles.container,
        position: 'relative',
      }}
    >
      <Toolbar
        showPath={showPath}
        onGetHeightMap={handleGetHeightMap}
        onOpenDimensions={handleOpenModal}
        setShowPath={setShowPath}
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
