export const logWithTimestamp = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

export const validateGCode = (gcode) => {
  const lines = gcode.split("\n").map((line) => line.trim());
  const invalidLines = lines.filter((line) => {
    return !/^(G|M)[0-9]/i.test(line) && line !== "";
  });

  if (invalidLines.length > 0) {
    throw new Error(`Invalid G-code lines detected: ${invalidLines.join(", ")}`);
  }
  return lines.filter((line) => line);
};