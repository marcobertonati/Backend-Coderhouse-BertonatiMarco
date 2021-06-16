// Esta funcion NO IMPORTA - pensa que puede ser cualquier funcion asincrona
// Como la importación del modulo
const workToDo = async () => {
    return new Promise((resolve, recect) => {
        setTimeout(() => {
            resolve('4 seconds after')
        }, 4000)
    })
}
​
// Ejemplo con async/await
const asyncFun = async () => {
    console.log('starting asyncFunc')
    //El resultado de la promesa lo obtenes como si estubieras llamanda a una funcion norma
    // Y la almacenas en una variable o la usas como gustes. Obviamente para que esto funcione tiene que estar el await
    const resultOfPromise = await workToDo() 
    console.log(resultOfPromise)
    console.log('End asyncFunc')
}


// Mismo ejemplo pero con .then​
const thenFun = () => {
    console.log('statring thenFun')
    workToDo().then((resultOfPromise) => {
        // Aca el resultado de la promesa llega por el parametro de la funcion then
        console.log(resultOfPromise)
        console.log('End of thenFun')
    })
}
​
/* asyncFun()
thenFun() */

// Viendo esto trata de aplicar solamente async/await en el desafio 2

// Cuando importas los modulos
// Cuando llamas a cada funcion operacion