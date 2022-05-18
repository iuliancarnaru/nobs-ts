function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const cats = [
  {
    name: "Neko",
    age: 10,
  },
  {
    name: "Fibi",
    age: 12,
  },
];

console.log(pluck(cats, "age"));
console.log(pluck(cats, "name"));

// event map
interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  // adding extra fields to a interface
  addToCart: BaseEvent & { quantity: number; productId: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log(name, data);
}

sendEvent("addToCart", {
  productId: "foo",
  user: "baz",
  quantity: 2,
  time: 100,
});

sendEvent("checkout", {
  time: 14,
  user: "fiz",
});
