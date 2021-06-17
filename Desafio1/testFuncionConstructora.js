function Persona (nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    Persona.contador++;
}

Persona.prototype.saludo = function() {
    console.log(`Hola ${this.nombre}`)
}

Persona.contador = 0;

let marco = new Persona ('Marco', 31)
let facundo = new Persona ('Facundo', 33)


marco.saludo()
console.log(Persona.contador)