const util = require('util');
// const { empresa } = require('./data/empresa');
const data = require('./data/hold').holding;
const { normalize, schema } = require('normalizr');


/**GENERICO 1 */

// const employees = new schema.Entity('empelado');


// const empresaSchema = new schema.Entity('empresa', {
//     gerente: employees,
//     encargado: employees,
//     empleados: [employees]
// });

// const normalizedEmpresa = normalize(empresa, empresaSchema)

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

// print(normalizedEmpresa);

/***GENERICO 3****/


const empleado = new schema.Entity('empelado');


const empresa = new schema.Entity('empresa', {
    gerente: empleado,
    encargado: empleado,
    empleados: [empleado]
});

const empresas = new schema.Entity('empresas', {
    empresas: [empresa]
})



const normalizedEmpresas = normalize(data, empresas)

print(normalizedEmpresas);
