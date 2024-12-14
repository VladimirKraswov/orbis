import { Box } from "../../../../components";
import { styles } from "./styles";

export const JogBar = ({ onCommand }) => {
  const handleCommand = (command) => {
    if (onCommand) onCommand(command);
  };

  return (
    <Box style={styles.jogBar} column alignItems="center" ml="10px">
      {/* Верхняя часть */}
      <Box column gap="7px">
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z+ 10")}
          title="Move Z axis +10"
        >
          <div style={{ ...styles.jogButtonInner, ...styles.jogButtonZPlus10 }}>+10</div>
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z+ 1")}
          title="Move Z axis +1"
        >
          <div style={{ ...styles.jogButtonInner, ...styles.jogButtonZPlus1 }}>+1</div>
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z+ 0.1")}
          title="Move Z axis +0.1"
        >
          <div style={{ ...styles.jogButtonInner, ...styles.jogButtonZPlus01 }}>+0.1</div>
        </button>
      </Box>

      {/* Разделитель */}
      <div style={styles.jogDivider}></div>

      {/* Нижняя часть */}
      <Box column gap="7px">
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z- 0.1")}
          title="Move Z axis -0.1"
        >
          <div style={{ ...styles.jogButtonInner, ...styles.jogButtonZMinus01 }}>-0.1</div>
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z- 1")}
          title="Move Z axis -1"
        >
          <div style={{ ...styles.jogButtonInner, ...styles.jogButtonZMinus1 }}>-1</div>
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z- 10")}
          title="Move Z axis -10"
        >
          <div style={{ ...styles.jogButtonInner, ...styles.jogButtonZMinus10 }}>-10</div>
        </button>
      </Box>
    </Box>
  );
};
