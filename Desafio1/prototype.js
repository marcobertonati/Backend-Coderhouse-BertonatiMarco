function Usuario(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];

    this.getMascotas = function () {
        return this.mascotas.length;
    };
}

const lautaro = new Usuario("Lautaro", "Godoy");
const ramiro = new Usuario("Ramiro", "Luque");

/* 
Al declarar las funciones dentro del constructor como una propiedad, 
en cada instancia nueva que hagas (lautaro, ramiro) se va a guardar esa función en memoria
Entonces en este caso tendriamos dos funciones getMascota en la memoria
*/

// ------------------------

function Usuario(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
}

Usuario.prototype.getMascotas = function () {
    return this.mascotas.length
}

const lautaro = new Usuario("Lautaro", "Godoy");
const ramiro = new Usuario("Ramiro", "Luque");

/* 
 En cambio cuando creas a la funcion por fuera del constructor. Como un prototype de Usuario.
 esta función (prototype) se va a "reciclar" cada instancia. Entonces si tenemos a lautaro y ramiro
 solo va a existir un getMascotas en memoria.
 Imaginate un codigo de gran escala donde puede haber miles de Usuarios. 
 Declarando las funciones dentro del constructor como propiedades tendriamos miles de getMascotas en la memoria del proceso.
 En cambio usando delcarandolas como prototype tendriamos un unico getMascota. 
 No es la sintaxis mas linda, por eso se crearon las class de ES6 donde las funciones que declaraste vos por ejemplo ya son del prototype.
*/