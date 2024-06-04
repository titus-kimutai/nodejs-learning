//importing the uuid && date-fns
const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");
// const { constrainedMemory } = require('process')
const fs = require("fs").promises;
const path = require("path");

const LogEvents = async (message) => {
  try {
    //generating new uuid
    const id = uuidv4();

    const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    const LogItem = `${id}\t${date}\t hey👌👌👌 just a simple thing\n`;

    const folderPath = path.join(__dirname, "Logs");
    const filePath = path.join(folderPath, "eventLogs.txt");
    try {
      await fs.access(folderPath);
    } catch {
      await fs.mkdir(folderPath);
    }

    await fs.appendFile(filePath, LogItem, "utf8");

    console.log("file was written successfully");
  } catch (error) {
    console.error("Error logging event:", error);
  }
};

module.exports = LogEvents;
