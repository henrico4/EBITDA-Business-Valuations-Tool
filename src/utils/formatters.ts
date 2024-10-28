export const formatCurrency = (value: number, currencyCode: string): string => {
  const currencyFormats: { [key: string]: { style: string, currency: string, minimumFractionDigits: number, maximumFractionDigits: number } } = {
    JPY: {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    },
    default: {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  };

  const format = currencyFormats[currencyCode] || currencyFormats.default;
  return new Intl.NumberFormat('en-US', format).format(value);
};