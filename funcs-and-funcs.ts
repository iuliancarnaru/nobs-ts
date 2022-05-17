// type a callback function
export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

// functions as a type
export type MutationFunction = (nr: number) => number;

// function with parameters
export function arrayMutate(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3, 4], (nr) => nr * 10));

// using declared function type
const myNewMutateFunc: MutationFunction = (v: number) => v - 10;

// functions that return functions
export type AdderFunction = (val: number) => number;

export function createAdder(num: number): AdderFunction {
  return (val: number) => num + val;
}

/*
  instead of:

  export function createAdder(num: number): (val: number) => number {
    return (val: number) => num + val;
  }
  
*/

const addOne = createAdder(1);
console.log(addOne(55));
