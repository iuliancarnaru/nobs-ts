// type myFlexibleDogInfo = {
//   name: string;
// } & Record<string, string>;

type myFlexibleDogInfo = {
  name: string;
  [key: string]: string | number;
};

const dog: myFlexibleDogInfo = {
  name: "Bobby",
  breed: "Mutt",
  age: 14,
};

interface DogInfo {
  name: string;
  age: number;
}

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionsFlags<DogInfo>;

//////////////////////////////

// template literals
type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<
    string & Property
  >}Delete`]?: () => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {}

const puffy: DogInfo = {
  name: "Puffy",
  age: 13,
};

type DogInfoListeners = Listeners<DogInfo>;

listenToObject(puffy, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {},
  onNameDelete: () => {},
});
