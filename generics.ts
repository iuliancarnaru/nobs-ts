// making a generic function
function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let value: T = initial;
  return [
    () => value,
    (v: T) => {
      value = v;
    },
  ];
}

const [st1getter, st1setter] = simpleState(1);
console.log(st1getter());
st1setter(62);
console.log(st1getter());

const [st2getter, st2setter] = simpleState<number | null>(null);
console.log(st2getter());
st2setter(62);
console.log(st2getter());

//////////////////////////////////////////////

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: "Bulbasaur",
    hp: 20,
  },
  {
    name: "Mew",
    hp: 60,
  },
  {
    name: "Charizard",
    hp: 30,
  },
];

const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);
