abstract class StreetFighter {
  constructor() {}

  move() {}

  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return "Hadoken";
  }

  get name(): string {
    return "Ryu";
  }
}

class Jax extends StreetFighter {
  getSpecialAttack(): string {
    return "Punch";
  }

  get name(): string {
    return "Jax";
  }
}

const ryu = new Ryu();
const jax = new Jax();

console.log(ryu.getSpecialAttack());
console.log(ryu.fight());

console.log(jax.getSpecialAttack());
console.log(jax.fight());
