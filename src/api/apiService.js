// @ts-ignore
export const sendCommand = async (commandText) => {
  const url = `http://192.168.1.149/command?commandText=${encodeURIComponent(commandText)}&PAGEID=0`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text(); // Assuming the response is plain text
    console.log(`Command response: ${data}`);
    return data;
  } catch (error) {
    console.error(`Error sending command: ${error}`);
    throw error;
  }
};
