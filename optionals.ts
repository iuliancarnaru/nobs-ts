// optional parameters
// you can't put a required parameter after an optional one
function printIngredient(quantity: string, ingredient: string, extra?: string) {
  console.log(`${quantity} ${ingredient} ${extra ? `${extra}` : ""}`);
}

printIngredient("1Cup", "Flower");

// optional fields
interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
  }

  return "";
}

function getEmailEasy(user: User): string {
  return user?.info?.email ?? "";
}

// invoking optional callback function
function addWithCallback(x: number, y: number, callback?: () => void) {
  console.log([x, y]);
  callback?.();
}
