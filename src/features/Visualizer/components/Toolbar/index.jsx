import { useRef } from "preact/hooks";
import { IconButton } from "../../../../components";
import { styles } from "./styles";

const Toolbar = ({ onOpenDimensions, onLoadGCode, onGetHeightMap, showPath, setShowPath }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Файл выбран:", file.name); // Отладочное сообщение
      try {
        const content = await file.text();
        console.log("Файл загружен, содержимое:", content.slice(0, 100)); // Вывод первых 100 символов
        onLoadGCode(content);
      } catch (error) {
        console.error("Ошибка при чтении файла:", error); // Отладочное сообщение
      }
    } else {
      console.error("Файл не выбран"); // Отладочное сообщение
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      console.log("Имитируем клик по input"); // Отладочное сообщение
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef не инициализирован"); // Отладочное сообщение
    }
  };

  return (
    <div style={styles.container}>
      <IconButton
        icon="⚙"
        tooltip="Установить размеры"
        onClick={onOpenDimensions}
      />
      <IconButton
        icon="⛰"
        tooltip="Получить карту высот"
        onClick={onGetHeightMap}
      />
      <IconButton
        icon="G"
        tooltip="Загрузить G-код"
        onClick={triggerFileInput}
      />
      <input
        type="file"
        accept=".gcode,.txt,.nc"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
        <label style={{ color: 'white', marginRight: '5px' }}>Контур движения:</label>
        <input
          type="checkbox"
          checked={showPath}
          onChange={(e) => {
            // @ts-ignore
            setShowPath(e.target.checked);
          }}
        />
      </div>
    </div>
  );
};

export default Toolbar;
