import { styles } from "./styles";

const IconButton = ({ icon, tooltip, onClick }) => {
  const showTooltip = (e) => {
    const tooltipEl = e.currentTarget.querySelector('.tooltip');
    if (tooltipEl) {
      tooltipEl.style.visibility = 'visible';
      tooltipEl.style.opacity = '1';
    }
  };

  const hideTooltip = (e) => {
    const tooltipEl = e.currentTarget.querySelector('.tooltip');
    if (tooltipEl) {
      tooltipEl.style.visibility = 'hidden';
      tooltipEl.style.opacity = '0';
    }
  };

  return (
    <div
      style={styles.buttonWrapperStyle}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <button onClick={onClick} style={styles.iconButtonStyle}>
        {icon}
      </button>
      <div className="tooltip" style={styles.tooltipStyle}>{tooltip}</div>
    </div>
  );
};

export default IconButton;
