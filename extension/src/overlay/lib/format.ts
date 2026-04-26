const tryFormatter = new Intl.NumberFormat("tr-TR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatTRY(amount: number): string {
  return tryFormatter.format(amount);
}

export function formatUSD(amount: number): string {
  return usdFormatter.format(amount);
}

export function usdToTRY(usd: number, rate: number): number {
  return usd * rate;
}

export function formatRate(rate: number): string {
  return `1 USD = ${tryFormatter.format(rate)} TRY`;
}
