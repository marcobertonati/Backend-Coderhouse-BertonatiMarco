process.on("message", (cant) => {
  console.log(`Ingresó a proceso hijo solicitando una cantidad de ${cant} numeros randoms`);
  const cantidadDeNumeros = parseInt(cant);
  const objectNumbers = {};
  const arrayNumbers = [];

  const generateRandomNumber = (cant) => {

    for (i = 1; i <= cant; i++) {
      arrayNumbers.push(Math.floor(Math.random() * 1000 + 1));
    }

    arrayNumbers.forEach((n) => {
      objectNumbers[n] =
        objectNumbers[n] == undefined ? 1 : objectNumbers[n] + 1;
    });

    process.send(objectNumbers);
  };

  generateRandomNumber(cantidadDeNumeros);
});
