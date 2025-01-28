export function naturalSequence(last: number): number[] {
  return [...Array(last + 1).keys()].slice(1);
}
