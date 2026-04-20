import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { useBudget } from '../hooks/useBudget';
import { useCurrency } from '../hooks/useCurrency';
import BudgetCard from '../components/BudgetCard';

const Budget = () => {
  const budget = useBudget();
  const { formatCurrency: format } = useCurrency();
  const [newBudget, setNewBudget] = useState(budget.monthlyBudget.toString());
  const [isEditing, setIsEditing] = useState(false);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const daysRemaining = Math.max(lastDay - today.getDate() + 1, 0);
  const dailySpendingLimit = budget.remaining > 0 ? budget.remaining / Math.max(daysRemaining, 1) : 0;
  const isOverBudget = budget.isOverBudget;
  const statusColor = isOverBudget ? 'from-red-500 to-red-600' : 'from-emerald-500 to-emerald-600';
  const dailySpendingColor = isOverBudget ? 'text-red-700' : 'text-emerald-700';

  const handleUpdateBudget = () => {
    const amount = parseFloat(newBudget);
    if (!Number.isNaN(amount) && amount > 0) {
      budget.updateBudget(amount);
      setIsEditing(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-900 to-emerald-950"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
          filter: 'blur(40px)',
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(5, 150, 105, 0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(5, 150, 105, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-black text-white mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>Budget Tracking</h1>
          <p className="text-emerald-200 text-lg font-semibold">Set and monitor your monthly spending budget</p>
        </Motion.div>

        <Motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Budget Card */}
          <Motion.div variants={itemVariants}>
            <BudgetCard {...budget} />
          </Motion.div>

          {/* Budget Settings */}
          <Motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-white bg-opacity-95 border border-emerald-200 rounded-xl shadow-2xl overflow-hidden hover:bg-opacity-100 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
              <h2 className="text-white text-2xl font-black">Budget Settings</h2>
            </div>

            <div className="px-8 py-8">
              {!isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Monthly Budget
                    </label>
                    <div className="flex items-center justify-between">
                      <p className="text-4xl font-black text-emerald-700">
                        {format(budget.monthlyBudget)}
                      </p>
                      <Motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsEditing(true);
                          setNewBudget(budget.monthlyBudget.toString());
                        }}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-black hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
                      >
                        Edit Budget
                      </Motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                      Set New Monthly Budget
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        value={newBudget}
                        onChange={(e) => setNewBudget(e.target.value)}
                        placeholder="Enter budget amount"
                        className="flex-1 px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-semibold bg-white"
                      />
                      <Motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleUpdateBudget}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-black hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg"
                      >
                        Save
                      </Motion.button>
                      <Motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-all duration-300"
                      >
                        Cancel
                      </Motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Motion.div>

          {/* Budget Breakdown */}
          <Motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-white bg-opacity-95 border border-emerald-200 rounded-xl shadow-2xl overflow-hidden hover:bg-opacity-100 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
              <h2 className="text-white text-2xl font-black">Budget Breakdown</h2>
            </div>

            <div className="px-8 py-8 space-y-8">
              {/* Allocated Budget */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-900 font-black">Total Budget</span>
                  <span className="text-2xl font-black text-blue-700">
                    {format(budget.monthlyBudget)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

              {/* Spent */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-900 font-black">Amount Spent</span>
                  <span className="text-2xl font-black text-red-700">
                    {format(budget.monthlyExpenses)}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min((budget.monthlyExpenses / budget.monthlyBudget) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm font-bold text-slate-700 mt-2">
                  {Math.min(budget.percentageUsed, 100).toFixed(1)}% of budget used
                </p>
              </div>

              {/* Remaining */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-900 font-black">Remaining Budget</span>
                  <span
                    className={`text-2xl font-black ${
                      budget.isOverBudget ? 'text-red-700' : 'text-emerald-700'
                    }`}
                  >
                    {format(Math.abs(budget.remaining))}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`${budget.isOverBudget ? 'bg-red-500' : 'bg-emerald-500'} h-3 rounded-full`}
                    style={{
                      width: `${Math.max(100 - (budget.percentageUsed || 0), 0)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Motion.div>

          {/* AI Smart Spending Guide */}
          <Motion.div
            variants={itemVariants}
            className="relative backdrop-blur-md bg-gradient-to-br from-white via-blue-50 to-purple-100 bg-opacity-98 border border-purple-300 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 group"
          >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            </div>

            <div className="relative z-10">
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 px-8 py-7 border-b border-purple-300">
                <h2 className="text-white text-3xl font-black flex items-center gap-3" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  <span className="text-4xl">🤖</span> AI Smart Spending Guide
                </h2>
              </div>

              <div className="px-8 py-10">
                <div className="space-y-8">
                      {/* Stats Overview */}
                      <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className={`font-black text-center mb-2 text-lg ${dailySpendingColor}`}>
                          📅 Days Remaining: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{daysRemaining}</span>
                        </p>
                      </Motion.div>

                      {/* Daily Spending Limit Card */}
                      <Motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-400 rounded-2xl p-10 text-center hover:border-blue-400 transition-colors duration-300">
                          <div className="mb-4 text-5xl">💰</div>
                          <p className="text-purple-300 font-bold mb-3 text-sm uppercase tracking-wider">Daily Spending Limit</p>
                          <p className={`text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r ${isOverBudget ? 'from-red-400 to-pink-400' : 'from-emerald-400 to-cyan-400'}`}>
                            {format(Math.max(dailySpendingLimit, 0))}
                          </p>
                          <p className="text-slate-300 font-bold">
                            per day to survive the month safely
                          </p>
                        </div>
                      </Motion.div>

                      {/* Status Alert */}
                      <Motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`bg-gradient-to-r ${statusColor} text-white rounded-xl p-8 border-2 ${isOverBudget ? 'border-red-300' : 'border-emerald-300'} shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group/alert`}
                      >
                        <div className="absolute inset-0 opacity-20 group-hover/alert:opacity-30 transition-opacity">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full filter blur-3xl opacity-10"></div>
                        </div>
                        <div className="relative z-10">
                          <p className="font-black text-xl mb-3 flex items-center gap-2">
                            {isOverBudget ? '⚠️ Budget Alert' : '✅ On Track!'}
                          </p>
                          <p className="font-black text-base leading-relaxed">
                            {isOverBudget 
                              ? `You've exceeded your budget by ${format(Math.abs(budget.remaining))}. Please adjust your spending immediately!`
                              : `You have ${format(budget.remaining)} left to spend. Stick to ${format(dailySpendingLimit)} daily to stay on budget.`
                            }
                          </p>
                        </div>
                      </Motion.div>

                      {/* AI Recommendations Grid */}
                      <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 border-2 border-blue-400 rounded-2xl p-8 relative overflow-hidden group/rec"
                      >
                        <div className="absolute inset-0 opacity-20 group-hover/rec:opacity-30 transition-opacity">
                          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400 rounded-full filter blur-3xl opacity-10"></div>
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl">💡</span>
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 font-black text-xl">AI Personalized Recommendations</p>
                          </div>
                          <ul className="space-y-4">
                            <Motion.li
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 }}
                              className="flex items-center gap-3 text-cyan-100 font-bold text-sm bg-white bg-opacity-5 px-4 py-3 rounded-lg border border-cyan-300 border-opacity-30 hover:bg-opacity-10 transition-all"
                            >
                              <span className="text-cyan-400 font-black text-xl">🔔</span>
                              Set daily alerts at <span className="text-cyan-300 font-black ml-1">{format(dailySpendingLimit * 0.7)}</span> (70% of limit)
                            </Motion.li>
                            <Motion.li
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.65 }}
                              className="flex items-center gap-3 text-cyan-100 font-bold text-sm bg-white bg-opacity-5 px-4 py-3 rounded-lg border border-cyan-300 border-opacity-30 hover:bg-opacity-10 transition-all"
                            >
                              <span className="text-cyan-400 font-black text-xl">📆</span>
                              Plan large purchases for next month if possible
                            </Motion.li>
                            <Motion.li
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                              className="flex items-center gap-3 text-cyan-100 font-bold text-sm bg-white bg-opacity-5 px-4 py-3 rounded-lg border border-cyan-300 border-opacity-30 hover:bg-opacity-10 transition-all"
                            >
                              <span className="text-cyan-400 font-black text-xl">⏸️</span>
                              Consider postponing non-essential spending
                            </Motion.li>
                            <Motion.li
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.75 }}
                              className="flex items-center gap-3 text-cyan-100 font-bold text-sm bg-white bg-opacity-5 px-4 py-3 rounded-lg border border-cyan-300 border-opacity-30 hover:bg-opacity-10 transition-all"
                            >
                              <span className="text-cyan-400 font-black text-xl">📊</span>
                              Track daily spending to stay under <span className="text-cyan-300 font-black ml-1">${dailySpendingLimit.toFixed(2)}</span>
                            </Motion.li>
                          </ul>
                        </div>
                      </Motion.div>
                    </div>
              </div>
            </div>
          </Motion.div>

          {/* Budget Tips */}
          <Motion.div
            variants={itemVariants}
            className="backdrop-blur-md bg-white bg-opacity-95 border border-emerald-200 rounded-xl shadow-2xl overflow-hidden hover:bg-opacity-100 transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6">
              <h2 className="text-white text-2xl font-black">Budget Tips</h2>
            </div>

            <div className="px-8 py-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-3xl">💡</div>
                <div>
                  <h3 className="font-black text-slate-900 mb-2">Review Regularly</h3>
                  <p className="text-slate-700 font-semibold text-sm">
                    Check your spending patterns weekly to identify trends and make adjustments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-3xl">📊</div>
                <div>
                  <h3 className="font-black text-slate-900 mb-2">Track Categories</h3>
                  <p className="text-slate-700 font-semibold text-sm">
                    Monitor spending by category to see where your money goes and cut unnecessary expenses.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-3xl">🎯</div>
                <div>
                  <h3 className="font-black text-slate-900 mb-2">Set Realistic Goals</h3>
                  <p className="text-slate-700 font-semibold text-sm">
                    Start with a budget based on your actual spending patterns, then gradually reduce it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 text-3xl">🛑</div>
                <div>
                  <h3 className="font-black text-slate-900 mb-2">Avoid Overspending</h3>
                  <p className="text-slate-700 font-semibold text-sm">
                    Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings from your income.
                  </p>
                </div>
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Budget;
