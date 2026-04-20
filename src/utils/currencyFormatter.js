export const formatCurrency = (amount, currency = 'INR') => {
  const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const symbol = currencySymbols[currency] || '₹';
  return `${symbol}${parseFloat(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-IN', options);
};

export const formatDateForInput = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
};

export const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthIndex] || '';
};

export const getCategoryColor = (category) => {
  const colors = {
    Food: 'bg-red-100 text-red-800',
    Travel: 'bg-blue-100 text-blue-800',
    Rent: 'bg-purple-100 text-purple-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Entertainment: 'bg-yellow-100 text-yellow-800',
    Health: 'bg-green-100 text-green-800',
    Utilities: 'bg-orange-100 text-orange-800',
    Subscriptions: 'bg-indigo-100 text-indigo-800',
    Income: 'bg-emerald-100 text-emerald-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

export const getTransactionIcon = (type) => {
  return type === 'income' ? '↓' : '↑';
};
