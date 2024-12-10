import { useRef, useEffect } from 'preact/hooks';
import * as THREE from 'three';

export default function useThreeScene({ 
  rotation, 
  position, 
  isFocused, 
  setRotation, 
  setPosition, 
  setIsFocused,
  graphicsSettings = { antialias: true } 
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const axisGroupRef = useRef(null);

  const isFocusedRef = useRef(isFocused);
  const controlsRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    isShiftPressed: false,
  });

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  useEffect(() => {
    const scene = new THREE.Scene();

    // Задаём Z вверх для всей сцены
    scene.up.set(0, 0, 1);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Установим камеру прямо над точкой (0,0,0), чтобы сразу увидеть разницу.
    // Поставим её в (0,0,100) и пусть смотрит прямо вниз на (0,0,0).
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer(graphicsSettings);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // @ts-ignore
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;

    const handleMouseDown = (event) => {
      if (isFocusedRef.current) {
        controls.isDragging = true;
        controls.prevX = event.clientX;
        controls.prevY = event.clientY;
      }
    };

    const handleMouseMove = (event) => {
      if (isFocusedRef.current && controls.isDragging && axisGroupRef.current) {
        const deltaX = event.clientX - controls.prevX;
        const deltaY = event.clientY - controls.prevY;

        if (controls.isShiftPressed) {
          axisGroupRef.current.rotation.z += deltaX * 0.01;
          axisGroupRef.current.rotation.x += deltaY * 0.01;
        } else {
          axisGroupRef.current.position.x += deltaX * 0.05;
          axisGroupRef.current.position.y -= deltaY * 0.05;
        }

        controls.prevX = event.clientX;
        controls.prevY = event.clientY;
      }
    };

    const handleMouseUp = () => {
      controls.isDragging = false;
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Shift') {
        controls.isShiftPressed = true;
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Shift') {
        controls.isShiftPressed = false;
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (axisGroupRef.current) {
        setRotation({ x: axisGroupRef.current.rotation.x, y: axisGroupRef.current.rotation.y });
        setPosition({ x: axisGroupRef.current.position.x, y: axisGroupRef.current.position.y });
      }
    };

    const currentMount = mountRef.current;
    currentMount.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    currentMount.addEventListener('mouseenter', handleFocus);
    currentMount.addEventListener('mouseleave', handleBlur);

    return () => {
      currentMount.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      currentMount.removeEventListener('mouseenter', handleFocus);
      currentMount.removeEventListener('mouseleave', handleBlur);
    };
  }, [setIsFocused, setRotation, setPosition]);

  useEffect(() => {
    if (axisGroupRef.current) {
      axisGroupRef.current.rotation.x = rotation.x;
      axisGroupRef.current.rotation.y = rotation.y;
      axisGroupRef.current.position.x = position.x;
      axisGroupRef.current.position.y = position.y;
    }
  }, [rotation, position]);

  return { mountRef, sceneRef, cameraRef, rendererRef, axisGroupRef };
}
