import React from 'react';

const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Rent',
  'Shopping',
  'Entertainment',
  'Health',
  'Utilities',
  'Subscriptions',
];

const Filters = ({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  dateRange,
  onDateRangeChange,
}) => {
  return (
    <div className="bg-slate-900/70 border border-slate-700/70 rounded-2xl p-4 space-y-4 backdrop-blur-sm">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-700 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        >
          <option value="">All Categories</option>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="Income">Income</option>
        </select>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-full px-3 py-2 border border-slate-700 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={dateRange.from || ''}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, from: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-700 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={dateRange.to || ''}
            onChange={(e) =>
              onDateRangeChange({ ...dateRange, to: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-700 bg-slate-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          onCategoryChange('');
          onTypeChange('');
          onDateRangeChange({ from: '', to: '' });
        }}
        className="w-full px-4 py-2 bg-slate-700/50 text-slate-200 rounded-lg font-medium hover:bg-emerald-600 hover:text-white transition-all duration-200 border border-slate-700/70"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
