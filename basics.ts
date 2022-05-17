// string
let username: string = "Iulian";

// boolean
let hasLoggedIn: boolean = true;

// number
let myNumber: number = 10;

// regex
let myRegex: RegExp = /foo/;

// array of strings
const names: string[] = username.split("");

// array generic type
const myValues: Array<number> = [1, 2, 3];

//objects
const person: {
  firstName: string;
  lastName: string;
} = {
  firstName: "Jack",
  lastName: "Herrington",
};

//interfaces
interface Person {
  firstName: string;
  lastName: string;
}

const personTwo: Person = {
  firstName: "Aneta",
  lastName: "Kasprzak",
};

// objects as maps
// utility type Record<>
const ids: Record<number, string> = {
  10: "a",
  20: "b",
};

ids[30] = "c";

// conditionals
if (ids[30] === "d") {
}

// loops
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// inferring the type in the callback
[1, 2, 3].forEach((nr) => console.log(nr));

//inferring the type in the returned array
const output = [4, 5, 6].map((nr) => nr + 5);
const output2 = [4, 5, 6].map((nr) => `${nr + 5}`);
