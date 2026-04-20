import React, { createContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? JSON.parse(saved) : { monthlyBudget: 50000 };
  });

  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('currency');
    return saved ? saved : 'INR';
  });

  // Save transactions to localStorage whenever they change
  const saveTransactions = useCallback((newTransactions) => {
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  }, []);

  // Add new transaction
  const addTransaction = useCallback(
    (transactionData) => {
      const newTransaction = {
        id: uuidv4(),
        ...transactionData,
        createdAt: new Date().toISOString(),
      };
      const updated = [...transactions, newTransaction];
      saveTransactions(updated);
      return newTransaction;
    },
    [transactions, saveTransactions]
  );

  // Delete transaction
  const deleteTransaction = useCallback(
    (id) => {
      const updated = transactions.filter((t) => t.id !== id);
      saveTransactions(updated);
    },
    [transactions, saveTransactions]
  );

  // Update transaction
  const updateTransaction = useCallback(
    (id, updates) => {
      const updated = transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      saveTransactions(updated);
    },
    [transactions, saveTransactions]
  );

  // Update budget
  const updateBudget = useCallback((monthlyBudget) => {
    const newBudget = { monthlyBudget };
    setBudget(newBudget);
    localStorage.setItem('budget', JSON.stringify(newBudget));
  }, []);

  // Get transactions for current month
  const getCurrentMonthTransactions = useCallback(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return transactions.filter((t) => {
      const transDate = new Date(t.date);
      return (
        transDate.getFullYear() === currentYear &&
        transDate.getMonth() === currentMonth
      );
    });
  }, [transactions]);

  // Calculate total income
  const getTotalIncome = useCallback(
    (filteredTransactions = null) => {
      const txns = filteredTransactions || transactions;
      return txns
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    },
    [transactions]
  );

  // Calculate total expenses
  const getTotalExpenses = useCallback(
    (filteredTransactions = null) => {
      const txns = filteredTransactions || transactions;
      return txns
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    },
    [transactions]
  );

  // Get spending by category
  const getSpendingByCategory = useCallback(
    (filteredTransactions = null) => {
      const txns = filteredTransactions || transactions;
      const expenses = txns.filter((t) => t.type === 'expense');

      const categoryMap = {};
      expenses.forEach((t) => {
        const category = t.category || 'Uncategorized';
        categoryMap[category] = (categoryMap[category] || 0) + parseFloat(t.amount || 0);
      });

      return Object.entries(categoryMap)
        .map(([category, amount]) => ({
          category,
          amount,
        }))
        .sort((a, b) => b.amount - a.amount);
    },
    [transactions]
  );

  // Get monthly spending trend
  const getMonthlySpendinTrend = useCallback(
    (filteredTransactions = null) => {
      const txns = filteredTransactions || transactions;
      const monthlyData = {};

      txns.forEach((t) => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { income: 0, expense: 0 };
        }

        if (t.type === 'income') {
          monthlyData[monthKey].income += parseFloat(t.amount || 0);
        } else {
          monthlyData[monthKey].expense += parseFloat(t.amount || 0);
        }
      });

      return Object.entries(monthlyData)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([month, data]) => ({
          month,
          ...data,
        }));
    },
    [transactions]
  );

  const value = {
    transactions,
    budget,
    currency,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    updateBudget,
    setCurrency,
    getCurrentMonthTransactions,
    getTotalIncome,
    getTotalExpenses,
    getSpendingByCategory,
    getMonthlySpendinTrend,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};
