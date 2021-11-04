const { suma } = require("./sumar");

process.on("message", (msg) => {
  console.log("Sumar working!");
  const resultado = suma();
  process.send(resultado);
});
