// Enumeration (enums)

// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

enum LoadingState {
  beforeLoad = "beforeLoad",
  loading = "loading",
  loaded = "loaded",
}

const englishLoadingStates = {
  [LoadingState.beforeLoad]: "Before Load",
  [LoadingState.loading]: "Loading",
  [LoadingState.loaded]: "Loaded",
};

const isLoading = (state: LoadingState) => state === "loading";

console.log(isLoading(LoadingState.beforeLoad));

// LITERAL TYPES

// 1. Numeric literals
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;

  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5 + 1);
  }

  return pip;
}

//Argument of type '4' is not assignable to parameter of type '1 | 2 | 3'
// console.log(rollDice(4));
console.log(rollDice(2));

// 2. String literals
function sendEvent(name: "addToCart", data: { productId: number }): void;
function sendEvent(name: "checkout", data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent("addToCart", { productId: 122115 });
