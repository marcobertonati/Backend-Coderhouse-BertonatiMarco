async function operacion(number1: number, number2: number, operator: string) {
    let resultOperacion: number = 0;
    if (operator === "suma") {
        console.log(`Linea 4: Entró a ${operator}`)
        let resultSuma: number;
        await import('./suma')
            .then(data => {
                // console.log(data)
                resultSuma = new data.Suma(number1, number2).resultado();
                // console.log(`Linea 10:El resultado de la suma es: ${resultSuma}`);
                return resultOperacion = resultSuma;
            })
            .catch(e => e)
    }

    if (operator === "resta") {
        console.log(`Linea 17: Entró a ${operator} `)
        let resultResta: number;

        await import('./resta')
            .then(data => {
                // console.log(data)
                resultResta = new data.Resta(number1, number2).resultado();
                // console.log(`Linea 24: El resultado de la resta es: ${resultResta}`);
                return resultOperacion = resultResta;
            })
            .catch(e => e)
    }

    console.log(operator)
    if (operator !== "suma" || "resta") {
        console.log(`Linea 31: La operación ${operator} no existe.`);
    }

    return resultOperacion;
}


const casosDePruebas: Object[] = [
    { valorUno: 1, valorDos: 8, operacion: "suma" },
    { valorUno: 6, valorDos: 3, operacion: "resta" },
    { valorUno: 1, valorDos: 1, operacion: "suma" },
    { valorUno: 1, valorDos: 5, operacion: "resta" },
    { valorUno: 1, valorDos: 5, operacion: "nope" }
];

function operaciones(casos: Object[]) {
    for (let i = 0; i < casos.length; i++) {
        operacion(casos[i].valorUno, casos[i].valorDos, casos[i].operacion)
            .then(data => console.log(`Este es el resultado de la cuenta 👉 ${casos[i].valorUno} ${casos[i].operacion} ${casos[i].valorDos} = ${data}`));
    }
}

operaciones(casosDePruebas);