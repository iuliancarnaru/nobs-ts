export const introduceMyself = (first: string, last: string): string =>
  `Hello ${first} ${last}`;

export const borgName = () => {
  const members = Math.round(Math.random() * 5) + 1;
  const member = Math.floor(Math.random() * members) + 1;

  return `Your Borg name is ${member} of ${members}`;
};
