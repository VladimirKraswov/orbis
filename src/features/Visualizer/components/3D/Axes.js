import * as THREE from 'three';
import createLabel from './Label';

/**
 * Создаёт оси с заданным размером стрелок и линий.
 * @param {number} arrowSize - Размер стрелок (по умолчанию 50).
 * @param {number} lineThickness - Толщина линий осей (по умолчанию 1).
 * @returns {THREE.Group} Группа осей с метками.
 */
const createAxes = (arrowSize = 50, lineThickness = 0.5) => {
  const group = new THREE.Group();

  // Создаём геометрию для линий осей
  const createAxisLine = (start, end, color) => {
    const lineGeometry = new THREE.CylinderGeometry(lineThickness / 2, lineThickness / 2, arrowSize, 16);
    const lineMaterial = new THREE.MeshBasicMaterial({ color });
    const lineMesh = new THREE.Mesh(lineGeometry, lineMaterial);

    const midPoint = start.clone().lerp(end, 0.5); // Вычисляем середину линии
    lineMesh.position.copy(midPoint);

    // Определяем направление линии
    const axis = new THREE.Vector3().subVectors(end, start).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis);

    lineMesh.quaternion.copy(quaternion);
    lineMesh.scale.set(1, arrowSize, 1);

    return lineMesh;
  };

  // Создаём линии осей
  const xLine = createAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(arrowSize, 0, 0), 0xff0000);
  const yLine = createAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, arrowSize, 0), 0x00ff00);
  const zLine = createAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, arrowSize), 0x0000ff);

  // Создаём стрелки осей
  const xAxis = new THREE.ArrowHelper(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    arrowSize,
    0xff0000
  );
  const yAxis = new THREE.ArrowHelper(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    arrowSize,
    0x00ff00
  );
  const zAxis = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    arrowSize,
    0x0000ff
  );

  // Создаём метки для осей
  const xLabel = createLabel('X', new THREE.Vector3(arrowSize + 5, 0, 0), 'red');
  const yLabel = createLabel('Y', new THREE.Vector3(0, arrowSize + 5, 0), 'green');
  const zLabel = createLabel('Z', new THREE.Vector3(0, 0, arrowSize + 5), 'blue');

  // Добавляем всё в группу
  group.add(xLine, yLine, zLine, xAxis, yAxis, zAxis, xLabel, yLabel, zLabel);

  return group;
};

export default createAxes;
