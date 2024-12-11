import { useState } from "react";
import { JogRose } from "./components/JogRose";
import { JogBar } from "./components/JogBar";
import { VelocityControls } from "./components/VelocityControls";
import { sendHttpCommand } from "../../api/apiCommands";
import { styles } from "./styles";
import { executeCommand, parseJogCommand } from "../../utils/commands";
import PositionLabels from "./components/Positions";
import useMachineStatus from "../../hooks/useMachineStatus";

const ControlPanel = () => {
  const [xyVelocity, setXYVelocity] = useState(1000);
  const [zVelocity, setZVelocity] = useState(500);
  const { mPos, wPos } = useMachineStatus(); 
  const handleXYVelocityChange = (value) => {
    console.log(`XY velocity updated to: ${value} mm/min`);
    setXYVelocity(value);
  };

  const handleZVelocityChange = (value) => {
    console.log(`Z velocity updated to: ${value} mm/min`);
    setZVelocity(value);
  };

  const handleChange = async (command) => {
    const commandsMap = {
      "Home": "$H",
      "Home X": "$HX",
      "Home Y": "$HY",
      "Home Z": "$HZ",
    };

    if (commandsMap[command]) {
      await executeCommand(commandsMap[command], sendHttpCommand);
      return;
    }

    if (command.startsWith("Jog X") || command.startsWith("Jog Y")) {
      const jogCommand = parseJogCommand(command, xyVelocity, ["X", "Y"]);
      if (jogCommand) {
        await executeCommand(jogCommand, sendHttpCommand);
      } else {
        console.error("Invalid XY jog command");
      }
      return;
    }

    if (command.startsWith("Jog Z")) {
      const jogCommand = parseJogCommand(command, zVelocity, ["Z"]);
      if (jogCommand) {
        await executeCommand(jogCommand, sendHttpCommand);
      } else {
        console.error("Invalid Z jog command");
      }
      return;
    }

    console.error("Invalid command");
  };

  const handleZeroButtonClick = async () => {
    const command = "G10 L20 P0 X0 Y0 Z0";
    await executeCommand(command, sendHttpCommand);
  };

  const positions = [
    {
      label: "Xw",
      value: wPos?.x.toFixed(3) ?? '990.000',
      subPosition: {
        label: "Xm",
        value: mPos?.x.toFixed(3) ?? '0.000',
      },
    },
    {
      label: "Yw",
      value: wPos?.y.toFixed(3) ?? '990.000',
      subPosition: {
        label: "Ym",
        value: mPos?.y.toFixed(3) ?? '0.000',
      },
    },
    {
      label: "Zw",
      value: wPos?.z.toFixed(3) ?? '990.000',
      subPosition: {
        label: "Zm",
        value: mPos?.z.toFixed(3) ?? '0.000',
      },
    },
  ];

  return (
    <div style={styles.controlPanel}>
        <div style={styles.jogContainer}>
          <VelocityControls
            xyVelocity={xyVelocity}
            zVelocity={zVelocity}
            onXYVelocityChange={handleXYVelocityChange}
            onZVelocityChange={handleZVelocityChange}
          />
          <div style={styles.jog}>
              <JogRose onCommand={handleChange} />
              <JogBar onCommand={handleChange} />
          </div>
        </div>
        <PositionLabels positions={positions} onZero={handleZeroButtonClick} />
    </div>
  );
};

export default ControlPanel;
