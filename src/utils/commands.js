export const generateJogCommand = (axis, direction, distance, velocity) => {
  return `$J=G91 G21 F${velocity} ${axis}${direction}${distance}`;
};

export const parseJogCommand = (command, velocity, validAxes) => {
  const match = command.match(new RegExp(`^Jog (${validAxes.join("|")})([+-]) (\\d+(\\.\\d+)?)$`));
  if (match) {
    const [, axis, direction, distance] = match;
    console.log(`Parsed command - Axis: ${axis}, Direction: ${direction}, Distance: ${distance}, Velocity: ${velocity}`);
    return generateJogCommand(axis, direction, distance, velocity);
  }
  return null;
};

export const executeCommand = async (command, sendHttpCommand) => {
  const url = `${command}&PAGEID=1`;
  try {
    console.log(`Sending command: ${url}`);
    await sendHttpCommand(url);
    console.log(`Command sent: ${url}`);
  } catch (error) {
    console.error(`Failed to send command: ${url}`, error);
  }
};