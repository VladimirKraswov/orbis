// Visualizer.js
import * as THREE from 'three';
import { useState, useEffect, useRef } from 'preact/hooks';
import PropTypes from 'prop-types';
import useThreeScene from './useThreeScene';
import useMachineStatus from '../../hooks/useMachineStatus';
import { styles } from './styles';
import Toolbar from './components/Toolbar';
import DimensionsModal from './components/DimensionsModal';
import HeightMapModal from './components/HeightMapModal';
import { createGrid } from './components/3D/Grid';
import { createLights } from './components/3D/Lights';
import { createSpindle } from './components/3D/Spindle';
import { createHeightMapPlane } from './components/3D/HeightMapP';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';


const Visualizer = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pathPointsRef = useRef([]); // Хранение точек пути
  const pathLineRef = useRef(null); // Ссылка на линию пути
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
    graphicsSettings: { antialias: true }
  });

  const spindleRef = useRef(null);
  const scaleFactor = 1;

  const updatePathLine = () => {
    if (!axisGroupRef.current || pathPointsRef.current.length < 2) return;
  
    // Удаляем старую линию, если она существует
    if (pathLineRef.current) {
      axisGroupRef.current.remove(pathLineRef.current);
      pathLineRef.current.geometry.dispose();
      pathLineRef.current.material.dispose();
      pathLineRef.current = null;
    }
  
    // Конвертируем точки пути в массив координат
    const positions = pathPointsRef.current.flatMap((point) => [
      point.x,
      point.y,
      point.z,
    ]);
  
    // Создаем LineGeometry
    const lineGeometry = new LineGeometry();
    lineGeometry.setPositions(positions);
  
    // Создаем LineMaterial с толщиной линии
    const lineMaterial = new LineMaterial({
      color: 0x00ff00, // Зеленый цвет
      linewidth: 2, // Толщина линии в пикселях
      dashed: false,
    });
  
    lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // Устанавливаем разрешение для правильной толщины
  
    // Создаем Line2
    const pathLine = new Line2(lineGeometry, lineMaterial);
    pathLine.computeLineDistances(); // Важно для корректного рендера линий
  
    // Добавляем линию в axisGroup
    axisGroupRef.current.add(pathLine);
  
    pathLineRef.current = pathLine;
  };

  const heightMapMeshRef = useRef(null);

  useEffect(() => {
    if (!sceneRef.current) return;
  
    // Если axisGroup уже существует, обновите его, не удаляя
    // Если нужно всё же пересоздать, будьте уверены в порядке операций
    if (!axisGroupRef.current) {
      const axisGroup = createGrid(sceneRef.current, machineDims);
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
      const scaledZ = 0; // Линия должна быть на сетке, так что Z = 0
  
      // Устанавливаем положение шпинделя
      spindleRef.current.position.set(scaledX, scaledY, scaledZ);
  
      if (showPath) {
        // Добавляем точку пути
        pathPointsRef.current.push(new THREE.Vector3(scaledX, scaledY, scaledZ));
        updatePathLine(); // Обновляем линию пути
      }
    }
  }, [mPos, showPath]);

  useEffect(() => {
    if (mPos && spindleRef.current) {
      const scaledX = mPos.x * scaleFactor;
      const scaledY = mPos.y * scaleFactor;
      const scaledZ = mPos.z * scaleFactor;
  
      // Устанавливаем положение шпинделя
      spindleRef.current.position.set(scaledX, scaledY, scaledZ);
  
      if (showPath) {
        // Добавляем точку пути
        pathPointsRef.current.push(new THREE.Vector3(scaledX, scaledY, 0)); // Линия должна быть на сетке, так что Z = 0
        updatePathLine(); // Обновляем линию пути
      }
    }
  }, [mPos, showPath]);

  useEffect(() => {
    if (!showPath) {
      pathPointsRef.current = [];
      if (pathLineRef.current && sceneRef.current) {
        sceneRef.current.remove(pathLineRef.current);
        pathLineRef.current = null;
      }
    }
  }, [showPath]);
  

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
        showPath={showPath}
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