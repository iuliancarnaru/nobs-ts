class Doggy {
  // members in constructor
  constructor(public readonly name: string, public readonly age: number) {}
}

const lg = new Doggy("LG", 12);
console.log(lg.name);

// Singletons
class DogList {
  private doggies: Doggy[] = [];

  static instance: DogList = new DogList();

  private constructor() {}

  public addDog(dog: Doggy) {
    DogList.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

DogList.instance.addDog(lg);
DogList.instance.getDogs();

// Constructor of class 'DogList' is private and only accessible within the class declaration
// const dl = new DogList();
