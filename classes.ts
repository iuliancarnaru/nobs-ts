interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
  // member visibility (private, protected, public)
  protected db: Record<string, string> = {};

  get(id: string): string {
    return this.db[id];
  }

  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDb extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentMemoryDb();
myDB.set("foo", "bar");
console.log(myDB.get("foo"));
console.log(myDB.saveToString());
const saved = myDB.saveToString();

const myDB2 = new PersistentMemoryDb();
myDB2.restoreFromString(saved);
console.log(myDB2.get("foo"));
