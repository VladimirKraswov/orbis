import { useState } from "react";
import { JogRose } from "./components/JogRose";
import { JogBar } from "./components/JogBar";
import { VelocityControls } from "./components/VelocityControls";
import { sendHttpCommand } from "../../api/apiCommands";
import { styles } from "./styles";
import { executeCommand, parseJogCommand } from "../../utils/commands";

const ControlPanel = () => {
  const [xyVelocity, setXYVelocity] = useState(1000);
  const [zVelocity, setZVelocity] = useState(500);

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

  return (
    <div id="controlPanel" style={styles.controlPanel}>
      <div style={styles.flexContainer}>
        <div id="control-body" style={styles.jogUIContainer}>
          <div id="JogUI">
            <JogRose onCommand={handleChange} />
          </div>
          <div id="JogBarUI" style={styles.jogBarUI}>
            <JogBar onCommand={handleChange} />
          </div>
        </div>
        <VelocityControls
          xyVelocity={xyVelocity}
          zVelocity={zVelocity}
          onXYVelocityChange={handleXYVelocityChange}
          onZVelocityChange={handleZVelocityChange}
        />
        <button
          style={styles.zeroButton}
          onClick={handleZeroButtonClick}
        >
          Ø<span style={{ fontSize: "8px", marginLeft: "5px" }}>XYZ</span>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
