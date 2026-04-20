import React from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import { formatCurrency, formatDate, getCategoryColor } from '../utils/currencyFormatter';
import { useCurrency } from '../hooks/useCurrency';
import { motion } from 'framer-motion';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const { formatCurrency: format } = useCurrency();
  const isIncome = transaction.type === 'income';
  const isRecurring = transaction.recurring;

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-slate-700/70 bg-slate-900/70 hover:bg-slate-900/90 transition-all"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">{transaction.title}</h3>
            <p className="text-sm text-slate-400 mt-1 line-clamp-1">{transaction.notes}</p>
          </div>
          <div className="flex items-center gap-2 ml-4 flex-shrink-0">
            <span
              className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${getCategoryColor(
                transaction.category
              )}`}
            >
              {transaction.category}
            </span>
            {isRecurring && (
              <span className="px-2 py-1 bg-blue-900/70 text-blue-300 text-xs font-bold rounded border border-blue-700/50">
                🔄
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-700/50 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-semibold">
              {formatDate(transaction.date)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className={`text-lg font-black ${isIncome ? 'text-emerald-300' : 'text-red-300'}`}
            >
              {isIncome ? '+' : '-'} {format(transaction.amount)}
            </span>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(transaction)}
                className="p-2 text-cyan-400 hover:bg-cyan-900/40 rounded-lg transition-colors border border-cyan-700/30 hover:border-cyan-500/50"
                title="Edit transaction"
              >
                <FiEdit2 size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(transaction.id)}
                className="p-2 text-red-400 hover:bg-red-900/40 rounded-lg transition-colors border border-red-700/30 hover:border-red-500/50"
                title="Delete transaction"
              >
                <FiTrash2 size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
