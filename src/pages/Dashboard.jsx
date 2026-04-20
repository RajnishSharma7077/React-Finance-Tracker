import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useCurrency } from '../hooks/useCurrency';
import { useBudget } from '../hooks/useBudget';
import BudgetCard from '../components/BudgetCard';
import { SpendingCategoryChart, IncomeVsExpenseChart } from '../components/Charts';
import TransactionCard from '../components/TransactionCard';
import { Link } from 'react-router-dom';

const Dashboard = ({ onAddTransaction, onEditTransaction, onDeleteTransaction }) => {
  const context = useContext(FinanceContext);
  const { formatCurrency: format } = useCurrency();
  const budget = useBudget();

  const currentMonthTransactions = context.getCurrentMonthTransactions();
  const totalIncome = context.getTotalIncome(currentMonthTransactions);
  const totalExpenses = context.getTotalExpenses(currentMonthTransactions);
  const netBalance = totalIncome - totalExpenses;
  const spendingByCategory = context.getSpendingByCategory(currentMonthTransactions);

  const topCategories = spendingByCategory.slice(0, 3);

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
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(15,23,42,0.15) 1px, transparent 1px), linear-gradient(0deg, rgba(15,23,42,0.15) 1px, transparent 1px)',
          backgroundSize: '70px 70px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>💰 Financial Dashboard</h1>
          <p className="text-xl font-bold text-white drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Welcome back! Here's your financial overview.</p>
        </motion.div>

        {/* Metrics Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 overflow-x-auto rounded-xl shadow-2xl backdrop-blur-md bg-white bg-opacity-95"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
                <th className="px-8 py-5 text-left font-black text-lg">Metric</th>
                <th className="px-8 py-5 text-right font-black text-lg">Amount</th>
                <th className="px-8 py-5 text-right font-black text-lg">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              <tr className="hover:bg-emerald-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📈</span>
                    <div>
                      <p className="font-black text-white">Total Income</p>
                      <p className="text-sm font-bold text-slate-400">This month</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-3xl font-black text-emerald-300">{format(totalIncome)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-lg text-sm font-bold border border-emerald-700/50">
                    ✓ Positive
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-red-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💸</span>
                    <div>
                      <p className="font-black text-white">Total Expenses</p>
                      <p className="text-sm font-bold text-slate-400">This month</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className="text-3xl font-black text-red-300">{format(totalExpenses)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className="px-3 py-1 bg-red-900/50 text-red-300 rounded-lg text-sm font-bold border border-red-700/50">
                    Outgoing
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-blue-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚖️</span>
                    <div>
                      <p className="font-black text-white">Net Balance</p>
                      <p className="text-sm font-bold text-slate-400">{netBalance >= 0 ? 'Positive' : 'Negative'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className={`text-3xl font-black ${netBalance >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>{format(netBalance)}</p>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold border  ${netBalance >= 0 ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50' : 'bg-red-900/50 text-red-300 border-red-700/50'}`}>
                    {netBalance >= 0 ? '💹 Balanced' : '📉 Deficit'}
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-amber-900/30 transition-all duration-200">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-black text-white">Budget Remaining</p>
                      <p className="text-sm font-bold text-slate-400">{budget.isOverBudget ? 'Over budget' : 'On track'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <p className={`text-3xl font-black ${budget.isOverBudget ? "text-red-300" : "text-amber-300"}`}>
                    {format(budget.remaining)}
                  </p>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className={`px-3 py-1 rounded-lg text-sm font-bold border ${
                    budget.isOverBudget 
                      ? 'bg-red-900/50 text-red-300 border-red-700/50'
                      : 'bg-amber-900/50 text-amber-300 border-amber-700/50'
                  }`}>
                    {budget.isOverBudget ? '⚠️ Alert' : '✓ Safe'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Budget Card */}
            <motion.div variants={itemVariants}>
              <BudgetCard {...budget} />
            </motion.div>

            {/* Spending by Category Chart */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700/70 bg-slate-900/70 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8">💳 Spending by Category</h2>
              <SpendingCategoryChart data={spendingByCategory} />
            </motion.div>

            {/* Income vs Expense Chart */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700/70 bg-slate-900/70 p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8">📊 Income vs Expenses</h2>
              <IncomeVsExpenseChart income={totalIncome} expenses={totalExpenses} />
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Top Spending Categories */}
            <div className="rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700/70 bg-slate-900/70 p-8">
              <h3 className="text-xl font-bold text-white mb-6">🏆 Top Spending</h3>
              {topCategories.length > 0 ? (
                <div className="space-y-4">
                  {topCategories.map((cat, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-slate-700/50 last:border-b-0 hover:bg-slate-800/30 px-2 py-1 rounded transition-colors duration-200">
                      <span className="font-bold text-slate-300">{cat.category}</span>
                      <span className="font-black text-cyan-300">{format(cat.amount)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">No expenses yet</p>
              )}
            </div>

            {/* Recent Transactions */}
            <div className="rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700/70 bg-slate-900/70 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">📝 Recent</h3>
                <Link
                  to="/transactions"
                  className="text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors duration-200"
                >
                  All →
                </Link>
              </div>
              {currentMonthTransactions.slice(-3).reverse().length > 0 ? (
                <div className="space-y-4">
                  {currentMonthTransactions.slice(-3).reverse().map((t) => (
                    <div key={t.id} className="flex justify-between items-start pb-4 border-b border-slate-700/50 last:border-b-0 hover:bg-slate-800/30 px-2 py-1 rounded transition-colors duration-200">
                      <div className="flex-1">
                        <p className="font-bold text-slate-100">{t.title}</p>
                        <p className="text-sm text-slate-400 mt-1">{t.category}</p>
                      </div>
                      <span className={`font-bold text-right ml-4 ${t.type === 'income' ? 'text-emerald-300' : 'text-red-300'}`}>
                        {t.type === 'income' ? '+' : '-'} {format(t.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">No transactions yet</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
