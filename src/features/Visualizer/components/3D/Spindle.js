import * as THREE from 'three';

export function Spindle(axisGroup) {
  const spindleGroup = new THREE.Group();

  // Параметры шпенделя
  const tipRadius = 1;            // Радиус основания конусной части
  const tipHeight = 10;           // Высота конусной части
  const tipRadialSegments = 32;   // Количество сегментов по окружности для конуса

  // Создаём конусную часть шпенделя
  const tipGeometry = new THREE.ConeGeometry(
    tipRadius, tipHeight, tipRadialSegments, 1, true
  );

  // Поворот конуса, чтобы он был направлен вниз по оси Z
  tipGeometry.rotateX(-Math.PI / 2); // Поворот на -90 градусов вокруг оси X

  // Создаём wireframe для конуса
  const tipWireframe = new THREE.WireframeGeometry(tipGeometry);
  const tipMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Королевский синий цвет
  const tip = new THREE.LineSegments(tipWireframe, tipMaterial);
  
  // Позиционируем конус выше сетки, чтобы его вершина касалась сетки (Z=0)
  tip.position.z = tipHeight / 2;

  // Добавляем конус в группу шпенделя
  spindleGroup.add(tip);

  // Масштабирование шпенделя для большей видимости (опционально)
  spindleGroup.scale.set(2, 2, 2); // Увеличиваем шпендель в 2 раза по всем осям

  // Добавляем шпендель в осевую группу
  axisGroup.add(spindleGroup);

  return spindleGroup;
}
