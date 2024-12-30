export const toLocaleString = (number: number) => {
  return number.toLocaleString();
};

export const formatCurrency = (number: number, currency?: string) => {
  if (!currency) return toLocaleString(number);

  const CURRENCY_FORMATTER = new Intl.NumberFormat("en-NG", {
    currency,
    style: "currency",
  });

  return CURRENCY_FORMATTER.format(number);
};
