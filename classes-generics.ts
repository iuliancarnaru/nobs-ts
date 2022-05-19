interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

type DBKeyType = string | number | symbol;

class InMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> {
  // member visibility (private, protected, public)
  protected db: Record<K, T> = {} as Record<K, T>;

  get(id: K): T {
    return this.db[id];
  }

  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb<T, K extends DBKeyType>
  extends InMemoryDatabase<T, K>
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentMemoryDb<number, string>();
myDB.set("foo", 102);
console.log(myDB.get("foo"));
console.log(myDB.saveToString());
const saved = myDB.saveToString();

const myDB2 = new PersistentMemoryDb<number, string>();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo"));
