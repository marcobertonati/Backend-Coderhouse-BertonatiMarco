const log4js = require("log4js");

log4js.configure({
  appenders: {
    logConsole: { type: "console" },
    logFile: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["logConsole"], level: "info" },
    error: { appenders: ["logFile"], level: "error" },
  },
});

module.exports = log4js;
