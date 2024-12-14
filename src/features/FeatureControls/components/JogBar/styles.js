export const styles = {
  jogButton: {
    border: "none",
    borderRadius: "3px",
    padding: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s, transform 0.2s",
    position: "relative",
    width: "40px",
    height: "32px",
  },
  jogButtonInner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: "14px",
  },
  jogButtonZPlus10: {
    backgroundColor: "#1E90FF", // Тёмно-синий
  },
  jogButtonZPlus1: {
    backgroundColor: "#4682B4", // Средний синий
  },
  jogButtonZPlus01: {
    backgroundColor: "#87CEEB", // Светло-синий
  },
  jogButtonZMinus01: {
    backgroundColor: "#87CEEB", // Светло-синий
  },
  jogButtonZMinus1: {
    backgroundColor: "#4682B4", // Средний синий
  },
  jogButtonZMinus10: {
    backgroundColor: "#1E90FF", // Тёмно-синий
  },
  jogDivider: {
    width: "100%",
    height: "2px",
    backgroundColor: "#ffffff",
    margin: "10px 0",
  },
};