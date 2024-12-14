import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { isCollinear, shouldAddPoint } from '../../utils';


/**
 * Class representing a drawable path in a 3D scene.
 */
export class Path {
  constructor(group, color = 0xff4500, lineWidth = 5) {
    this.group = group; // Group to attach the path
    this.points = []; // Final optimized points for the path
    this.buffer = []; // Temporary buffer for new points
    this.line = null; // THREE.js Line2 object
    this.color = color; // Line color
    this.lineWidth = lineWidth; // Line width
    this.distanceThreshold = 0.1; // Minimum distance between consecutive points
  }

  /**
   * Processes buffered points by removing unnecessary points (collinear ones).
   */
  processBuffer() {
    const optimizedPoints = [];

    for (const point of this.buffer) {
      if (
        optimizedPoints.length >= 2 &&
        isCollinear(
          optimizedPoints[optimizedPoints.length - 2],
          optimizedPoints[optimizedPoints.length - 1],
          point
        )
      ) {
        optimizedPoints.pop(); // Remove the last point if it is collinear
      }
      optimizedPoints.push(point);
    }

    this.points.push(...optimizedPoints);
    this.buffer = []; // Clear the buffer
  }

  /**
   * Adds a point to the buffer. Processes the buffer and updates the line if needed.
   * @param {THREE.Vector3} point - The new point to add.
   */
  addPoint(point) {
    const fixedPoint = new THREE.Vector3(point.x, point.y, point.z);

    if (!shouldAddPoint(this.buffer, fixedPoint, this.distanceThreshold)) return; // Skip if too close

    this.buffer.push(fixedPoint);

    // Process buffer and update line if buffer reaches a threshold
    if (this.buffer.length >= 50) {
      this.processBuffer();
      this.updateLine();
    }
  }

  /**
   * Updates the 3D line representation based on the points array.
   */
  updateLine() {
    if (this.line) {
      this.group.remove(this.line); // Remove existing line
      this.line.geometry.dispose();
      this.line.material.dispose();
    }

    if (this.points.length < 2) return; // Skip if not enough points

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
    this.group.add(this.line); // Add the updated line to the group
  }

  /**
   * Forces the buffer to be processed and updates the line.
   */
  flushBuffer() {
    if (this.buffer.length > 0) {
      this.processBuffer();
      this.updateLine();
    }
  }

  /**
   * Clears the path, removing all points and the line.
   */
  clear() {
    if (this.line) {
      this.group.remove(this.line); // Remove the line
      this.line.geometry.dispose();
      this.line.material.dispose();
      this.line = null;
    }
    this.points = [];
    this.buffer = [];
  }
}