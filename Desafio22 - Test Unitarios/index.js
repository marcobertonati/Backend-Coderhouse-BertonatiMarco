/*
Desafío de la clase 22
Fecha de entrega: Miércoles 8
Hacer una función que se pueda sumar, restar, multiplicar y dividir,  y hacer pruebas unitarias.
Cuantas? Vos lo elegís, pero todas las pruebas unitarias tienen que pasar
Cualquier consulta pueden hablarnos por acá o al privado 
*/

const calculadora = (n1, n2) => {
  const isNumber1 = typeof n1;
  const isNumber2 = typeof n2;
  if (
    isNumber1 !== "number" ||
    isNumber2 !== "number" ||
    n1 === NaN ||
    n2 === NaN ||
    n1 === null ||
    n2 === null ||
    n1 === undefined ||
    n2 === undefined
  ) {
    return false;
  } else {
    const number1Parse = parseFloat(n1);
    const number2Parse = parseFloat(n2);
    const results = {
      suma: number1Parse + number2Parse,
      resta: number1Parse - number2Parse,
      multiplicacion: number1Parse * number2Parse,
      division: number1Parse / number2Parse,
    };
    // console.log(results)
    return true;
  }
};

calculadora(2, 3);

module.exports = { calculadora };
