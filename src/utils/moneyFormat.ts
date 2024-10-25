export const moneyFormat = new Intl.NumberFormat(navigator.languages[0], {
  style: "currency",
  currency: "EUR",
});

export function moneyFormatter(number: number): string {
  return moneyFormat.format(number);
}
