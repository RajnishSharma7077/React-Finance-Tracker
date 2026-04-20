import React from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { motion } from 'framer-motion';

const BudgetCard = ({ monthlyBudget, monthlyExpenses, remaining, percentageUsed, isOverBudget }) => {
  const { formatCurrency: format } = useCurrency();
  const progressColor = isOverBudget ? 'bg-red-500' : percentageUsed > 75 ? 'bg-yellow-500' : 'bg-emerald-500';
  const statusBgColor = isOverBudget ? 'from-red-950/60 to-red-900/40' : percentageUsed > 75 ? 'from-yellow-950/60 to-yellow-900/40' : 'from-emerald-950/60 to-emerald-900/40';
  const statusBorder = isOverBudget ? 'border-red-700/50' : percentageUsed > 75 ? 'border-yellow-700/50' : 'border-emerald-700/50';
  const statusText = isOverBudget ? 'text-red-200' : percentageUsed > 75 ? 'text-yellow-200' : 'text-emerald-200';

  return (
    <motion.div className="rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border border-slate-700/70 bg-slate-900/70">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
        <h2 className="text-white text-2xl font-black">Monthly Budget</h2>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-6">
        {/* Budget Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">Total Budget</p>
            <p className="text-2xl font-black text-cyan-300 mt-2">
              {format(monthlyBudget)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">Spent</p>
            <p className="text-2xl font-black text-red-300 mt-2">
              {format(monthlyExpenses)}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-300 text-sm font-bold uppercase tracking-wider">Remaining</p>
            <p className={`text-2xl font-black mt-2 ${isOverBudget ? 'text-red-300' : 'text-emerald-300'}`}>
              {format(Math.abs(remaining))}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">Spending Progress</span>
            <span className={`text-base font-black ${isOverBudget ? 'text-red-300' : percentageUsed > 75 ? 'text-yellow-300' : 'text-emerald-300'}`}>
              {Math.min(percentageUsed, 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-4 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentageUsed, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full ${progressColor} transition-all duration-500 rounded-full shadow-lg`}
            ></motion.div>
          </div>
          {isOverBudget && (
            <p className="text-red-300 font-bold text-sm mt-2">
              ⚠️ Over budget by {format(Math.abs(remaining))}
            </p>
          )}
        </div>

        {/* Status Message */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl bg-gradient-to-r ${statusBgColor} border ${statusBorder} backdrop-blur-sm`}
        >
          <p className={`font-bold text-sm flex items-center gap-2 ${statusText}`}>
            {isOverBudget
              ? '💔 You have exceeded your monthly budget!'
              : percentageUsed > 75
              ? '⚠️ Caution: You are approaching your budget limit'
              : '✅ You are within your budget. Great job!'}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;
