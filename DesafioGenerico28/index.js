const express = require("express");
const app = express();
const { suma } = require("./sumar");
const { fork } = require("child_process");
const forked = fork("sumarFork.js");

// const PORT = parseInt(process.argv[2]) || 8090;

// const data = process.argv.slice(2).map(number => parseInt(number));

// const datos = {
//     datos: {
//         numeros: data,
//         promedio: data.reduce((num, acc) => acc+num) / data.length,
//         max: data.reduce((num, acc) => acc > num ? acc : acc = num),
//         min: data.reduce((num, acc) => acc < num ? acc : acc = num),
//         ejecutable: process.argv[1],
//         pid: process.pid
//     }
// }

let visitas = 0;

app.get("/", (req, res, next) => {
  visitas = visitas + 1;
  res.send(`La cantidad de visitas es ${visitas}`);
});

app.get("/calculo-bloq", (req, res, next) => {
  const result = suma();
  console.log(result);
  res.send("Fin");
});

app.get("/calculo-nobloq", (req, res, next) => {
  console.log("Enro a calculo no bloq");
  forked.send("start");
  forked.on("message", (resultado) => {
    console.log(`La suma es ${resultado}`);
    res.send(`La suma es ${resultado}`);
  });
});

app.listen(8090, () => console.log(`Working on 8090`));
