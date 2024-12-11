const styles = {
  jogBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: "10px",
    width: "50px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  jogBarButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  jogButton: {
    backgroundColor: "#3e4e5e",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    padding: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
  },
  jogButtonHover: {
    backgroundColor: "#5a6a7a",
    transform: "scale(1.05)",
  },
  jogDivider: {
    width: "100%",
    height: "2px",
    backgroundColor: "#ffffff",
    margin: "10px 0",
  },
};

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
        >
          +10
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z+ 1")}
        >
          +1
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z+ 0.1")}
        >
          +0.1
        </button>
      </div>

      {/* Разделитель */}
      <div style={styles.jogDivider}></div>

      {/* Нижняя часть */}
      <div style={styles.jogBarButtons}>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z- 0.1")}
        >
          -0.1
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z- 1")}
        >
          -1
        </button>
        <button
          style={styles.jogButton}
          onClick={() => handleCommand("Jog Z- 10")}
        >
          -10
        </button>
      </div>
    </div>
  );
};
