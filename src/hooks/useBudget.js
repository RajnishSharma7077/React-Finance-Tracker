import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/FinanceContext';

export const useBudget = () => {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error('useBudget must be used within FinanceProvider');
  }

  const currentMonthTransactions = context.getCurrentMonthTransactions();
  const monthlyExpenses = context.getTotalExpenses(currentMonthTransactions);
  const monthlyIncome = context.getTotalIncome(currentMonthTransactions);

  const budgetData = useMemo(() => {
    const monthlyBudget = context.budget.monthlyBudget || 50000;
    const remaining = monthlyBudget - monthlyExpenses;
    const percentageUsed = (monthlyExpenses / monthlyBudget) * 100;

    return {
      monthlyBudget,
      monthlyExpenses,
      monthlyIncome,
      remaining,
      percentageUsed,
      isOverBudget: remaining < 0,
    };
  }, [context.budget, monthlyExpenses, monthlyIncome]);

  return {
    ...budgetData,
    updateBudget: context.updateBudget,
  };
};
