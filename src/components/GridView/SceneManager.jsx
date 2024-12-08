// @ts-ignore
// @ts-ignore
import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import * as THREE from 'three';
import AxesGroup from './AxesGroup';
import Ruler from './Ruler';

const SceneManager = ({ rotation, position, setRotation, setPosition, isFocused, setIsFocused }) => {
  const mountRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(30, 30, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    // @ts-ignore
    mountRef.current.appendChild(renderer.domElement);

    const axisGroup = new THREE.Group();

    const gridSize = 40;
    const gridDivisions = 40;

    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0xcccccc);
    axisGroup.add(gridHelper);

    const axesGroup = AxesGroup();
    axisGroup.add(axesGroup);

    const rulerX = Ruler('x', gridSize, gridDivisions);
    const rulerY = Ruler('y', gridSize, gridDivisions);
    const rulerZ = Ruler('z', gridSize, gridDivisions);

    axisGroup.add(rulerX, rulerY, rulerZ);

    scene.add(axisGroup);

    axisGroup.rotation.x = rotation.x;
    axisGroup.rotation.y = rotation.y;
    axisGroup.position.x = position.x;
    axisGroup.position.y = position.y;

    const controls = {
      isDragging: false,
      prevX: 0,
      prevY: 0,
      isShiftPressed: false,
    };

    const handleResize = () => {
      // @ts-ignore
      const width = mountRef.current.clientWidth;
      // @ts-ignore
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleMouseDown = (event) => {
      if (isFocused) {
        controls.isDragging = true;
        controls.prevX = event.clientX;
        controls.prevY = event.clientY;
      }
    };

    const handleMouseMove = (event) => {
      if (isFocused && controls.isDragging) {
        const deltaX = event.clientX - controls.prevX;
        const deltaY = event.clientY - controls.prevY;

        if (controls.isShiftPressed) {
          axisGroup.rotation.y += deltaX * 0.01;
          axisGroup.rotation.x += deltaY * 0.01;
        } else {
          axisGroup.position.x += deltaX * 0.05;
          axisGroup.position.y -= deltaY * 0.05;
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

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
      setIsFocused(false);
      setRotation({ x: axisGroup.rotation.x, y: axisGroup.rotation.y });
      setPosition({ x: axisGroup.position.x, y: axisGroup.position.y });
    };

    window.addEventListener('resize', handleResize);
    // @ts-ignore
    mountRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // @ts-ignore
    mountRef.current.addEventListener('mouseenter', handleFocus);
    // @ts-ignore
    mountRef.current.addEventListener('mouseleave', handleBlur);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      // @ts-ignore
      mountRef.current.removeChild(renderer.domElement);
      // @ts-ignore
      mountRef.current.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      // @ts-ignore
      mountRef.current.removeEventListener('mouseenter', handleFocus);
      // @ts-ignore
      mountRef.current.removeEventListener('mouseleave', handleBlur);
    };
  }, [rotation, position, isFocused]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default SceneManager;
