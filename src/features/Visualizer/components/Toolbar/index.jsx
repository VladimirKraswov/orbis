import { IconButton } from "../../../../components";
import { styles } from "./styles";

const Toolbar = ({ onOpenDimensions, onGetHeightMap, showPath, setShowPath }) => {
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