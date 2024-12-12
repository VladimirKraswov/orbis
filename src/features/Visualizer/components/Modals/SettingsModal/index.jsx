import { useState } from "preact/hooks";
import { Checkbox, Modal, Tooltip } from "../../../../../components";
import { useSettings } from "../../../../../providers/Settings";
import { styles } from "./styles";

const SettingsModal = ({ isOpen, onClose }) => {
  const { settings, updateSetting } = useSettings();
  const [tempSettings, setTempSettings] = useState(settings);

  const handleDimensionChange = (key, value) => {
    setTempSettings((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: value },
    }));
  };

  const handleCustomToggle = (value) => {
    setTempSettings((prev) => ({
      ...prev,
      useCustomDimensions: value,
    }));
  };

  const handleCheckboxChange = (key, value) => {
    setTempSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApply = () => {
    Object.keys(tempSettings).forEach((key) => {
      updateSetting(key, tempSettings[key]);
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header style={styles.modalHeader}>Настройки</header>

      {/* Dimensions Group */}
      <section style={styles.group}>
        <h2 style={styles.groupHeader}>Размеры обрабатываемой поверхности</h2>
        <Tooltip content="Включите, чтобы задать свои размеры области обрабатываемой поверхности">
          <Checkbox
            label="Использовать мои размеры"
            checked={tempSettings.useCustomDimensions}
            onChange={handleCustomToggle}
          />
        </Tooltip>

        {tempSettings.useCustomDimensions && (
          <div>
            {["x", "y", "z"].map((axis) => (
              <div style={styles.inputContainer} key={axis}>
                <label style={styles.inputLabel}>
                  {axis.toUpperCase()} (мм):
                  <Tooltip content={`Введите максимальный размер по оси ${axis.toUpperCase()}`}>
                    <input
                      type="number"
                      value={tempSettings.dimensions[axis]}
                      onChange={(e) =>
                        // @ts-ignore
                        handleDimensionChange(axis, Number(e.target.value))
                      }
                      style={styles.inputField}
                    />
                  </Tooltip>
                </label>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Path and Z Axis Group */}
      <section style={styles.group}>
        <h2 style={styles.groupHeader}>Дополнительные параметры</h2>
        <div style={styles.checkboxContainer}>
          <Tooltip content="Показывает контур траектории движения">
            <Checkbox
              label="Показать контур движения"
              checked={tempSettings.showPath}
              onChange={(value) => handleCheckboxChange("showPath", value)}
            />
          </Tooltip>

          <Tooltip content="Включите, чтобы учитывать ось Z при обработке">
            <Checkbox
              label="Учитывать ось Z"
              checked={tempSettings.considerZ}
              onChange={(value) => handleCheckboxChange("considerZ", value)}
            />
          </Tooltip>
        </div>
      </section>

      <button onClick={handleApply} style={styles.applyButton}>
        Применить
      </button>
    </Modal>
  );
};

export default SettingsModal;
