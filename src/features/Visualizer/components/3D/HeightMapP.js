import * as THREE from 'three';

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