import { useState } from "react";

const tooltipStyles = {
  container: {
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
  },
  tooltip: {
    position: "absolute",
    bottom: "125%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#333",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    whiteSpace: "nowrap",
    fontSize: "14px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s, visibility 0.3s",
  },
  tooltipVisible: {
    opacity: 1,
    visibility: "visible",
  },
  arrow: {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: "5px solid #333",
  },
};

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      style={tooltipStyles.container}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        style={{
          ...tooltipStyles.tooltip,
          ...(isVisible ? tooltipStyles.tooltipVisible : {}),
        }}
      >
        {content}
        <div style={tooltipStyles.arrow}></div>
      </div>
    </div>
  );
};

export default Tooltip;