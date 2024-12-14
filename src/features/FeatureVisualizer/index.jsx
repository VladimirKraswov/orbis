import { useEffect, useRef, useState } from 'preact/hooks';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import Toolbar from './components/Toolbar';
import { Grid } from './components/3D/Grid';
import { Lights } from './components/3D/Lights';
import { Spindle } from './components/3D/Spindle';
import { HeightMapPlane } from './components/3D/HeightMapP';
import HeightMapModal from './components/Modals/HeightMapModal';
import { Path } from './components/3D/Path';

import { useSendGCode } from './hooks/useSendGCode';
import useThreeScene from './useThreeScene';
import { useSettings } from '../../providers/Settings';
import { useMachine } from '../../providers/machine';

import { styles } from './styles';
import { FeatureContainer } from '../../components';

const FeatureVisualizer = () => {
  const heightMapMeshRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHeightMapModalOpen, setIsHeightMapModalOpen] = useState(false);
  const [gcode, setGCode] = useState('');

  const { settings } = useSettings();
  const { sendGCode, isSending } = useSendGCode();
  const { info: { mPos } } = useMachine();

  const { dimensions } = settings;
  
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
      const axisGroup = Grid(sceneRef.current, dimensions);
      axisGroupRef.current = axisGroup;
      Lights(sceneRef.current);
      spindleRef.current = Spindle(axisGroupRef.current);

      pathRef.current = new Path(axisGroupRef.current, 0xFF4500, 5);
    }

    if (cameraRef.current) {
      const cameraHeight = 100;

      cameraRef.current.position.set(0, -70, cameraHeight);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [sceneRef]);

  useEffect(() => {
    if (mPos && spindleRef.current) {
      spindleRef.current.position.set(mPos.x, mPos.y, mPos.z);
  
      if (settings.showPath && pathRef.current) {
        pathRef.current.addPoint(
          new THREE.Vector3(mPos.x, mPos.y, settings.considerZ ? mPos.z : 0)
        );
        pathRef.current.flushBuffer(); // Обновляем путь
      }
    }
  }, [mPos, settings]);
  

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

  const handleLoadGCode = async (loadedGCode) => {
    console.log('G-code loaded:', loadedGCode);

    setGCode(loadedGCode);
    sendGCode(loadedGCode);
  };

  return (
    <FeatureContainer title="3D Visualizer"
      style={{
        outline: isFocused ? '2px solid blue' : 'none',
        ...styles.container,
        position: 'relative',
      }}
      headerElements={<Toolbar
        onGetHeightMap={handleGetHeightMap}
        onLoadGCode={handleLoadGCode}
      />}
    >
      <div ref={mountRef} style={styles.content} />
      <HeightMapModal
        isOpen={isHeightMapModalOpen}
        onClose={handleCloseHeightMapModal}
        onApply={handleApplyHeightMap}
      />
    </FeatureContainer>
  );
};

FeatureVisualizer.propTypes = {
  rotation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

export default FeatureVisualizer;
