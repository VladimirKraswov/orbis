import { h } from 'preact';
import { useState } from 'preact/hooks';
import SceneManager from './SceneManager';

const GridView = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div
      tabIndex={0}
      style={{
        outline: isFocused ? '2px solid blue' : 'none',
        flex: 1,
        display: 'flex',
        height: '100%',
      }}
    >
      <SceneManager
        rotation={rotation}
        position={position}
        setRotation={setRotation}
        setPosition={setPosition}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
    </div>
  );
};

export default GridView;
