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

export const rotateIcon = (icon, rotation) => (
  <g transform={`rotate(${rotation}, 600, 600)`}>
    <path fill="black" d={icon} />
  </g>
);

/**
 * Converts a file size in bytes into a human-readable format.
 * @param {number} size - The size of the file in bytes.
 * @returns {string} - Human-readable file size (e.g., "10 KB", "5 MB").
 */
export const humanizeSize = (size) => {
  if (size === 0) return '0 bytes';
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
};

export const normalizePath = (basePath, subPath) => {
  if (!basePath.endsWith('/')) basePath += '/';
  if (subPath.startsWith('/')) subPath = subPath.slice(1);

  const result = `${basePath}${subPath}`.replace(/\/{2,}/g, '/');
  return result.replace(/\/$/, '') || '/';
};



