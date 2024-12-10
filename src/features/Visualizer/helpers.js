// helpers.js
import * as THREE from 'three';
import Ruler from './components/Ruler';
import AxesGroup from './components/Axes';

export function createAxisHelpers(scene, dims) {
  const axisGroup = new THREE.Group();

  const sizeX = dims.x * 2; 
  const sizeY = dims.y * 2; 
  const gridSize = Math.max(sizeX, sizeY);
  const gridDivisions = 40;

  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x888888, 0xcccccc);
  
  // Повернём сетку вокруг оси X на +90°, чтобы она легла в плоскости XY при Z-вверх
  gridHelper.rotation.x = Math.PI / 2;

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

/**
 * Создаёт плоскость с заданными размерами и шагом.
 * Плоскость создаётся в плоскости XY, координата Z отвечает за высоту.
 * Высоты генерируются случайно от 0 до 10 мм.
 * 
 * @param {THREE.Group} parentGroup - Группа, к которой будет добавлена плоскость (axisGroup)
 * @param {number} width  Ширина плоскости (мм) по оси X
 * @param {number} height Длина плоскости (мм) по оси Y
 * @param {number} step   Шаг сетки (мм)
 * @returns {THREE.Mesh} Возвращает созданную сетку плоскости
 */
export function createHeightMapPlane(parentGroup, width, height, step) {
  const cols = Math.floor(width / step) + 1; 
  const rows = Math.floor(height / step) + 1;

  // PlaneGeometry по умолчанию лежит в XY плоскости с Z перпендикулярно вверх.
  const geometry = new THREE.PlaneGeometry(width, height, cols - 1, rows - 1);
  
  const positions = geometry.attributes.position.array;
  const vertexCount = positions.length / 3; 
  const colors = new Float32Array(vertexCount * 3);

  for (let i = 0; i < vertexCount; i++) {
    const zIndex = i * 3 + 2; // z-координата вершины (X = i*3, Y = i*3+1, Z = i*3+2)
    const randomHeight = Math.random() * 10; // высота от 0 до 10 мм
    positions[zIndex] = randomHeight;

    // Цвет по высоте: от зелёного (0 мм) к красному (10 мм)
    const h = randomHeight;
    const r = h / 10;       
    const g = 1 - (h / 10); 
    const b = 0;

    const colorIndex = i * 3;
    colors[colorIndex] = r;
    colors[colorIndex + 1] = g;
    colors[colorIndex + 2] = b;
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, vertexColors: true });
  const mesh = new THREE.Mesh(geometry, material);

  parentGroup.add(mesh);

  // По умолчанию плоскость центрирована в (0,0).
  // Переместим её так, чтобы нижний левый угол был в (0,0):
  mesh.position.x = width / 2;
  mesh.position.y = height / 2;

  return mesh;
}
