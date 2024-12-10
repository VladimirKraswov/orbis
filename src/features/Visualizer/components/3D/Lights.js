import * as THREE from 'three';

export function createLights(scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(20, 50, 10);
  scene.add(directionalLight);
}