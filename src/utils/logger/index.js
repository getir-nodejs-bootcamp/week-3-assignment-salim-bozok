const fs = require("fs");

const prepareLogFile = () => {
  // Create log.json file if it doesn't exist
  fs.open("log.json", "wx", (err, fd) => {
    // we don't use ft.access because it might cause race condition
    if (err) {
      // check whether or not log.json file is exist
      if (err.code === "EEXIST") {
        // if the file already exist return immediately
        return;
      }
      console.log("something went wrong while opening the log.json file", err);
    }

    // create log.json file if it doesn't exist
    fs.writeFile(fd, "[]", (err) => {
      fs.close(fd);
      if (err) {
        console.log(
          "something went wrong while creating the log.json file",
          err
        );
        return;
      }
    });
  });
};

// pushNewLog read the current file and push the new log to the file
function pushNewLog(newLog) {
  fs.readFile("log.json", "utf-8", (err, data) => {
    if (err) {
      console.log("something went wrong while reading the log file", err);
      return;
    }

    const log = JSON.parse(data);

    log.push(newLog);

    fs.writeFile("log.json", JSON.stringify(log), (err) => {
      if (err) {
        console.log(
          "something went wrong while pushing new log to the file",
          err
        );
        return;
      }
    });
  });
}

module.exports = {
  prepareLogFile,
  pushNewLog,
};
