import { useRef, useState } from "preact/hooks";
import PropTypes from "prop-types";

import SettingsModal from "../Modals/SettingsModal";
import { Box, IconButton } from "../../../../components";

import { styles } from "./styles";
import { checkIfBinary, decodeBinaryGCode } from "../../../../utils";

const Toolbar = ({ onLoadGCode, onGetHeightMap, onRunGCode }) => {
  const [isSettingsModal, setIsSettingsModal] = useState(false)
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("Файл не выбран");
      return;
    }
  
    console.log("Файл выбран:", file.name);
  
    try {
      const arrayBuffer = await file.arrayBuffer();
      const isBinary = checkIfBinary(arrayBuffer);
  
      let gcode;
      if (isBinary) {
        gcode = decodeBinaryGCode(new Uint8Array(arrayBuffer));
        console.log("G-code загружен, содержимое:", gcode.slice(0, 100));
        

      } else {
        gcode = await file.text();
      }
  
      console.log("G-code загружен:", gcode.slice(0, 100));
      onLoadGCode(gcode);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
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

  return (
    <Box width="100%" background="#333" borderBottom="1px solid #444" pd="5px" gap="10px" alignItems="center">
      <IconButton
        icon="⚙️"
        tooltip="Настройки"
        onClick={() => setIsSettingsModal(true)}
      />
      <IconButton
        icon="📦"
        tooltip="Выполнить G-код"
        onClick={onRunGCode}
      />
      <IconButton
        icon="🗺"
        tooltip="Получить карту высот"
        onClick={onGetHeightMap}
      />
      <IconButton
        icon="G"
        tooltip="Загрузить G-код"
        onClick={() => triggerFileInput()}
      />
      <input
        type="file"
        accept=".gcode,.txt,.nc"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <SettingsModal
        isOpen={isSettingsModal}
        onClose={() => setIsSettingsModal(false)}
      />
    </Box>
  );
};

Toolbar.propTypes = {
  onLoadGCode: PropTypes.func.isRequired,
  onGetHeightMap: PropTypes.func.isRequired,
  onRunGCode: PropTypes.func.isRequired,
};

export default Toolbar;
