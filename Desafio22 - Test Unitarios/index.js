/*
Desafío de la clase 22
Fecha de entrega: Miércoles 8
Hacer una función que se pueda sumar, restar, multiplicar y dividir,  y hacer pruebas unitarias.
Cuantas? Vos lo elegís, pero todas las pruebas unitarias tienen que pasar
Cualquier consulta pueden hablarnos por acá o al privado 
*/

const calculadora = (n1,operator, n2) => {

  const isNumber1 = typeof n1;
  const isNumber2 = typeof n2;
  const operatorTypeof = typeof operator;

  if (
    isNumber1 !== "number" ||
    isNumber2 !== "number" ||
    n1 === NaN ||
    n2 === NaN ||
    n1 === null ||
    n2 === null ||
    n1 === undefined ||
    n2 === undefined ||
    operatorTypeof !== "string" 
  ) {
    return false;
  } else {

    const number1Parse = parseFloat(n1);
    const number2Parse = parseFloat(n2);
    let resultado;

    switch (operator) {
      case "+":
        resultado = number1Parse + number2Parse;
        break;

      case "-":
        resultado = number1Parse - number2Parse;
          break;

      case "/":
        resultado = number1Parse / number2Parse;
        break;

      case "*":
        resultado = number1Parse * number2Parse;
        break;
    
      default:
        resultado = false;
        break;
    }

    return resultado;
  }
};

/* Ejemplos*/
// const operacionEjemploSuma = calculadora(5,"+",8);
// console.log(operacionEjemploSuma);
// const operacionEjemploResta = calculadora(5,"-",8);
// console.log(operacionEjemploResta);
// const operacionEjemploMulti = calculadora(5,"*",8);
// console.log(operacionEjemploMulti);
// const operacionEjemploDiv = calculadora(5,"/",8);
// console.log(operacionEjemploDiv);

module.exports = { calculadora };
