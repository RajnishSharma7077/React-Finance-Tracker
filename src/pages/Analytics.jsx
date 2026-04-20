import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useCurrency } from '../hooks/useCurrency';
import {
  SpendingCategoryChart,
  MonthlySpensingTrendChart,
  IncomeVsExpenseChart,
} from '../components/Charts';

const Analytics = () => {
  const context = useContext(FinanceContext);
  const { formatCurrency: format } = useCurrency();
  const [timeRange, setTimeRange] = useState('all');

  const allTransactions = context.transactions;
  const currentMonthTransactions = context.getCurrentMonthTransactions();

  // Get transactions for the selected time range
  const getTransactionsForRange = () => {
    if (timeRange === 'all') return allTransactions;
    if (timeRange === 'month') return currentMonthTransactions;

    const now = new Date();
    const rangeStart = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate()); // 3 months

    return allTransactions.filter((t) => new Date(t.date) >= rangeStart);
  };

  const filteredTransactions = getTransactionsForRange();
  const totalIncome = context.getTotalIncome(filteredTransactions);
  const totalExpenses = context.getTotalExpenses(filteredTransactions);
  const spendingByCategory = context.getSpendingByCategory(filteredTransactions);
  const monthlySpendings = context.getMonthlySpendinTrend(filteredTransactions);

  // Calculate additional metrics
  const averageTransaction = filteredTransactions.length
    ? (totalIncome + totalExpenses) / filteredTransactions.length
    : 0;

  const highestSpendingCategory = spendingByCategory[0] || null;
  const mostFrequentCategory = getMostFrequentCategory();

  function getMostFrequentCategory() {
    const categoryCount = {};
    filteredTransactions.forEach((t) => {
      if (t.type === 'expense') {
        categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
      }
    });
    const entries = Object.entries(categoryCount);
    return entries.length > 0
      ? entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0]
      : 'N/A';
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-900 to-slate-900" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 25%, rgba(34,197,94,0.22) 0%, transparent 48%), radial-gradient(circle at 80% 75%, rgba(14,165,233,0.14) 0%, transparent 42%)',
          filter: 'blur(38px)',
        }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>📊 Financial Analytics</h1>
          <p className="text-xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Deep dive into your spending patterns and financial insights</p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 flex gap-3 flex-wrap"
        >
          {[
            { value: 'month', label: 'This Month' },
            { value: 'quarter', label: 'Last 3 Months' },
            { value: 'all', label: 'All Time' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                timeRange === option.value
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800 text-slate-300 border-2 border-slate-600 hover:border-emerald-400 hover:shadow-md hover:bg-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {/* Key Metrics Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-sm bg-slate-900/70 border border-slate-700/70"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
                <th className="px-8 py-5 text-left font-black text-lg">Metric</th>
                <th className="px-8 py-5 text-right font-black text-lg">Value</th>
                <th className="px-8 py-5 text-right font-black text-lg">Transactions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              <tr className="hover:bg-emerald-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-black text-white">Total Income</p>
                      <p className="text-sm font-bold text-slate-400">Money coming in</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-3xl font-black text-emerald-300">{format(totalIncome)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-lg font-black text-slate-300">{filteredTransactions.filter((t) => t.type === 'income').length}</p>
                </td>
              </tr>

              <tr className="hover:bg-red-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💸</span>
                    <div>
                      <p className="font-black text-white">Total Expenses</p>
                      <p className="text-sm font-bold text-slate-400">Money going out</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-3xl font-black text-red-300">{format(totalExpenses)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-lg font-black text-slate-300">{filteredTransactions.filter((t) => t.type === 'expense').length}</p>
                </td>
              </tr>

              <tr className={`${totalIncome - totalExpenses >= 0 ? 'hover:bg-emerald-900/30' : 'hover:bg-red-900/30'} transition-all duration-200`}>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="font-black text-white">Net Savings</p>
                      <p className="text-sm font-bold text-slate-400">Balance after expenses</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className={`text-3xl font-black ${totalIncome - totalExpenses >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>{format(totalIncome - totalExpenses)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className={`text-lg font-black ${totalIncome - totalExpenses >= 0 ? 'text-slate-300' : 'text-red-300'}`}>{((((totalIncome - totalExpenses) / (totalIncome || 1)) * 100) || 0).toFixed(1)}%</p>
                </td>
              </tr>

              <tr className="hover:bg-cyan-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <p className="font-black text-white">Average Transaction</p>
                      <p className="text-sm font-bold text-slate-400">Per transaction average</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-3xl font-black text-cyan-300">{format(averageTransaction)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-lg font-black text-slate-300">{filteredTransactions.length}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Charts */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Spending by Category */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-slate-900/70 rounded-2xl shadow-2xl p-6 border border-slate-700/70 hover:border-cyan-500/30 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Spending by Category</h2>
            <SpendingCategoryChart data={spendingByCategory} />
          </motion.div>

          {/* Income vs Expense */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-slate-900/70 rounded-2xl shadow-2xl p-6 border border-slate-700/70 hover:border-emerald-500/30 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Income vs Expenses</h2>
            <IncomeVsExpenseChart income={totalIncome} expenses={totalExpenses} />
          </motion.div>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-sm bg-slate-900/70 rounded-2xl shadow-2xl p-6 mb-12 border border-slate-700/70 hover:border-cyan-500/30 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold text-white mb-8">📈 Monthly Spending Trend</h2>
          <MonthlySpensingTrendChart data={monthlySpendings} />
        </motion.div>

        {/* Spending Categories Table & Insights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Spending Categories Table */}
          <motion.div
            variants={itemVariants}
            className="overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-sm bg-slate-900/70 border border-slate-700/70 hover:border-cyan-500/30 transition-all duration-300"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
                  <th className="px-6 py-4 text-left font-black">Category</th>
                  <th className="px-6 py-4 text-right font-black">Amount</th>
                  <th className="px-6 py-4 text-right font-black">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {spendingByCategory.length > 0 ? (
                  spendingByCategory.slice(0, 8).map((cat, index) => (
                    <tr key={index} className="hover:bg-slate-800/50 transition-all duration-200">
                      <td className="px-6 py-4 font-black text-white">{cat.category}</td>
                      <td className="px-6 py-4 text-right font-black text-cyan-300">{format(cat.amount)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-emerald-300">
                        {((cat.amount / spendingByCategory[0].amount) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-slate-400">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

          {/* Quick Insights */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-slate-900/70 rounded-2xl shadow-2xl p-6 border border-slate-700/70 hover:border-emerald-500/30 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-6">💡 Quick Insights</h2>
            <div className="space-y-5">
              {highestSpendingCategory && (
                <div className="p-4 bg-gradient-to-br from-orange-900/40 to-orange-800/40 border-l-4 border-orange-500 rounded-lg hover:shadow-md transition-all duration-200">
                  <p className="text-sm font-medium text-orange-300 mb-1">Highest Spending</p>
                  <p className="text-xl font-bold text-orange-100">{highestSpendingCategory.category}</p>
                  <p className="text-sm text-orange-400 mt-1">{format(highestSpendingCategory.amount)}</p>
                </div>
              )}
              
              {mostFrequentCategory !== 'N/A' && (
                <div className="p-4 bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-l-4 border-purple-500 rounded-lg hover:shadow-md transition-all duration-200">
                  <p className="text-sm font-medium text-purple-300 mb-1">Most Frequent</p>
                  <p className="text-xl font-bold text-purple-100">{mostFrequentCategory}</p>
                  <p className="text-sm text-purple-400 mt-1">Most transactions</p>
                </div>
              )}

              <div className="p-4 bg-gradient-to-br from-emerald-900/40 to-emerald-800/40 border-l-4 border-emerald-500 rounded-lg hover:shadow-md transition-all duration-200">
                <p className="text-sm font-medium text-emerald-300 mb-1">Savings Rate</p>
                <p className="text-xl font-bold text-emerald-100">
                  {((((totalIncome - totalExpenses) / (totalIncome || 1)) * 100) || 0).toFixed(1)}%
                </p>
                <p className="text-sm text-emerald-400 mt-1">Of your income saved</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 border-l-4 border-cyan-500 rounded-lg hover:shadow-md transition-all duration-200">
                <p className="text-sm font-medium text-cyan-300 mb-1">Total Transactions</p>
                <p className="text-xl font-bold text-cyan-100">{filteredTransactions.length}</p>
                <p className="text-sm text-cyan-400 mt-1">Average {format(averageTransaction)} each</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
