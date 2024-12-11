import { useRef, useState } from "preact/hooks";
import PropTypes from "prop-types";
import { Checkbox, IconButton } from "../../../../components";
import Modal from "../../../../components/Modal";
import { styles } from "./styles";
import { useSettings } from "../../../../providers/Settings";

const Toolbar = ({ onOpenDimensions, onLoadGCode, onGetHeightMap }) => {
  const fileInputRef = useRef(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { settings, updateSetting } = useSettings();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Файл выбран:", file.name);
      try {
        const content = await file.text();
        console.log("Файл загружен, содержимое:", content.slice(0, 100));
        onLoadGCode(content);
      } catch (error) {
        console.error("Ошибка при чтении файла:", error);
      }
    } else {
      console.error("Файл не выбран");
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      console.log("Имитируем клик по input");
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef не инициализирован");
    }
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
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
      <IconButton
        icon="🔧"
        tooltip="Настройки"
        onClick={openSettingsModal}
      />
      <input
        type="file"
        accept=".gcode,.txt,.nc"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <Modal isOpen={isSettingsModalOpen} onClose={closeSettingsModal}>
        <div style={{ padding: "20px" }}>
          <Checkbox
            label="Показать контур движения"
            checked={settings.showPath}
            onChange={(value) => updateSetting("showPath", value)}
          />
          <Checkbox
            label="Учитывать ось Z"
            checked={settings.considerZ}
            onChange={(value) => updateSetting("considerZ", value)}
          />
        </div>
      </Modal>
    </div>
  );
};

Toolbar.propTypes = {
  onOpenDimensions: PropTypes.func.isRequired,
  onLoadGCode: PropTypes.func.isRequired,
  onGetHeightMap: PropTypes.func.isRequired,
};

export default Toolbar;
