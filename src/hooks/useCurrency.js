import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useCurrency = () => {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error('useCurrency must be used within FinanceProvider');
  }

  const formatCurrency = (amount, currency = context.currency) => {
    const currencySymbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
    };

    const symbol = currencySymbols[currency] || '₹';
    return `${symbol}${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return amount;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.rates[toCurrency];
      return amount * rate;
    } catch (error) {
      console.error('Currency conversion failed:', error);
      return amount;
    }
  };

  return {
    currency: context.currency,
    setCurrency: context.setCurrency,
    formatCurrency,
    convertCurrency,
  };
};
