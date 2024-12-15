// Utility functions for Path optimization
import * as THREE from 'three';

/**
 * Checks if three points are collinear (lie on the same straight line).
 * @param {THREE.Vector3} p1 - The first point.
 * @param {THREE.Vector3} p2 - The second point.
 * @param {THREE.Vector3} p3 - The third point.
 * @returns {boolean} - True if the points are collinear, false otherwise.
 */
export function isCollinear(p1, p2, p3) {
  const v1 = new THREE.Vector3().subVectors(p2, p1);
  const v2 = new THREE.Vector3().subVectors(p3, p2);
  const cross = new THREE.Vector3().crossVectors(v1, v2);
  return cross.lengthSq() < 1e-6; // Small threshold for floating-point errors
}

/**
 * Determines if a new point should be added to the buffer based on distance threshold.
 * @param {THREE.Vector3[]} buffer - The array of points currently in the buffer.
 * @param {THREE.Vector3} newPoint - The new point to consider.
 * @param {number} distanceThreshold - The minimum distance between points.
 * @returns {boolean} - True if the point should be added, false otherwise.
 */
export function shouldAddPoint(buffer, newPoint, distanceThreshold) {
  if (buffer.length === 0) return true; // Always add the first point

  const lastPoint = buffer[buffer.length - 1];
  return lastPoint.distanceTo(newPoint) > distanceThreshold; // Add if distance is sufficient
}

export function addGCodeContourToGrid(gcode, axisGroupRef, baseZ = 0) {
  if (!axisGroupRef.current) {
    console.error('Группа осей (axisGroupRef) не инициализирована');
    return;
  }

  const points = parseGCode(gcode, baseZ);
  const line = createLine(points, 0xff4500); // Оранжевый цвет для линии
  axisGroupRef.current.add(line);
  console.log('Контур G-кода добавлен на поверхность сетки');
}

export function parseGCode(gcode, baseZ = 0) {
  const lines = gcode.split('\n');
  const points = [];
  let currentPosition = { x: 0, y: 0, z: baseZ };

  for (const line of lines) {
    if (line.startsWith('G0') || line.startsWith('G1')) {
      const matchX = /X([-\d.]+)/.exec(line);
      const matchY = /Y([-\d.]+)/.exec(line);
      const matchZ = /Z([-\d.]+)/.exec(line);

      if (matchX) currentPosition.x = parseFloat(matchX[1]);
      if (matchY) currentPosition.y = parseFloat(matchY[1]);
      if (matchZ) currentPosition.z = baseZ; // Устанавливаем Z на уровне сетки

      points.push(new THREE.Vector3(currentPosition.x, currentPosition.y, currentPosition.z));
    }
  }
  return points;
}

export function createLine(points, color = 0x00ff00) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });
  return new THREE.Line(geometry, material);
}

