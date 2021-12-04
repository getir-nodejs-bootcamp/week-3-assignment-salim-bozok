const { pushNewLog } = require("../utils/logger");

module.exports = (req, res, next) => {
  const newLog = {
    date: new Date(),
    url: req.url,
    method: req.method,
  };

  // we use the finish event for adding the status code to the log
  res.on("finish", function () {
    newLog.status = this.statusCode;
    pushNewLog(newLog);
  });

  next();
};
