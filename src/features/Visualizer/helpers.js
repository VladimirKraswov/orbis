// helpers.js
import * as THREE from 'three';
import Ruler from './components/Ruler';
import AxesGroup from './components/Axes';

export function createAxisHelpers(scene, dims) {
  const axisGroup = new THREE.Group();

  // Допустим, нам нужен GridHelper для X-Y плоскости
  const sizeX = dims.x * 2; // от -X до X = 2*X
  const sizeY = dims.y * 2; // от -Y до Y

  const gridSize = Math.max(sizeX, sizeY);
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

  return axisGroup;
}

export function createLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(20, 50, 10);
  scene.add(directionalLight);
}

export function createSpindle(axisGroup) {
  const spindleGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const spindleMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const spindle = new THREE.Mesh(spindleGeometry, spindleMaterial);
  axisGroup.add(spindle);
  return spindle;
}
