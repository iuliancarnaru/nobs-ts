// typed arguments and returned value
function addNumbers(a: number, b: number): number {
  return a + b;
}

export default addNumbers;

/*
  the <any> type is something we try to avoid in TS (it means it )
  can be anything (string, number, array, undefined, null...etc.)
*/

// adding empty string as default parameter
export const addString = (str1: string, str2: string = ""): string =>
  `${str1} ${str2}`;

// union types |
export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;

// void functions (doesn't return anything)
export const printFormat = (title: string, param: string | number): void =>
  console.log(title, param);

// function that returns a Promise
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from URL`);

// REST parameters
export function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(" ")}`;
}

/*
  TS only enforce types at COMPILE time not at RUN time
*/

// optional chaining ? and nullish coalescing ??
export function getName(user: { firstName: string; lastName: string }): string {
  return `${user?.firstName ?? "fist"} ${user?.lastName ?? "last"}`;
}
