const intlUsdFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const intlNumberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 4,
});

export function formatCurrency(value: number) {
  return intlUsdFormat.format(value);
}

export function formatNumber(value: number) {
  return intlNumberFormat.format(value);
}
