import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

export class Path {
  constructor(group, color = 0xFF4500, lineWidth = 5) {
    this.group = group; // Привязываем путь к группе
    this.points = [];
    this.line = null;
    this.color = color;
    this.lineWidth = lineWidth;
  }

  interpolatePoints(p1, p2, segments = 10) {
    const interpolated = [];
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      interpolated.push(
        new THREE.Vector3(
          THREE.MathUtils.lerp(p1.x, p2.x, t), // X
          THREE.MathUtils.lerp(p1.y, p2.y, t), // Y
          THREE.MathUtils.lerp(p1.z, p2.z, t), // Y
        )
      );
    }
    return interpolated;
  }

  addPoint(point, interpolate = true) {
    // Принудительно фиксируем Z = 0
    const fixedPoint = new THREE.Vector3(point.x, point.y, point.z);
    if (interpolate && this.points.length > 0) {
      const lastPoint = this.points[this.points.length - 1];
      this.points.push(...this.interpolatePoints(lastPoint, fixedPoint));
    }
    this.points.push(fixedPoint);
    this.updateLine();
  }

  updateLine() {
    if (this.line) {
      this.group.remove(this.line); // Удаляем линию из группы
      this.line.geometry.dispose();
      this.line.material.dispose();
    }

    if (this.points.length < 2) return;

    const positions = this.points.flatMap(point => [point.x, point.y, point.z]);
    const geometry = new LineGeometry();
    geometry.setPositions(positions);

    const material = new LineMaterial({
      color: this.color,
      linewidth: this.lineWidth,
    });
    material.resolution.set(window.innerWidth, window.innerHeight);

    this.line = new Line2(geometry, material);
    this.line.computeLineDistances();
    this.group.add(this.line); // Добавляем линию в группу
  }

  clear() {
    if (this.line) {
      this.group.remove(this.line); // Удаляем линию из группы
      this.line.geometry.dispose();
      this.line.material.dispose();
      this.line = null;
    }
    this.points = [];
  }
}
