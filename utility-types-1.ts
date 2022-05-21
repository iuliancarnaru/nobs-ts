// PARTIAL
// make all the fields in a given type optionals

interface MyUser {
  name: string;
  id: number;
  email?: string;
}

type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      id: 1,
      name: "Iulian",
      email: "iulian@test.com",
    },
    {
      email: "carnaru@test.com",
    }
  )
);

// REQUIRED
// make all the fields in a given type required

type RequiredMyUser = Required<MyUser>;

// make an initial optional field required
interface NewPerson {
  id: string;
  name: string;
  age?: number;
  email?: string;
}

type PersonWithRequiredEmail = NewPerson & Required<Pick<NewPerson, "email">>;

function printPerson(person: PersonWithRequiredEmail): void {}

/* 
  Property 'email' is missing in type '{ id: string; name: string; }'
  but required in type 'Required<Pick<NewPerson, "email">>'
 */

// printPerson({ id: "2", name: "Iulian" });

// PICK
// pick provided keys from a certain type

type JustEmailAndName = Pick<MyUser, "email" | "name">;

// OMIT
// omits certain fields from a type

type UserWithoutId = Omit<MyUser, "id">;

// RECORD and TYPES FROM FIELDS -> MyUser["id"]

const mapById = (users: MyUser[]): Record<MyUser["id"], UserWithoutId> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;

    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: 2,
      name: "Mr Foo",
    },
    {
      id: 3,
      name: "Mis Biz",
    },
  ])
);
