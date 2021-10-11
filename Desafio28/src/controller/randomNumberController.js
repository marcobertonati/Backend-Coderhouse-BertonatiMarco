const { fork } = require("child_process");
const forkedRandomNumber = fork("./src/utils/randomNumber.js");
// const generateRandomNumber = require('../utils/randomNumber.js')

const randomNumberController = (req, res, next) => {
  console.log("Ingresó a randomNumberProcess.js");

  let { cant } = req.query;

  if (cant === undefined) {
    cant = 100000000;
  }

  forkedRandomNumber.send(cant);
  forkedRandomNumber.on("message", (objectNumbers) => {
    console.log("Finalizó proceso hijo");
    res.status(400).json(objectNumbers);
  });
};

module.exports = randomNumberController;
