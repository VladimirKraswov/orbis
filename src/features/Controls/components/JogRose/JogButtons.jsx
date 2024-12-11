export const JogButtons = ({ onCommand }) => {
  const handleCommand = (command) => {
    if (onCommand) onCommand(command);
  };

  return (
    <g id="Jogging">
      {/* +X */}
      <g id="JogXPlus" onClick={() => handleCommand("Jog X+ 100")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M80,-50 L95,-70 A110,110 0 0,1 95,70 L80,50 A90,90 0 0,0 80,-50"
          fill="LightBlue"
        />
      </g>
      <g id="JogXPlus10" onClick={() => handleCommand("Jog X+ 10")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M60,-35 L70,-50 A90,90 0 0,1 70,50 L60,35 A70,70 0 0,0 60,-35"
          fill="#ADD8E6"
        />
      </g>
      <g id="JogXPlus1" onClick={() => handleCommand("Jog X+ 1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M45,-25 L55,-35 A70,70 0 0,1 55,35 L45,25 A50,50 0 0,0 45,-25"
          fill="#B0E0E6"
        />
      </g>
      <g id="JogXPlus01" onClick={() => handleCommand("Jog X+ 0.1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M35.16 -28.09 A45,45 0 0,1 35.16,28.09 L7.07,0 Z"
          fill="#E0FFFF"
        />
      </g>
      <g id="JogXMinus01" onClick={() => handleCommand("Jog X- 0.1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-35.16 -28.09 A45,45 0 0,0 -35.16,28.09 L-7.07,0 Z"
          fill="#E0FFFF"
        />
      </g>
      <g id="JogYPlus01" onClick={() => handleCommand("Jog Y+ 0.1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-28.09 -35.16 A45,45 0 0,1 29.09,-35.16 L0,-7.07 Z"
          fill="#FFE4E1"
        />
      </g>
      <g id="JogYMinus01" onClick={() => handleCommand("Jog Y- 0.1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-28.09 35.16 A45,45 0 0,0 29.09,35.16 L0,7.07 Z"
          fill="#FFE4E1"
        />
      </g>
      {/* Remaining unchanged parts */}
      {/* -X */}
      <g id="JogXMinus" onClick={() => handleCommand("Jog X- 100")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-80,-50 L-95,-70 A110,110 0 0,0 -95,70 L-80,50 A90,90 0 0,1 -80,-50"
          fill="LightBlue"
        />
      </g>
      <g id="JogXMinus10" onClick={() => handleCommand("Jog X- 10")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-60,-35 L-70,-50 A90,90 0 0,0 -70,50 L-60,35 A70,70 0 0,1 -60,-35"
          fill="#ADD8E6"
        />
      </g>
      <g id="JogXMinus1" onClick={() => handleCommand("Jog X- 1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-45,-25 L-55,-35 A70,70 0 0,0 -55,35 L-45,25 A50,50 0 0,1 -45,-25"
          fill="#B0E0E6"
        />
      </g>
      {/* +Y */}
      <g id="JogYPlus" onClick={() => handleCommand("Jog Y+ 100")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-50,-80 L-70,-95 A110,110 0 0,1 70,-95 L50,-80 A90,90 0 0,0 -50,-80"
          fill="LightCoral"
        />
      </g>
      <g id="JogYPlus10" onClick={() => handleCommand("Jog Y+ 10")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-35,-60 L-50,-70 A90,90 0 0,1 50,-70 L35,-60 A70,70 0 0,0 -35,-60"
          fill="#F08080"
        />
      </g>
      <g id="JogYPlus1" onClick={() => handleCommand("Jog Y+ 1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-25,-45 L-35,-55 A70,70 0 0,1 35,-55 L25,-45 A50,50 0 0,0 -25,-45"
          fill="#FA8072"
        />
      </g>
      {/* -Y */}
      <g id="JogYMinus" onClick={() => handleCommand("Jog Y- 100")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-50,80 L-70,95 A110,110 0 0,0 70,95 L50,80 A90,90 0 0,1 -50,80"
          fill="LightCoral"
        />
      </g>
      <g id="JogYMinus10" onClick={() => handleCommand("Jog Y- 10")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-35,60 L-50,70 A90,90 0 0,0 50,70 L35,60 A70,70 0 0,1 -35,60"
          fill="#F08080"
        />
      </g>
      <g id="JogYMinus1" onClick={() => handleCommand("Jog Y- 1")}
        transform="translate(120 120)">
        <path
          className="std"
          d="M-25,45 L-35,55 A70,70 0 0,0 35,55 L25,45 A50,50 0 0,1 -25,45"
          fill="#FA8072"
        />
      </g>
    </g>
  );
};
