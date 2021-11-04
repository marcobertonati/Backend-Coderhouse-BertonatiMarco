const express = require("express");
const app = express();
const log4js = require("./loggers/log4jsConfig");
const myLoggerInfo = log4js.getLogger();
const myLoggerError = log4js.getLogger("error");
app.use(express.json());

app.use((req, res, next) => {
  myLoggerInfo.info("Working!");
  next();
});

app.get("/", (req, res, next) => {
  res.send("hola!");
});

app.get("/suma", (req, res, next) => {
  const { n1, n2 } = req.query;

  const numberOne = parseInt(n1);
  const numberTwo = parseInt(n2);
  const result = numberOne + numberTwo;
  console.log(result);

  if (!isNaN(result)) {
    myLoggerInfo.info(`The result is ${result}`);
    res.status(200).json(result);
  } else {
    myLoggerError.error(
      `The user put an NaN in the query: ${n1} or maybe ${n2}`
    );
    res.status(200).json("The user put a NaN");
  }
});

app.listen(8080, () => myLoggerInfo.info("Working en port 8080!"));
