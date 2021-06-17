async function operacion(number1: number, number2: number, operator: string) {
    // let resultOperacion: number = 0;
    let valueResult: object = { value: null }

    if (operator === "suma") {
        let resultSuma: number;
        await import('./suma')
            .then(data => {
                resultSuma = new data.Suma(number1, number2).resultado();
                // return resultOperacion = resultSuma;
                return valueResult = { value: resultSuma };
            }).catch(e => e)
    }

    if (operator === "resta") {
        let resultResta: number;
        await import('./resta')
            .then(data => {
                resultResta = new data.Resta(number1, number2).resultado();
                // return valueResult.value = resultResta;
                return valueResult = { value: resultResta };
            }).catch(e => e)
    }

    if (operator !== "suma") {
        if (operator !== "resta") {
            // console.log(`Linea 31: La operación ${operator} no existe.`);
            return valueResult = { value: null }
        }
    }
    return valueResult;
}

const casosDePruebas: Object[] = [
    { valorUno: 1, valorDos: 8, operacion: "suma" },
    { valorUno: 6, valorDos: 3, operacion: "resta" },
    { valorUno: 1, valorDos: 1, operacion: "suma" },
    { valorUno: 1, valorDos: 5, operacion: "resta" },
    { valorUno: 1, valorDos: 5, operacion: "nope" }
];

async function operaciones(casos: Object[]) {
    for (let i = 0; i < casos.length; i++) {
        await operacion(casos[i].valorUno, casos[i].valorDos, casos[i].operacion)
            .then(data => {
                if (data.value === null) {
                    console.log(`La operación "${casos[i].operacion}" no existe`)
                } else {
                    console.log(`Este es el resultado de la cuenta 👉 ${casos[i].valorUno} ${casos[i].operacion} ${casos[i].valorDos} = ${data.value}`));
            }
}
    }
}

operaciones(casosDePruebas);