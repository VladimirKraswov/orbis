import * as THREE from 'three';
import { Axes } from './Axes';

/**
 * Создает кремовую плоскость с теплой бежевой сеткой.
 * @param {THREE.Scene} scene - Сцена для добавления.
 * @param {object} dims - Размеры сетки.
 * @returns {THREE.Group} - Группа с плоскостью и сеткой.
 */
export const Grid = (scene, dims) => {
  const group = new THREE.Group();

  const sizeX = dims.x * 2;
  const sizeY = dims.y * 2;
  const gridDivisions = 40;

  // Создаем кремовую плоскость
  const planeGeometry = new THREE.PlaneGeometry(sizeX, sizeY);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff8e7, // Кремовый цвет
    side: THREE.DoubleSide, // Отображение с обеих сторон
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // Устанавливаем ориентацию плоскости
  plane.rotation.x = 0; // Плоскость по умолчанию в XY
  plane.position.z = 0; // Плоскость находится на Z=0
  group.add(plane);

  // Создаем теплую сетку
  const gridHelper = new THREE.GridHelper(
    sizeX, // Размер сетки
    gridDivisions, // Количество делений
    0x8b5e3c, // Цвет линий осей (темно-бежевый)
    0xc6a78a // Цвет промежуточных линий (светло-бежевый)
  );
  gridHelper.rotation.x = Math.PI / 2; // Ориентируем сетку в плоскости XZ
  gridHelper.position.z = 0.01; // Поднимаем сетку немного над плоскостью
  group.add(gridHelper);

  // Создаем оси
  const axesGroup = Axes(50, 25, 5); // Настраиваем размеры стрелок
  axesGroup.position.z = 0.1; // Поднимаем оси и метки над сеткой и плоскостью
  group.add(axesGroup);

  // Добавляем группу в сцену
  scene.add(group);

  return group;
};
