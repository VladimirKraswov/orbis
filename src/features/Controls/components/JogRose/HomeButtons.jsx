export const HomeButtons = ({ onCommand }) => {
  const handleCommand = (command) => {
    if (onCommand) onCommand(command);
  };

  return (
    <g id="HomeButtons">
      <g id="HomeAll" onClick={() => handleCommand("Home")}>
        <path
          className="std"
          d="M10 182.5 h-10 v57.5 h57.5 v-10 a 125,125 0 0,1 -47.5 -47.5 Z"
          fill="#f0f0f0"
        />
        <use x="3" y="217" width="20" height="18" xlinkHref="#HomeIcon" />
      </g>
      <g id="HomeX" onClick={() => handleCommand("Home Y")}>
        <path
          className="std"
          d="M10 57.5 h-10 v-57.5 h57.5 v10 a 125,125 0 0,0 -47.5 47.5 Z"
          fill="Khaki"
        />
        <use x="3" y="5" width="20" height="18" xlinkHref="#HomeIcon" />
        <text x="25" y="20" fontSize="12" fill="#000">X</text>
      </g>
      <g id="HomeY" onClick={() => handleCommand("Home Y")}>
        <path
          className="std"
          d="M230 57.5 h10 v-57.5 h-57.5 v10 a 125,125 0 0,1 47.5 47.5 z"
          fill="SteelBlue"
        />
        <use x="217" y="5" width="20" height="18" xlinkHref="#HomeIcon" />
        <text x="202" y="20" fontSize="12" fill="#000">Y</text>
      </g>
      <g id="HomeZ" onClick={() => handleCommand("Home Z")}>
        <path
          className="std"
          d="M230 182.5 h10 v57.5 h-57.5 v-10 a 125,125 0 0,0 47.5 -47.5 z"
          fill="DarkSeaGreen"
        />
        <use x="217" y="217" width="20" height="18" xlinkHref="#HomeIcon" />
        <text x="202" y="232" fontSize="12" fill="#000">Z</text>
      </g>
    </g>
  );
};
