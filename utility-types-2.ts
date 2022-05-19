// Constructor parameters and instance type
type Name = {
  fist: string;
  last: string;
};

function addFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.fist} ${name.last}`,
  };
}

function permuteRows<T extends (...args: any[]) => any>(
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(iteratorFunc);
}

console.log(permuteRows(addFullName, [{ fist: "Iulian", last: "Carnaru" }]));

/////////////////////////////////////////////

class PersonWithFullName {
  constructor(public name: Name) {}

  get fullName() {
    return `${this.name.fist} ${this.name.last}`;
  }
}

function createObjects<T extends new (...args: any[]) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((item) => new ObjectType(item));
}

console.log(
  createObjects(PersonWithFullName, [{ fist: "Iulian", last: "Carnaru" }]).map(
    (obj) => obj.fullName
  )
);
