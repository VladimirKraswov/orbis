import { styles } from "./styles";

export const JogBar = ({ onCommand }) => {
  const handleCommand = (command) => {
    if (onCommand) onCommand(command);
  };

  return (
    <div style={styles.jogBar}>
      {/* Верхняя часть */}
      <div style={styles.jogBarButtons}>
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
      </div>

      {/* Разделитель */}
      <div style={styles.jogDivider}></div>

      {/* Нижняя часть */}
      <div style={styles.jogBarButtons}>
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
      </div>
    </div>
  );
};
