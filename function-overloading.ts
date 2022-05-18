interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(str: string): Coordinate;
// optional parameter ?
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      //coord[key as 'x' | 'y'] = parseInt(value, 10);
      coord[key as keyof Coordinate] = parseInt(value, 10);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      // using keyword <as> to change the type from unknown to Coordinate
      ...(arg1 as Coordinate),
    };
  } else {
    coord = {
      // using keyword <as> to change the type from unknown to number
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

/*
  unknown is like <any> where you have to cast it before you use it
  (save <any>)
*/

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 12, y: 87 }));
console.log(parseCoordinate("x:1, y:24"));
