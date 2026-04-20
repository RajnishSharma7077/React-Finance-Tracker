import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useTransactions = () => {
  const context = useContext(FinanceContext);
  
  if (!context) {
    throw new Error('useTransactions must be used within FinanceProvider');
  }

  return {
    transactions: context.transactions,
    addTransaction: context.addTransaction,
    deleteTransaction: context.deleteTransaction,
    updateTransaction: context.updateTransaction,
    getCurrentMonthTransactions: context.getCurrentMonthTransactions,
  };
};
