interface Cat {
  name: string;
  breed: string;
}

// Read only fields
// interface ReadOnlyCat {
//   readonly name: string;
//   readonly breed: string;
// }

// Readonly utility type
type ReadOnlyCat = Readonly<Cat>;

function makeCat(name: string, breed: string): ReadOnlyCat {
  return {
    name,
    breed,
  };
}

const fibi = makeCat("Fibi", "House Cat");

// fibi.name = "Phoebe";
// Cannot assign to 'name' because it is a read-only property.

// Read only tuples
function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [x: number, y: number, z: number] {
  return [x, y, z];
}

const coord = makeCoordinate(10, 12, 15);
// Cannot assign to '0' because it is a read-only property
// coord[0] = 50;

// Immutable arrays
const reallyConst = [1, 2, 3] as const;
// Cannot assign to '0' because it is a read-only property
// reallyConst[0] = 50;
