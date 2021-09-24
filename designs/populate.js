const { getPeopleFactory } = require("./peopleFactory");

console.log("Starting class day");

const peopleFactory = getPeopleFactory();

console.log("Factory created");

const student1 = peopleFactory.newPerson("student", {
  name: "pepe",
  lastname: "Argento",
});
const student2 = peopleFactory.newPerson("student", {
  name: "juan",
  lastname: "Perez",
});
console.log("Students created");

const proffesor = peopleFactory.newPerson("professor", {
  name: "Steven",
  lastname: "Hawking",
});
console.log("Professor created");

const classroom = [];

classroom.push(proffesor);
classroom.push(student1);
classroom.push(student2);

console.log(`The classroom has ${classroom.length} people in it`);
