import { IconButton } from "../../../../components";
import { styles } from "./styles";

const Toolbar = ({ onOpenDimensions, onGetHeightMap }) => {
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
    </div>
  );
};

export default Toolbar;