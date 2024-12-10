import * as THREE from 'three';
import Ruler from './Ruler';
import createAxes from './Axes';

export function createGrid(scene, dims) {
  const group = new THREE.Group();

  const sizeX = dims.x * 2; 
  const sizeY = dims.y * 2; 
  const gridSize = Math.max(sizeX, sizeY);
  const gridDivisions = 40;

  // Создаем сетку
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0xcccccc);
  
  // Повернём сетку вокруг оси X на +90°, чтобы она легла в плоскости XY при Z-вверх
  gridHelper.rotation.x = Math.PI / 2;

  // Добавим сетку в группу
  group.add(gridHelper);

  // Создаем оси
  const axesGroup = createAxes();
  // Добавим оси в группу
  group.add(axesGroup);

  // Создаем линейки
  const rulerX = Ruler('x', gridSize, gridDivisions);
  const rulerY = Ruler('y', gridSize, gridDivisions);
  const rulerZ = Ruler('z', gridSize, gridDivisions);
  // Добавим линейки в группу
  group.add(rulerX, rulerY, rulerZ);

  // Добавим группу в сцену
  scene.add(group);
  return group;
}