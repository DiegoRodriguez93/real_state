export const formatCurrency = (amount: string) => Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0 });
