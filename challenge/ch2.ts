// forEach implementation with reduce
function myForEach<T>(items: T[], forEachFunc: (v: T) => void): void {
  items.reduce((acc, value) => {
    forEachFunc(value);
    return undefined;
  }, undefined);
}

myForEach(["a", "b", "c"], (value) => console.log(`forEach ${value}`));

// filter implementation with reduce
function myFilter<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
  return items.reduce<T[]>(
    (acc, val) => (filterFunc(val) ? [...acc, val] : acc),
    []
  );
}

console.log(myFilter([1, 2, 3, 4, 5], (v) => v % 2 === 0));

// map implementation with reduce
function myMap<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
  return items.reduce<K[]>((acc, val) => [...acc, mapFunc(val)], [] as K[]);
}

console.log(myMap([1, 2, 3, 4, 5], (v) => (v * 2).toString()));
