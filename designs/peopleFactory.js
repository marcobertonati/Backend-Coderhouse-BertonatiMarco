class Person {
  name;
  lastname;

  constructor(data) {
    this.name = data.name;
    this.lastname = data.lastname;
  }
}

class Student extends Person {
  whatAmI = () => {
    return "I'm a student";
  };
}

class Professor {
  whatAmI = () => {
    return "I'm a professor";
  };
}

class Factory {
  // Design pattern factory

  newPerson = (type, data) => {
    switch (type) {
      case "student":
        return new Student(data);
      case "professor":
        return new Professor(data);
    }
  };
}

let _peopleFactoryInstance = null; // This is a singleton

exports.getPeopleFactory = () => {
  if (!_peopleFactoryInstance) {
    // This is a singleton | lazy creation
    _peopleFactoryInstance = new Factory();
  }
  return _peopleFactoryInstance;
};
