export const HomeButtons = ({ onCommand }) => {
  const handleCommand = (command) => {
    if (onCommand) onCommand(command);
  };

  return (
    <g id="HomeButtons">
      <defs>
        <linearGradient id="allGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF5733", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#2E8B57", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1E90FF", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g id="HomeAll" onClick={() => handleCommand("Home")}>
        <path
          className="std"
          d="M10 182.5 h-10 v57.5 h57.5 v-10 a 125,125 0 0,1 -47.5 -47.5 Z"
          fill="url(#allGradient)"
        />
        <use x="3" y="217" width="20" height="18" xlinkHref="#HomeIcon" />
        <title>Home all axes</title>
      </g>
      <g id="HomeX" onClick={() => handleCommand("Home X")}>
        <path
          className="std"
          d="M10 57.5 h-10 v-57.5 h57.5 v10 a 125,125 0 0,0 -47.5 47.5 Z"
          fill="#FF5733"
        />
        <use x="3" y="5" width="20" height="18" xlinkHref="#HomeIcon" />
        <text x="25" y="20" fontSize="12" fill="#000">X</text>
        <title>Home X axis</title>
      </g>
      <g id="HomeY" onClick={() => handleCommand("Home Y")}>
        <path
          className="std"
          d="M230 57.5 h10 v-57.5 h-57.5 v10 a 125,125 0 0,1 47.5 47.5 z"
          fill="#2E8B57"
        />
        <use x="217" y="5" width="20" height="18" xlinkHref="#HomeIcon" />
        <text x="202" y="20" fontSize="12" fill="#000">Y</text>
        <title>Home Y axis</title>
      </g>
      <g id="HomeZ" onClick={() => handleCommand("Home Z")}>
        <path
          className="std"
          d="M230 182.5 h10 v57.5 h-57.5 v-10 a 125,125 0 0,0 47.5 -47.5 z"
          fill="#1E90FF"
        />
        <use x="217" y="217" width="20" height="18" xlinkHref="#HomeIcon" />
        <text x="202" y="232" fontSize="12" fill="#000">Z</text>
        <title>Home Z axis</title>
      </g>
    </g>
  );
};
