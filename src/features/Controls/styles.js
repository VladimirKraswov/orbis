export const styles = {
  controlPanel: {
    display: "flex",
    flexDirection: "row",
  },
  jogUIContainer: {
    display: "flex",
    justifyContent: "center",
  },
  jogBarUI: {},
  flexContainer: {
    flex: 1,
  },
  zeroButton: {
    marginTop: "10px",
    padding: "5px 10px",
    background: "linear-gradient(145deg, var(--color-gradient-start), var(--color-gradient-end))",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    color: "var(--color-text)",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "5px 5px 10px var(--color-shadow-primary), -5px -5px 10px var(--color-shadow-secondary)",
    transition: "all 0.3s ease",
  },
};