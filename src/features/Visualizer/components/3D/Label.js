import * as THREE from 'three';

/**
 * Создаёт метку с заданным текстом и параметрами стиля.
 * @param {string} text - Текст метки.
 * @param {THREE.Vector3} position - Позиция метки.
 * @param {string} color - Цвет текста метки.
 * @param {number} fontSize - Размер шрифта (по умолчанию 64).
 * @param {string} fontWeight - Толщина шрифта (по умолчанию 'normal', можно 'bold').
 * @returns {THREE.Sprite} - Объект метки.
 */
export const Label = (text, position, color, fontSize = 64, fontWeight = 'normal') => {
  // Создаём Canvas для текста
  const canvas = document.createElement('canvas');
  canvas.width = 512; // Увеличенные размеры для более чёткого текста
  canvas.height = 512;

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `${fontWeight} ${fontSize}px Arial`;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  // Создаём текстуру из Canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter; // Улучшаем качество
  texture.needsUpdate = true;

  // Создаём материал для спрайта
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });

  // Создаём спрайт
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.copy(position);

  // Настраиваем размер метки (по умолчанию 10)
  sprite.scale.set(10, 10, 1);

  return sprite;
};
