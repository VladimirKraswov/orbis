import * as THREE from 'three';
import createLabel from './createLabel';

const Ruler = (axis, length, divisions) => {
  const group = new THREE.Group();
  const step = length / divisions;

  for (let i = -length / 2; i <= length / 2; i += step) {
    const labelPosition = new THREE.Vector3();
    const lineStart = new THREE.Vector3();
    const lineEnd = new THREE.Vector3();

    if (axis === 'x') {
      labelPosition.set(i, length / 2 + 1, 0);
      lineStart.set(i, length / 2 + 1.2, 0);
      lineEnd.set(i, length / 2 + 0.8, 0);
    } else if (axis === 'z') {
      labelPosition.set(0, i, length / 2 + 1);
      lineStart.set(0, i, length / 2 + 1.2);
      lineEnd.set(0, i, length / 2 + 0.8);
    } else if (axis === 'y') {
      labelPosition.set(length / 2 + 1, 0, i);
      lineStart.set(length / 2 + 1.2, 0, i);
      lineEnd.set(length / 2 + 0.8, 0, i);
    }

    if (Math.abs(i) % (divisions / 10) === 0) {
      const label = createLabel(`${Math.round(i)}`, labelPosition, axis === 'x' ? 'red' : axis === 'z' ? 'green' : 'blue');
      group.add(label);
    }

    const geometry = new THREE.BufferGeometry().setFromPoints([lineStart, lineEnd]);
    const material = new THREE.LineBasicMaterial({
      color: axis === 'x' ? 0xff0000 : axis === 'z' ? 0x00ff00 : 0x0000ff,
    });
    const line = new THREE.Line(geometry, material);
    group.add(line);
  }

  return group;
};

export default Ruler;
