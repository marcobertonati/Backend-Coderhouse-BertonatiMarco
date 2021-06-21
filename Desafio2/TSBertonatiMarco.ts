async function operacion(number1: number, number2: number, operator: string) {
    
    let valueResult: object = { value: null }

    if (operator === "suma") {
        let module = await import('./suma');
        let resultSuma: number = new module.Suma(number1,number2).resultado();
        return valueResult = {value: resultSuma};
    }

    if (operator === "resta") {
        let module = await import('./resta');
        let resultResta: number = new module.Resta(number1,number2).resultado();
        return valueResult = {value: resultResta};

    }

    if (operator !== "suma" && "resta") {
            return valueResult = { value: `No existe la operación "${operator}"` }
    }

    return valueResult;
}

async function operaciones() {
    let operacionUno = await operacion(1,2,"suma");
    console.log(operacionUno.value);

    let operacionDos = await operacion(6,20,"resta");
    console.log(operacionDos.value);

    let operacionTres = await operacion(2,3,"qwerty");
    console.log(operacionTres.value);

    /* Probando Promise.all */
    let operacionesAllAwait = await Promise.all([operacion(4,5,"suma"), operacion(30,10,"resta"), operacion(20,20,"asd")]);
    operacionesAllAwait.forEach(e=>console.log(`El resultado es: ${e.value}`))
}

operaciones();


/*-----------------------------------------------*/
// ABAJO EJERCICIOS DE OTRA FORMA RESULTA)

// const casosDePruebas: Object[] = [
//     { valorUno: 1, valorDos: 8, operacion: "suma" },
//     // { valorUno: 6, valorDos: 3, operacion: "resta" },
//     { valorUno: 1, valorDos: 1, operacion: "suma" },
//     // { valorUno: 1, valorDos: 5, operacion: "resta" },
//     // { valorUno: 1, valorDos: 5, operacion: "nope" }
// ];

// function operaciones(casos: Object[]) {
//     for (let i = 0; i < casos.length; i++) {
//         operacion(casos[i].valorUno, casos[i].valorDos, casos[i].operacion)
//             .then(data => {
//                 if (data.value === null) {
//                     console.log(`La operación "${casos[i].operacion}" no existe`)
//                 } else {
//                     console.log(`Este es el resultado de la cuenta 👉 ${casos[i].valorUno} ${casos[i].operacion} ${casos[i].valorDos} = ${data.value}`));
//             }
// }
//     }
// }

// operaciones(casosDePruebas);