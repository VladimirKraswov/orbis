export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function parseCoordinates(part, prefix) {
  if (!part || !part.startsWith(prefix)) return null;
  try {
    const coords = part.replace(`${prefix}:`, '').split(',');
    return {
      x: parseFloat(coords[0]) || 0,
      y: parseFloat(coords[1]) || 0,
      z: parseFloat(coords[2]) || 0,
    };
  } catch (err) {
    console.error(`Error parsing coordinates for prefix ${prefix}:`, err);
    return null;
  }
}

export function parseMachineParameters(message) {
  try {
    const lines = message.split('\n');
    const parameters = {};

    lines.forEach((line) => {
      const match = line.match(/^\$(\d+)=([\d.]+)/);
      if (match) {
        const [, key, value] = match;
        parameters[`$${key}`] = parseFloat(value);
      }
    });

    return parameters;
  } catch (error) {
    console.error('Error parsing machine parameters:', error);
    return {};
  }
}