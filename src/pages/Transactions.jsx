import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import TransactionCard from '../components/TransactionCard';
import TransactionForm from '../components/TransactionForm';

const Transactions = ({ onEditTransaction, onDeleteTransaction }) => {
  const context = useContext(FinanceContext);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('date');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...context.transactions];

    // Search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          t.notes.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((t) => t.type === selectedType);
    }

    // Date range filter
    if (dateRange.from) {
      const fromDate = new Date(dateRange.from);
      filtered = filtered.filter((t) => new Date(t.date) >= fromDate);
    }
    if (dateRange.to) {
      const toDate = new Date(dateRange.to);
      filtered = filtered.filter((t) => new Date(t.date) <= toDate);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'amount':
          return b.amount - a.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    context.transactions,
    debouncedSearchQuery,
    selectedCategory,
    selectedType,
    dateRange,
    sortBy,
  ]);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTransaction(null);
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-center"
        >
          <div>
            <h1 className="text-5xl font-black text-white mb-2" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>All Transactions</h1>
            <p className="text-emerald-200 text-lg font-semibold">Manage and view all your financial transactions</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-lg font-black hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-2xl"
          >
            <FiPlus size={20} /> Add Transaction
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Filters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />

            {/* Sort Options */}
            <div className="rounded-2xl shadow-xl backdrop-blur-sm border border-slate-700/70 bg-slate-900/70 p-6 mt-6">
              <label className="block text-sm font-black text-white mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-slate-800 text-white font-semibold"
              >
                <option value="date">Date (Newest)</option>
                <option value="amount">Amount (Highest)</option>
                <option value="category">Category</option>
              </select>
            </div>
          </motion.div>

          {/* Transactions Table */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by title or notes..."
              />
            </div>

            {/* Results Count */}
            <div className="text-base font-bold text-slate-300 mb-6 rounded-xl px-6 py-3 bg-slate-900/70 backdrop-blur-sm border border-slate-700/70">
              Found <span className="text-cyan-300 font-black">{filteredTransactions.length}</span> transaction{filteredTransactions.length !== 1 ? 's' : ''}
            </div>

            {/* Transactions Table */}
            {filteredTransactions.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-x-auto rounded-2xl shadow-2xl backdrop-blur-sm bg-slate-900/70 border border-slate-700/70"
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white">
                      <th className="px-8 py-5 text-left font-black">Date</th>
                      <th className="px-8 py-5 text-left font-black">Title</th>
                      <th className="px-8 py-5 text-left font-black">Category</th>
                      <th className="px-8 py-5 text-left font-black">Type</th>
                      <th className="px-8 py-5 text-right font-black">Amount</th>
                      <th className="px-8 py-5 text-center font-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {filteredTransactions.map((transaction) => {
                      const typeColor = transaction.type === 'income' ? 'bg-emerald-900/50 text-emerald-300' : 'bg-red-900/50 text-red-300';
                      const amountColor = transaction.type === 'income' ? 'text-emerald-300' : 'text-red-300';
                      const date = new Date(transaction.date);
                      const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                      return (
                        <tr key={transaction.id} className="hover:bg-emerald-900/20 transition-all duration-200">
                          <td className="px-8 py-5">
                            <p className="font-bold text-slate-200">{formattedDate}</p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-bold text-white">{transaction.title}</p>
                            {transaction.notes && <p className="text-sm text-slate-400 mt-1">{transaction.notes}</p>}
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-bold text-slate-200">{transaction.category}</p>
                          </td>
                          <td className="px-8 py-5">
                            <span className={`px-4 py-2 rounded-lg text-sm font-black border border-opacity-50 ${typeColor} ${transaction.type === 'income' ? 'border-emerald-700' : 'border-red-700'}`}>
                              {transaction.type === 'income' ? '📈 Income' : '📉 Expense'}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <p className={`text-xl font-black ${amountColor}`}>
                              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </p>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <div className="flex gap-3 justify-center">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(transaction)}
                                className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-500 transition-colors"
                              >
                                Edit
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => context.deleteTransaction(transaction.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 transition-colors"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl shadow-lg backdrop-blur-sm bg-slate-900/70 border border-slate-700/70 p-16 text-center"
              >
                <p className="text-slate-300 text-xl font-black">
                  No transactions found
                </p>
                <p className="text-slate-400 mt-3 font-semibold">
                  Try adjusting your filters or add a new transaction
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Transaction Form Modal */}
      {showForm && (
        <TransactionForm onClose={handleClose} editingTransaction={editingTransaction} />
      )}
    </div>
  );
};

export default Transactions;
