import * as THREE from 'three';
import createLabel from './Label';
const Axes = () => {
  const group = new THREE.Group();

  const arrowSize = 5;
  const xAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), arrowSize, 0xff0000);
  const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), arrowSize, 0x00ff00);
  const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), arrowSize, 0x0000ff);

  const xLabel = createLabel('X', new THREE.Vector3(arrowSize + 1, 0, 0), 'red');
  const zLabel = createLabel('Z', new THREE.Vector3(0, arrowSize + 1, 0), 'green');
  const yLabel = createLabel('Y', new THREE.Vector3(0, 0, arrowSize + 1), 'blue');

  group.add(xAxis, zAxis, yAxis, xLabel, zLabel, yLabel);

  return group;
};

export default Axes;
