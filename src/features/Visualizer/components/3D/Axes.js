import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Label } from './Label';

/**
 * Создаёт координатные оси с метками.
 * @param {number} arrowSize - Размер стрелок.
 * @param {number} lineLength - Длина линий осей.
 * @param {number} lineThickness - Толщина линий осей.
 * @returns {THREE.Group} - Группа с осями и метками.
 */
export const Axes = (arrowSize = 50, lineLength = 25, lineThickness = 10) => {
  const group = new THREE.Group();

  // Создаём линии осей
  const createAxisLine = (start, end, color) => {
    const geometry = new LineGeometry();
    geometry.setPositions([start.x, start.y, start.z, end.x, end.y, end.z]);

    const material = new LineMaterial({
      color,
      linewidth: lineThickness,
    });

    material.resolution.set(window.innerWidth, window.innerHeight);

    return new Line2(geometry, material);
  };

  // Создаём линии для X, Y, Z
  const xLine = createAxisLine(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(lineLength, 0, 0),
    0xff0000
  );
  const yLine = createAxisLine(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, lineLength, 0),
    0x00ff00
  );
  const zLine = createAxisLine(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, lineLength),
    0x0000ff
  );

  // Создаём метки для осей
  const xLabel = Label(
    'X',
    new THREE.Vector3(lineLength + 2, 0, 1), // Поднятие по Z что бы не перекрывались плоскостью
    'red',
    256,
    'bold'
  );
  const yLabel = Label(
    'Y',
    new THREE.Vector3(0, lineLength + 2, 1), // Поднятие по Z
    'green',
    256,
    'bold'
  );
  const zLabel = Label(
    'Z',
    new THREE.Vector3(0, 0, lineLength + 2),
    'blue',
    256,
    'bold'
  );

  // Добавляем всё в группу
  group.add(xLine, yLine, zLine, xLabel, yLabel, zLabel);

  return group;
};
